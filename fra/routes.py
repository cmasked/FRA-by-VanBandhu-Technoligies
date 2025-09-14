# fra/routes.py
from flask import Blueprint, request, jsonify
from fra.models import UserModel

routes_bp = Blueprint("routes", __name__)

@routes_bp.route("/")
def home():
    return jsonify({"message": "FRA API is running"})

@routes_bp.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    if UserModel.find_by_username(data["username"]):
        return jsonify({"error": "User already exists"}), 400
    UserModel.create(data["username"], data["email"], data["password"])
    return jsonify({"message": "User created"}), 201

@routes_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    user = UserModel.find_by_username(data["username"])
    if user and UserModel.check_password(user, data["password"]):
        return jsonify({"message": f"Welcome {data['username']}!"})
    return jsonify({"error": "Invalid credentials"}), 401
