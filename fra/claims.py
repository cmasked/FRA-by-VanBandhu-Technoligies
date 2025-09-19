# fra/claims.py
import re
from flask import url_for
import os, requests
from flask import Blueprint, request, jsonify, current_app, send_from_directory, url_for
from bson import ObjectId
from . import db
from .utils import (
    save_uploaded_file, run_local_ocr_on_image, run_local_ocr_on_pdf,
    extract_fields_from_text, require_api_key
)

claims_bp = Blueprint("claims", __name__)

# ----------------------
# Create claim from OCR JSON (AI microservice -> backend)
# ----------------------
@claims_bp.route("/claims", methods=["POST"])
def create_claim_from_json():
    data = request.get_json() or {}
    claim_doc = {
        "claimant_name": data.get("claimant_name"),
        "village": data.get("village"),
        "land_area": data.get("land_area"),
        "land_coordinates": data.get("land_coordinates"),
        "khesra_number": data.get("khesra_number"),
        "contact_phone": data.get("contact_phone"),   # <-- phone number
        "document_path": data.get("document_url") or None,
        "raw_text": data.get("raw_text", ""),
        "status": "Waiting",
        "suggested_schemes": data.get("suggested_schemes", []),
        # FRA-specific sections (optional)
        "self_cultivation": data.get("self_cultivation"),
        "disputed_lands": data.get("disputed_lands"),
        "pattas_leases_grants": data.get("pattas_leases_grants"),
        "rehabilitation_land": data.get("rehabilitation_land"),
        "displaced_land": data.get("displaced_land"),
        "forest_village_extent": data.get("forest_village_extent"),
        "traditional_rights": data.get("traditional_rights"),
        "evidence": data.get("evidence"),
        "other_info": data.get("other_info"),
        "notes": []
    }
    inserted = db.claims.insert_one(claim_doc)
    return jsonify({"message": "Claim created", "claim_id": str(inserted.inserted_id)}), 201


# ----------------------
# Upload + OCR endpoint
# ----------------------
@claims_bp.route("/claims/upload", methods=["POST"])
def upload_and_process_claim():
    if 'file' not in request.files:
        return jsonify({"error": "file field required"}), 400
    file = request.files['file']
    filename, saved_path = save_uploaded_file(file)

    # Attempt external OCR
    ocr_service = current_app.config.get("OCR_SERVICE_URL")
    raw_text, extracted = "", {}
    if ocr_service:
        try:
            with open(saved_path, "rb") as f:
                resp = requests.post(ocr_service, files={"file": f}, timeout=30)
                resp.raise_for_status()
                json_resp = resp.json()
                raw_text = json_resp.get("raw_text", "") or json_resp.get("text", "")
                extracted = json_resp.get("extracted", {})
        except Exception:
            raw_text, extracted = "", {}

    # Fallback to local OCR
    if not raw_text:
        try:
            ext = os.path.splitext(saved_path)[1].lower()
            poppler = current_app.config.get("POPPLER_PATH")
            if ext == ".pdf":
                raw_text = run_local_ocr_on_pdf(saved_path, poppler_path=poppler)
            else:
                raw_text = run_local_ocr_on_image(saved_path)
            extracted = extract_fields_from_text(raw_text)
        except Exception:
            raw_text, extracted = raw_text or "", extracted or {}

    claim_doc = {
        "claimant_name": extracted.get("claimant_name") or request.form.get("claimant_name"),
        "village": extracted.get("village") or request.form.get("village"),
        "land_area": extracted.get("land_area") or request.form.get("land_area"),
        "land_coordinates": extracted.get("land_coordinates") or request.form.get("land_coordinates"),
        "khesra_number": extracted.get("khesra_number") or request.form.get("khesra_number"),
        "contact_phone": extracted.get("contact_phone") or request.form.get("contact_phone"),  # <-- phone
        "document_path": filename,
        "raw_text": raw_text,
        "status": "Waiting",
        "suggested_schemes": [],
        # FRA-specific sections
        "self_cultivation": request.form.get("self_cultivation"),
        "disputed_lands": request.form.get("disputed_lands"),
        "pattas_leases_grants": request.form.get("pattas_leases_grants"),
        "rehabilitation_land": request.form.get("rehabilitation_land"),
        "displaced_land": request.form.get("displaced_land"),
        "forest_village_extent": request.form.get("forest_village_extent"),
        "traditional_rights": request.form.get("traditional_rights"),
        "evidence": request.form.get("evidence"),
        "other_info": request.form.get("other_info"),
        "notes": []
    }
    inserted = db.claims.insert_one(claim_doc)
    return jsonify({"message": "Claim created", "claim_id": str(inserted.inserted_id), "extracted": extracted}), 201


