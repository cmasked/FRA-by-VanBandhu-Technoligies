# run.py
from fra import app
from flask import jsonify,request
from flask import render_template
from flask_cors import CORS
import re
import pandas as pd
import os
import io
from google.cloud import vision
from collections import OrderedDict
from flask_pymongo import PyMongo
from bson import ObjectId # This is needed for your database



# ... (your other imports)
from collections import OrderedDict

# PASTE THIS TEST DATA


CORS(app)
# ... (rest of your file)
CORS(app)

# --- ADD THIS DATABASE CONFIG ---
# YOU MUST add your real MongoDB connection string here
app.config["MONGO_URI"] = "mongodb://localhost:27017/fra_db" 
mongo = PyMongo(app)
db = mongo.db
# ---------------------------------




# ========== 1. GOOGLE_APPLICATION_CREDENTIALS ==========
# Set your GCP Vision Service Account key here (change path as per your setup)
os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = r"D:\FRA\dynamic-amulet-472218-p5-503248315567.json"



# ========== 3. Helper functions ==========

def extract_text_from_image_bytes(image_bytes):
    client = vision.ImageAnnotatorClient()
    image = vision.Image(content=image_bytes)
    response = client.document_text_detection(image=image)
    text = response.full_text_annotation.text
    text = re.sub(r"[^\x00-\x7F]+", " ", text)
    return text

def normalize_text(val):
    if not val or not isinstance(val, str):
        return None
    val = val.strip()
    replacements = {
        "ONS": "0.15",
        "O.3 ": "0.3",
        "hectaie": "hectare",
        "HectaRes": "hectare",
        "CULTINAT ION": "Cultivation",
        "CULTIVATIoN": "Cultivation",
        "Ycs/No": "No",
        "Copy 0 F": "Copy of",
        "  ": " "
    }
    for wrong, correct in replacements.items():
        val = val.replace(wrong, correct)
    val = re.sub(r"(\d),(\d)", r"\1.\2", val)
    val = re.sub(r"(\d)\s*\.\s*(\d)", r"\1.\2", val)
    return val

def parse_fields(text):
    fields = {}

    match_name = re.search(r"Name\s*:?\s*([A-Za-z .'\"]+)?(?:\n\s*([A-Za-z .'\"]+))?",
    text,
    re.IGNORECASE)
    
    if match_name:
        fields["claimant_name"] = (match_name.group(1) or match_name.group(2) or "").strip()

    match_spouse = re.search(r"Name of the spouse.?:\s([A-Za-z .'\"]+)", text, re.IGNORECASE)
    if match_spouse:
        fields["spouse"] = match_spouse.group(1).strip()

    match_fm = re.search(r"Name of[ /]father[ /]*mother.?:\s*([A-Za-z .'/]+)", text, re.IGNORECASE)
    if match_fm:
        fields["father_mother"] = match_fm.group(1).strip()

    match_khesra = re.search(r"Khesra Number[:\s]*([\w/ -]+)", text, re.IGNORECASE)
    if match_khesra:
        fields["khesra"] = match_khesra.group(1).strip()

    match_address = re.search(r"Address[:\s]*([A-Za-z0-9, .\-]+)", text, re.IGNORECASE)
    if match_address:
        fields["address"] = match_address.group(1).strip()

    match_village = re.search(r"Village[:\s]*([A-Za-z0-9, .\-]+)", text, re.IGNORECASE)
    if match_village:
        fields["village"] = match_village.group(1).strip()

    match_gp = re.search(r"Gram Panchayat[:\s]*([A-Za-z0-9, .\-]+)", text, re.IGNORECASE)
    if match_gp:
        fields["gram_panchayat"] = match_gp.group(1).strip()

    match_tehsil = re.search(r"Tehsil[ /]Taluka[:\s]([A-Za-z0-9, .\-]+)", text, re.IGNORECASE)
    if match_tehsil:
        fields["tehsil"] = match_tehsil.group(1).strip()

    match_phone = re.search(r"Phone Number[:\s]*([\d ]+)", text, re.IGNORECASE)
    if match_phone:
        fields["contact_phone"] = match_phone.group(1).strip()

    match_dist = re.search(r"District[:\s]*([A-Za-z0-9, .\-]+)", text, re.IGNORECASE)
    if match_dist:
        fields["district"] = match_dist.group(1).strip()

    match_coords = re.search(r"Coordinates[:\s]*([0-9\.\-, ]+)", text, re.IGNORECASE)
    if match_coords:
        fields["land_coordinates"] = match_coords.group(1).strip()

    sched_match = re.search(r"Scheduled Tribe[:\s]*(Yes|No)", text, re.IGNORECASE)
    if sched_match:
        fields["scheduled_tribe"] = sched_match.group(1)
    trad_match = re.search(r"Other Traditional Forest Dweller[:\s]*(Yes|No)", text, re.IGNORECASE)
    if trad_match:
        fields["traditional_dweller"] = trad_match.group(1)

    fam_match = re.search(r"family with age: ([^\n]+)", text, re.IGNORECASE)
    if fam_match:
        fields["family_members"] = fam_match.group(1).strip()

    match_hab = re.search(r"for habitation\s*([0-9\. ]+\w+)", text, re.IGNORECASE)
    if match_hab:
        fields["extent_habitation"] = match_hab.group(1).strip()

    match_selfcult = re.search(r"for self-cultivation, if any:? ([0-9\. ]+\w+)", text, re.IGNORECASE)
    if match_selfcult:
        fields["extent_self_cultivation"] = match_selfcult.group(1).strip()

    match_disp = re.search(r"disputed lands if any:? ([A-Za-z0-9, .\-]+)", text, re.IGNORECASE)
    if match_disp:
        fields["disputed_lands"] = match_disp.group(1).strip()

    match_pattas = re.search(r"Pattas/leases/grants, if any:? ([A-Za-z0-9, .\-\/]+)", text, re.IGNORECASE)
    if match_pattas:
        fields["pattas"] = match_pattas.group(1).strip()

    match_rehab = re.search(r"in situ rehabilitation.*?if any:? (NOT APPLICABLE|[A-Za-z0-9, .\-]+)", text, re.IGNORECASE)
    if match_rehab:
        fields["rehabilitation_land"] = match_rehab.group(1).strip()

    match_disp_land = re.search(r"displaced without land compensation: ([^\n]+)", text, re.IGNORECASE)
    if match_disp_land:
        fields["displaced_land"] = match_disp_land.group(1).strip()

    match_forest_extent = re.search(r"Extent of land in forest villages.?if any[:\s]([0-9\. ]+\w+)", text, re.IGNORECASE)
    if match_forest_extent:
        fields["forest_village_extent"] = match_forest_extent.group(1).strip()

    match_tr_rights = re.search(r"other traditional right.?if any[:\s]([^\n]+)", text, re.IGNORECASE)
    if match_tr_rights:
        fields["traditional_rights"] = match_tr_rights.group(1).strip()

    match_evidence = re.search(r"Evidence in.?support.?(?:See Rule [0-9]+)?[:\s]*(.+?)(?:\n\d+[\.)]|\Z)", text, re.IGNORECASE|re.DOTALL)
    if match_evidence:
        fields["evidence"] = match_evidence.group(1).strip().replace('\n','; ')

    match_other = re.search(r"other information[:\s]*([^\n]+)", text, re.IGNORECASE)
    if match_other:
        fields["other_info"] = match_other.group(1).strip()

    # Remove noise/normalize
    for k in fields:
        fields[k] = normalize_text(fields[k])
    return fields

