# fra/models.py
import uuid
from werkzeug.security import generate_password_hash, check_password_hash
from . import db

USERS = db.users  # collection

def create_user(username: str, email: str, password: str):
    """Create user and return created user doc (without password hash)."""
    if USERS.find_one({"username": username}):
        raise ValueError("username_taken")
    hashed = generate_password_hash(password)
    api_key = uuid.uuid4().hex
    user = {"username": username, "email": email, "password": hashed, "api_key": api_key}
    USERS.insert_one(user)
    user_out = {k: v for k, v in user.items() if k != "password"}
    return user_out

def find_by_username(username: str):
    return USERS.find_one({"username": username})

def verify_password(user_doc, password: str):
    return check_password_hash(user_doc["password"], password)

def rotate_api_key(username: str):
    new_key = uuid.uuid4().hex
    USERS.update_one({"username": username}, {"$set": {"api_key": new_key}})
    return new_key
