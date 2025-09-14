# fra/__init__.py
import os
from flask import Flask
from flask_pymongo import PyMongo

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

app = Flask(__name__)

# Config from environment (fallbacks for local dev)
app.config["SECRET_KEY"] = os.environ.get("SECRET_KEY", "dev-secret")
app.config["MONGO_URI"] = os.environ.get("MONGO_URI", "mongodb://localhost:27017/fra_db")
app.config["UPLOAD_FOLDER"] = os.path.join(BASE_DIR, "uploads")
app.config["OCR_SERVICE_URL"] = os.environ.get("OCR_SERVICE_URL", "")  # optional external OCR service
app.config["MESSAGING_SERVICE_URL"] = os.environ.get("MESSAGING_SERVICE_URL", "")  # optional message service
app.config["POPPLER_PATH"] = os.environ.get("POPPLER_PATH", None)
app.config["TESSERACT_CMD"] = os.environ.get("TESSERACT_CMD", None)

# Ensure upload dir exists
os.makedirs(app.config["UPLOAD_FOLDER"], exist_ok=True)

# Connect to MongoDB
mongo = PyMongo(app)
db = mongo.db

# Blueprints (import after app/db created)
from .routes_auth import auth_bp
from .claims import claims_bp

app.register_blueprint(auth_bp, url_prefix="/auth")
app.register_blueprint(claims_bp, url_prefix="")

# Export app, db, mongo for other modules
__all__ = ["app", "db", "mongo"]
