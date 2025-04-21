from flask import Flask, request, jsonify
from flask_cors import CORS
import requests

import firebase_admin
from firebase_admin import credentials, firestore

cred = credentials.Certificate("/app/backend/key.json")
firebase_admin.initialize_app(cred)

db = firestore.client()
from datetime import datetime

app = Flask(__name__)
CORS(app)

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

    # query database to see if user with email already exists
    users_ref = db.collection("users")
    existing_users = users_ref.where("email", "==", email).get()
    if existing_users:
        # If a user is found, return an error message that a user with that email already exists
        return jsonify({"error": "A user with this email already exists"}), 400

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
@app.route('/api/users/login', methods=['GET'])
def get_user():
    # get username and password from query string
    username = request.args.get("username")
    password = request.args.get("password")

    if not username or not password:
        return jsonify({"error": "Username and password are required"}), 400

    users_ref = db.collection("users")
    matching_users = users_ref.where("username", "==", username).where("password", "==", password).get()

    if not matching_users:
        # Else, return an error message
        return jsonify({"error": "User not found"}), 404

    # If it does, return a success message and their id
    user_doc = matching_users[0]
    user_id = user_doc.id

    return jsonify({"message": "Login successful", "user_id": user_id}), 200


# Log Create
# TODO Finish implementation + test
@app.route('/api/logs/create', methods=['POST'])
def create_log():
    data = request.json
    user_id = data.get("userId")
    things = data.get("things")
    date = data.get("date", datetime.now().strftime("%Y-%m-%d"))

    # TODO look for user_id in database, if not found or user_id is null return an error
    # if not find_user_by_id(user_id):
    #     return jsonify({"error": "User not found"}), 404

    # TODO ensure that 3 things are passed through, if not return error
    # if not isinstance(things, list) or len(things) != 3:
    #     return jsonify({"error": "Exactly 3 good things are required."}), 400

    # TODO check if user already has a log for date, if found return an error
    # for entry in entries:
    #     if entry["user_id"] == user_id and entry["date"] == date:
    #         return jsonify({"error": "You already submitted for this date."}), 409

    # TODO turn things into a map with keys thing_1, thing_2, thing_3
    # body = {
    #     "thing_1": things[0],
    #     "thing_2": things[1],
    #     "thing_3": things[2]

    # }
    # This is just a guess, it's up to you to determine how things will actually be passed in
    # From the requests.js request

    # TODO delete this line after properly creating body above
    body = things

    new_log = {
        "user_id": user_id,
        "date": date,
        "body":  body
    }

    # TODO add new log to database
    # Note that log has field creation_date, look into if we can have the DB automatically
    #   create it for us rather than passing it in
    # Note that log's body field is of type map, make sure that body that we are passing in matches this type

    # TODO return a success message if new log was successfully created or error message if there was an error
    return jsonify({"message": "Log creation successful"}), 201

# Log Get
# TODO Finish implementation + test
@app.route('/api/logs/get', methods=['GET'])
def get_log():
    user_id = request.args.get("userId")
    date = request.args.get("date")

    # TODO ensure that request has both date and user_id, return an error message if either empty
    # if not user_id or not date:
    #     return jsonify({"error": "user_id and date query parameters required"}), 400

    # TODO query database for log object that has matching user_id and date
    # Note that date field is passed in from frontend in format month-day-year
    # Might need to change the formating of this date to match what the DB expects in your query

    # TODO if log found in database, return it. Otherwise, return an error
    
    # return jsonify({"error": "Log not found for this date"}), 404



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