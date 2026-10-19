import os
from flask import Flask, request, jsonify, session
from dotenv import load_dotenv
import secrets
from flask_cors import CORS
import requests

# loads the variables from the .env, allowing for session/cookie tracking
load_dotenv()

import firebase_admin
from firebase_admin import credentials, firestore

cred = credentials.Certificate("/app/backend/key.json")
firebase_admin.initialize_app(cred)

db = firestore.client()
import datetime
import zoneinfo

app = Flask(__name__)
CORS(app, supports_credentials=True, origins=["http://localhost:5173"])

# gets secret key from .env file, or uses a backup key if not found (for development purposes)
app.secret_key = os.environ.get('SECRET_KEY', "dev-only-backup")
# this fallback lets the team log in and test the app without needing to set up a .env file, but should be changed for production


# User create
@app.route('/api/users/create', methods=['POST'])
def create_user():
    data = request.json
    username = data.get("username")
    email = data.get("email")
    password = data.get("password")

    # If username, email, or password are empty, 
    if not username or not email or not password:
        return jsonify({"error": "Username, email, and password are all required"}), 400

    # query database to see if user with email or username already exists
    users_ref = db.collection("users")
    existing_emails = users_ref.where("email", "==", email).get()
    if existing_emails:
        # If a user is found, return an error message that a user with that email already exists
        return jsonify({"error": "A user with this email already exists"}), 400

    existing_usernames = users_ref.where("username", "==", username).get()
    if existing_usernames:
        # If a user is found, return an error message that a user with that username already exists
        return jsonify({"error": "A user with this username already exists"}), 400



    # Create new user object
    new_user = {
        "username": username,
        "email": email,
        "password": password  # NOTE: In production, hash the password!
    }

    # TODO create new user in the database, let Firestore auto-generate the document ID
    new_user_ref = users_ref.document()
    new_user_ref.set(new_user)

    # TODO get the user_id from the newly created user and make sure to return it
    user_id = new_user_ref.id

    return jsonify({"message": "Account created", "user_id": user_id}), 201


# User login 
@app.route('/api/users/login', methods=['POST'])
def login():
    # get username and password using POST method (standard practice)
    # json data from frontend request is converted to python dictionary
    data = request.json
    username = data.get("username")
    password = data.get("password")

    # if either username or password is empty, return an error message
    if not username or not password:
        return jsonify({"error": "Username and password are required"}), 400

    # looks for a matching user (username and password) from firebase database
    users_ref = db.collection("users")
    matching_users = users_ref.where("username", "==", username).where("password", "==", password).get()

    # if there is no existing user with entered username/password, error message is returned to frontend
    if not matching_users:
        # Else, return an error message
        return jsonify({"error": "User not found"}), 404

    # Firebase returns a list of matching users on .get, but we only use the first match (matching_users[0])
    # retrieve the user_id from the (first) matching user, use it so start a session
    user_doc = matching_users[0]
    user_id = user_doc.id
    session['user_id'] = user_id
    
    return jsonify({"message": "Login successful", "user_id": user_id}), 200

# Identifies current user (for session management)
# this process is separate from login because user may refresh or open a new tab
@app.route('/api/users/me', methods=['GET'])
# "GET" is used here i/o POST because the user doesn't actually submit anything
def get_current_user():
    # retrieve the user_id from the session
    user_id = session.get("user_id")
    # if there is no user_id in the session (bc not logged in), return an error message
    if not user_id:
        return jsonify({"error": "No user is currently logged in"}), 401
    
    # retrieve the user document from Firestore using the user_id
    user_doc = db.collection("users").document(user_id).get()
    # if the user document doesn't exist for that id (maybe acc was deleted), return an error message
    if not user_doc.exists:
        return jsonify({"error": "User not found"}), 404

    # convert user document to dictionary, return only user_id and username, not password
    user_data = user_doc.to_dict()
    return jsonify({"user_id": user_id, "username": user_data.get("username")}), 200

# Log Create
@app.route('/api/logs/create', methods=['POST'])
def create_log():
    data = request.json
    user_id = data.get("userId")
    things = data.get("things")

    user = db.collection("users").document(user_id).get()

    if not user.exists:
        return jsonify({"error": "User not found"}), 404

    if len(things) != 3 or any(not thing for thing in things):
        return jsonify({"error": "Exactly 3 good things are required."}), 400
    
    logs_ref = db.collection("logs")
    today = datetime.datetime.now().replace(hour=0, minute=0, second=0, microsecond=0)
    today_query = logs_ref.where('date', '>=', today).where('date', '<', today + datetime.timedelta(days=1)).where("user_id", '==', user_id).get()

    if today_query:
        return jsonify({"error": "You already submitted a log today."}), 409

    body = {
        "thing_1": things[0],
        "thing_2": things[1],
        "thing_3": things[2]

    }

    new_log = {
        "user_id": user_id,
        "date": firestore.SERVER_TIMESTAMP,
        "body":  body
    }

    new_log_ref = db.collection("logs").document()
    new_log_ref.set(new_log)
    return jsonify({"message": "Log creation successful"}), 201

# Log Get
@app.route('/api/logs/get', methods=['GET'])
def get_log():
    user_id = request.args.get("userId")
    date = request.args.get("date")

    if not user_id or not date:
        return jsonify({"error": "user_id and date query parameters required"}), 400

    logs_ref = db.collection("logs")
    target_date = datetime.datetime.strptime(date, "%m-%d-%Y").astimezone(zoneinfo.ZoneInfo('America/Chicago'))

    target_query = logs_ref.where('date', '>=', target_date).where('date', '<', target_date + datetime.timedelta(days=1)).where("user_id", '==', user_id).get()

    if not target_query:
        return jsonify({"error": "Log not found for this date", "target_query": len(target_query)}), 404
    
    return jsonify({"message": "Log found successfully", "log": target_query[0].to_dict()}), 200

# logs user out by clearing the session
@app.route('/api/logs/logout', methods=['POST'])
def logout():
    session.clear()
    return jsonify({"message": "Logged out"}), 200


# Database interaction examples:

#  Example Create/Update data
# @app.route('/users', methods=['POST'])
# def create_user():
#     user_data = jsonify({
#         "key" : "value",
#     })
#     user_ref = db.collection('users').document(user_data.get('id'))
#     user_ref.set(user_data)
#     return jsonify({"success": True}), 201

# Example Read data
# @app.route('/users', methods=['GET'])
# def get_all_users():
#     users_ref = db.collection('User')
#     docs = users_ref.stream()

#     users = []
#     for doc in docs:
#         user_data = doc.to_dict()
#         user_data['id'] = doc.id  # include doc ID if useful
#         users.append(user_data)

#     return jsonify(users)

# Example Delete data
# @app.route('/users/<user_id>', methods=['DELETE'])
# def delete_user(user_id):
#     db.collection('users').document(user_id).delete()
#     return jsonify({"success": True}), 200
    
# Helper route to see all of the users currently in database
# To see this, go to localhost:5000/users on browser and add
@app.route('/users', methods=['GET'])
def get_all_users():
    users_ref = db.collection('users')
    docs = users_ref.stream()

    users = []
    for doc in docs:
        user_data = doc.to_dict()
        user_data['id'] = doc.id 
        users.append(user_data)

    return jsonify(users)

@app.route("/")
def hello_world():
    return "<p>The backend is working</p>"

# Run the app

if __name__ == '__main__':
    app.run(debug=True)