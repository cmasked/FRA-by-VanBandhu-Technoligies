# fra/routes_auth.py
from flask import Blueprint, request, jsonify
from .models import create_user, find_by_username, verify_password, rotate_api_key

auth_bp = Blueprint("auth", __name__)

@auth_bp.route("/register", methods=["POST"])
def register():
    data = request.get_json() or {}
    username = data.get("username")
    email = data.get("email")
    password = data.get("password")
    if not username or not email or not password:
        return jsonify({"error": "username,email,password required"}), 400
    try:
        user = create_user(username, email, password)
        return jsonify({"message": "user_created", "user": {"username": user["username"], "api_key": user["api_key"]}}), 201
    except ValueError as e:
        return jsonify({"error": str(e)}), 400

@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json() or {}
    username = data.get("username")
    password = data.get("password")
    if not username or not password:
        return jsonify({"error": "username and password required"}), 400
    user = find_by_username(username)
    if not user or not verify_password(user, password):
        return jsonify({"error": "invalid_credentials"}), 401
    # return api_key (persisted key)
    return jsonify({"message": "login_success", "api_key": user["api_key"]}), 200

@auth_bp.route("/rotate_key", methods=["POST"])
def rotate_key():
    data = request.get_json() or {}
    username = data.get("username")
    password = data.get("password")
    user = find_by_username(username)
    if not user or not verify_password(user, password):
        return jsonify({"error": "invalid_credentials"}), 401
    new_key = rotate_api_key(username)
    return jsonify({"message": "new_key", "api_key": new_key}), 200