# ----------------------
# List claims (Dashboard)
# ----------------------
@claims_bp.route("/claimsList", methods=["GET"])
@require_api_key
def claims_list():
    """Return claims for dashboard list view"""
    docs = []
    for c in db.claims.find().sort("_id", -1):
        # build safe doc URL
        doc_url = None
        if c.get("document_path"):
            if c["document_path"].startswith(("http://", "https://")):
                doc_url = c["document_path"]
            else:
                try:
                    doc_url = url_for("claims.serve_document",
                                      filename=c["document_path"],
                                      _external=True)
                except Exception:
                    doc_url = None

        docs.append({
            "id": str(c["_id"]),
            "claimant_name": c.get("claimant_name") or "Unknown",
            "status": c.get("status") or "Waiting",
            "village": c.get("village"),
            "land_area": c.get("land_area"),
            "document_url": doc_url,
        })

    return jsonify(docs), 200


# ----------------------
# Get claim (detailed for officer)
# ----------------------
@claims_bp.route("/claims/<id>", methods=["GET"])
@require_api_key
def get_claim(id):
    c = db.claims.find_one({"_id": ObjectId(id)})
    if not c:
        return jsonify({"error": "not_found"}), 404
    c["id"] = str(c["_id"])
    c.pop("_id", None)

    if c.get("document_path"):
        if c["document_path"].startswith("http"):
            c["document_url"] = c["document_path"]
        else:
            c["document_url"] = url_for("claims.serve_document", filename=c["document_path"], _external=True)

    return jsonify(c), 200


# ----------------------
# Update claim status (Approve / Reject / Send Back)
# ----------------------
@claims_bp.route("/claims/<id>/update_status", methods=["POST"])
@require_api_key
def update_status(id):
    data = request.get_json() or {}
    new_status = data.get("status")
    remarks = data.get("remarks", "")
    if new_status not in ("Waiting", "Approved", "Rejected", "SendBack"):
        return jsonify({"error": "invalid_status"}), 400

    update = {"$set": {"status": new_status},
              "$push": {"notes": {"by": request.user.get("username"), "text": remarks}}}
    res = db.claims.update_one({"_id": ObjectId(id)}, update)
    if res.matched_count == 0:
        return jsonify({"error": "not_found"}), 404

    # Notify claimant (via messaging service if configured)
    messaging_url = current_app.config.get("MESSAGING_SERVICE_URL")
   # --- ADD THIS NEW FAST2SMS BLOCK ---
    try:
        # 1. Get the claim details from the database
        claim = db.claims.find_one({"_id": ObjectId(id)})
        contact_number = claim.get("contact_phone") # This is the number from your OCR
        schemes = claim.get("suggested_schemes", [])
        
        # Build a nice message
        schemes_text = ", ".join(schemes) if schemes else "No specific schemes suggested."
        sms_message = f"Your FRA claim ({id}) has been updated to: {new_status}. Suggested Schemes: {schemes_text}"

        # 2. Send the SMS if we have a contact number
        if contact_number:
            sms_url = "https://www.fast2sms.com/dev/bulkV2"
            sms_headers = {
                # Get the key safely from the app config
                "authorization": current_app.config["FAST2SMS_API_KEY"], 
                "Content-Type": "application/json"
            }
            sms_payload = {
                "route": "q",
                "message": sms_message,     # Send our dynamic message
                "language": "english",
                "numbers": 9599457174   # Send to the number from the database
            }
            
            # 3. Send the request to Fast2SMS
            response = requests.post(sms_url, headers=sms_headers, json=sms_payload)
            print(f"SMS Notification Sent to {contact_number}. Status: {response.status_code}, Response: {response.text}")

    except Exception as e:
        # If SMS fails, just print the error and continue.
        # Don't crash the whole API request.
        print(f"CRITICAL: SMS notification failed. Error: {e}")
        pass 

    # Finally, return the success message to the officer's browser
    return jsonify({"message": f"Claim {id} updated to {new_status}"}), 200


# ----------------------
# Serve uploaded document file
# ----------------------
@claims_bp.route("/parcels", methods=["GET"])
@require_api_key
def parcels():
    """Return claims as GeoJSON for FRAAtlas map"""
    features = []
    for c in db.claims.find({"land_coordinates": {"$exists": True}}):
        try:
            lon, lat = [float(x.strip()) for x in c["land_coordinates"].split(",")]
        except Exception:
            continue

        features.append({
            "type": "Feature",
            "geometry": {"type": "Point", "coordinates": [lon, lat]},
            "properties": {
                "id": str(c["_id"]),
                "claimant_name": c.get("claimant_name") or "Unknown",
                "status": c.get("status") or "Waiting",
                "village": c.get("village"),
                "khesra_number": c.get("khesra_number"),
                "land_area": c.get("land_area"),
                "suggested_schemes": c.get("suggested_schemes", []),
                "document_url": c.get("document_path"),
            }
        })

    return jsonify({
        "type": "FeatureCollection",
        "features": features
    }), 200
