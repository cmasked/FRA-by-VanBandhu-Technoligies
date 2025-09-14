# fra/utils.py
import os, re
from functools import wraps
from flask import request, jsonify, current_app, send_from_directory
from werkzeug.utils import secure_filename
from bson import ObjectId

# optional imports for OCR
try:
    from PIL import Image
    import pytesseract
    from pdf2image import convert_from_path
    TESSERACT_AVAILABLE = True
except Exception:
    TESSERACT_AVAILABLE = False

from . import db

def require_api_key(fn):
    @wraps(fn)
    def wrapper(*args, **kwargs):
        # accept either "ApiKey <key>" or just "<key>"
        auth = request.headers.get("Authorization", "").strip()
        token = None
        if auth.startswith("ApiKey "):
            token = auth.split(" ", 1)[1].strip()
        elif auth:  # if no "ApiKey " prefix, treat whole header as key
            token = auth
        if not token:
            return jsonify({"error": "missing_api_key"}), 401
        user = db.users.find_one({"api_key": token})
        if not user:
            return jsonify({"error": "invalid_api_key"}), 401
        # attach user to request
        request.user = user
        return fn(*args, **kwargs)
    return wrapper

def save_uploaded_file(file_storage):
    """Saves uploaded file to uploads folder, returns relative path."""
    filename = secure_filename(file_storage.filename)
    # add uuid to filename to avoid collisions
    import uuid
    filename = f"{uuid.uuid4().hex}_{filename}"
    upload_folder = current_app.config["UPLOAD_FOLDER"]
    saved_path = os.path.join(upload_folder, filename)
    file_storage.save(saved_path)
    return filename, saved_path

def run_local_ocr_on_image(path):
    """Runs pytesseract on an image file and returns full extracted text."""
    if not TESSERACT_AVAILABLE:
        raise RuntimeError("Tesseract/PIL/pdf2image not available")
    return pytesseract.image_to_string(Image.open(path))

def run_local_ocr_on_pdf(path, poppler_path=None):
    """Convert first page of PDF to image and OCR it."""
    if not TESSERACT_AVAILABLE:
        raise RuntimeError("Tesseract/PIL/pdf2image not available")
    images = convert_from_path(path, dpi=300, poppler_path=poppler_path)
    if not images:
        return ""
    return pytesseract.image_to_string(images[0])

def extract_fields_from_text(text):
    """Simple heuristics to extract claimant name, village, land_area, coords."""
    out = {"claimant_name": None, "village": None, "land_area": None, "land_coordinates": None}
    # Name pattern: Name: X or Claimant: X
    m = re.search(r"(?:Name|Claimant|Claimant Name)[:\-]\s*([A-Z][A-Za-z\s\.]+)", text, re.IGNORECASE)
    if m:
        out["claimant_name"] = m.group(1).strip()
    # Village
    m = re.search(r"(?:Village|Gram Sabha)[:\-]?\s*([A-Za-z0-9\s\-]+)", text, re.IGNORECASE)
    if m:
        out["village"] = m.group(1).strip()
    # Area (e.g., 2.5 acres, 3 hectares)
    m = re.search(r"([0-9]+(?:\.[0-9]+)?)\s*(acre|acres|hectare|hectares|ha)", text, re.IGNORECASE)
    if m:
        out["land_area"] = f"{m.group(1)} {m.group(2)}"
    # Coordinates lat,long
    m = re.search(r"(-?\d{1,2}\.\d+)[,\s]+(-?\d{1,3}\.\d+)", text)
    if m:
        out["land_coordinates"] = f"{m.group(1)},{m.group(2)}"
    # fallback: pick the first line with two words capitalized (rough)
    if not out["claimant_name"]:
        m = re.search(r"^\s*([A-Z][a-z]+(?:\s[A-Z][a-z]+)+)", text, re.MULTILINE)
        if m:
            out["claimant_name"] = m.group(1).strip()
    return out