def recommend_schemes(parsed_fields):
    schemes = []
    if parsed_fields.get("scheduled_tribe") == "Yes":
        schemes.append("Digital FRA Title Issuance: Land rights formalization (ST)")
    if parsed_fields.get("extent_habitation") or parsed_fields.get("extent_self_cultivation"):
        schemes.append("PM Kisan Samman Nidhi: Direct income support for farmers")
        schemes.append("PM Fasal Bima Yojana: Crop insurance and disaster relief")
    if parsed_fields.get("address") and "water" in parsed_fields.get("address").lower():
        schemes.append("Jal Jeevan Mission: Household tap water")
        schemes.append("Construction of water storage tanks")
    if parsed_fields.get("pattas"):
        schemes.append("Land Rights Digitization Support")
    schemes.append("MGNREGA: Rural asset creation & jobs")
    return schemes

def build_payload(parsed_fields, raw_text, doc_paths):
    payload = OrderedDict({
        "claimant_name": parsed_fields.get("claimant_name"),
        "spouse": parsed_fields.get("spouse"),
        "father_mother": parsed_fields.get("father_mother"),
        "village": parsed_fields.get("village"),
        "land_area": parsed_fields.get("extent_habitation"),
        "self_cultivation": parsed_fields.get("extent_self_cultivation"),
        "land_coordinates": parsed_fields.get("land_coordinates"),
        "khesra_number": parsed_fields.get("khesra"),
        "contact_phone": parsed_fields.get("contact_phone"),
        "document_path": ",".join(doc_paths),  # Empty for single upload via API
        "raw_text": raw_text,
        "status": "Waiting",
        "suggested_schemes": recommend_schemes(parsed_fields),
        "disputed_lands": parsed_fields.get("disputed_lands"),
        "pattas_leases_grants": parsed_fields.get("pattas"),
        "rehabilitation_land": parsed_fields.get("rehabilitation_land"),
        "displaced_land": parsed_fields.get("displaced_land"),
        "forest_village_extent": parsed_fields.get("forest_village_extent"),
        "traditional_rights": parsed_fields.get("traditional_rights"),
        "evidence": parsed_fields.get("evidence"),
        "other_info": parsed_fields.get("other_info")
    })
    return payload

# ========== 4. API for image file upload and field extraction ==========
# REPLACE your old /ocr route with this one
@app.route('/ocr', methods=['POST'])
def ocr():
    if 'image' not in request.files:
        return jsonify({"error": "No image supplied!"}), 400
    file = request.files['image']
    image_bytes = file.read()

    # Your existing functions run
    raw_text = extract_text_from_image_bytes(image_bytes)
    parsed_fields = parse_fields(raw_text)
    doc_paths = [] # Note: you haven't implemented file saving, just file reading

    # This is the new, critical part:
    # 1. Build the document using your existing helper
    claim_doc = build_payload(parsed_fields, raw_text, doc_paths)
    
    # 2. --- SAVE IT TO THE DATABASE ---
    try:
        inserted = db.claims.insert_one(claim_doc)
        claim_id = str(inserted.inserted_id)
        print(f"Successfully saved claim {claim_id} to database.")
    except Exception as e:
        print(f"Database insert failed: {e}")
        return jsonify({"error": "OCR worked but database save failed"}), 500
    
    # 3. Return the payload with the new ID
    payload = claim_doc # re-use the doc we just built
    payload["_id"] = claim_id
    payload["claim_id"] = claim_id # Add this for your frontend
    
    return jsonify(payload)





@app.route("/map")
def map_view():
    return render_template("map.html")



if __name__ == "__main__":
    app.run(debug=True)
