# fra/claims.py
import os, requests
from flask import Blueprint, request, jsonify, current_app, send_from_directory, url_for
from bson import ObjectId
from twilio.rest import Client
from . import db
from .utils import (
    save_uploaded_file, run_local_ocr_on_image, run_local_ocr_on_pdf,
    extract_fields_from_text, require_api_key
)

claims_bp = Blueprint("claims", __name__)

# Load Twilio creds once
TWILIO_SID = os.getenv("TWILIO_SID")
TWILIO_AUTH = os.getenv("TWILIO_AUTH")
TWILIO_PHONE = os.getenv("TWILIO_PHONE")
twilio_client = Client(TWILIO_SID, TWILIO_AUTH)

# ----------------------
# Create claim from OCR JSON
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
        "contact_phone": data.get("contact_phone"),
        "document_path": data.get("document_url") or None,
        "raw_text": data.get("raw_text", ""),
        "status": "Waiting",
        "suggested_schemes": data.get("suggested_schemes", []),
        "notes": [],
        "extra_info": {
            "self_cultivation": data.get("self_cultivation"),
            "disputed_lands": data.get("disputed_lands"),
            "pattas_leases": data.get("pattas_leases"),
            "rehabilitation_land": data.get("rehabilitation_land"),
            "displacement": data.get("displacement"),
            "forest_village_land": data.get("forest_village_land"),
            "other_traditional_rights": data.get("other_traditional_rights"),
            "evidence_text": data.get("evidence_text"),
            "other_info": data.get("other_info"),
        }
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
        "khesra_number": request.form.get("khesra_number"),
        "contact_phone": request.form.get("contact_phone"),
        "document_path": filename,
        "raw_text": raw_text,
        "status": "Waiting",
        "suggested_schemes": [],
        "notes": [],
    }
    inserted = db.claims.insert_one(claim_doc)
    return jsonify({"message": "Claim created", "claim_id": str(inserted.inserted_id), "extracted": extracted}), 201

# ----------------------
# List claims
# ----------------------
@claims_bp.route("/claimsList", methods=["GET"])
@require_api_key
def list_claims():
    docs = []
    for c in db.claims.find().sort("_id", -1):
        docs.append({
            "id": str(c["_id"]),
            "claimant_name": c.get("claimant_name"),
            "village": c.get("village"),
            "land_area": c.get("land_area"),
            "status": c.get("status"),
            "document_url": url_for("claims.serve_document", filename=c.get("document_path"), _external=True) if c.get("document_path") else None
        })
    return jsonify(docs), 200

# ----------------------
# Get one claim
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
        c["document_url"] = url_for("claims.serve_document", filename=c["document_path"], _external=True)
    return jsonify(c), 200

# ----------------------
# Update claim status + Twilio notify
# ----------------------
@claims_bp.route("/claims/<id>/update_status", methods=["POST"])
@require_api_key
def update_status(id):
    data = request.get_json() or {}
    new_status = data.get("status")
    remarks = data.get("remarks", "")

    if new_status not in ("Waiting", "Approved", "Rejected", "SendBack"):
        return jsonify({"error": "invalid_status"}), 400

    update = {
        "$set": {"status": new_status},
        "$push": {"notes": {"by": request.user.get("username"), "text": remarks}}
    }
    res = db.claims.update_one({"_id": ObjectId(id)}, update)
    if res.matched_count == 0:
        return jsonify({"error": "not_found"}), 404

    claim = db.claims.find_one({"_id": ObjectId(id)})
    contact = claim.get("contact_phone")

    if contact:
        try:
            twilio_client.messages.create(
                from_=TWILIO_PHONE,
                to=contact,
                body=f"Your FRA claim {id} status changed to {new_status}."
            )
        except Exception as e:
            print("Twilio send error:", str(e))

    return jsonify({"message": f"Claim {id} updated to {new_status}"}), 200

# ----------------------
# Serve uploaded document
# ----------------------
@claims_bp.route("/uploads/<filename>", methods=["GET"])
@require_api_key
def serve_document(filename):
    upload_folder = current_app.config["UPLOAD_FOLDER"]
    return send_from_directory(upload_folder, filename, as_attachment=False)

# ----------------------
# GeoJSON parcels
# ----------------------
@claims_bp.route("/parcels", methods=["GET"])
@require_api_key
def parcels_geojson():
    features = []
    for c in db.claims.find():
        coords = c.get("land_coordinates")
        if not coords:
            continue
        if isinstance(coords, str):
            try:
                lat, lon = map(float, coords.split(","))
            except Exception:
                continue
        elif isinstance(coords, (list, tuple)) and len(coords) >= 2:
            lat, lon = float(coords[0]), float(coords[1])
        else:
            continue
        properties = {
            "id": str(c["_id"]),
            "status": c.get("status"),
            "claimant_name": c.get("claimant_name"),
            "document_url": url_for("claims.serve_document", filename=c.get("document_path"), _external=True) if c.get("document_path") else None
        }
        features.append({
            "type": "Feature",
            "geometry": {"type": "Point", "coordinates": [lon, lat]},
            "properties": properties
        })
    return jsonify({"type": "FeatureCollection", "features": features}), 200
