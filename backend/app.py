from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
import requests
import firebase_admin
from firebase_admin import firestore
from firebase_admin import credentials

cred = credentials.Certificate("/app/.firebasekey/key.json")
app = firebase_admin.initialize_app(cred)
db = firestore.client()

app = Flask(__name__)
CORS(app)

@app.route("/")
def hello_world():
    return "<p>Hello World! The backend is working</p>"

from flask import Flask, request, jsonify

app = Flask(__name__)


# Create/Update data
@app.route('/users', methods=['POST'])
def create_user():
    user_data = jsonify({
        "key" : "value",
    })
    user_ref = db.collection('users').document(user_data.get('id'))
    user_ref.set(user_data)
    return jsonify({"success": True}), 201

# Read data
@app.route('/users/<user_id>', methods=['GET'])
def get_user(user_id):
    user_ref = db.collection('users').document(user_id)
    user = user_ref.get()
    if user.exists:
        return jsonify(user.to_dict())
    return jsonify({"error": "User not found"}), 404

# Delete data
@app.route('/users/<user_id>', methods=['DELETE'])
def delete_user(user_id):
    db.collection('users').document(user_id).delete()
    return jsonify({"success": True}), 200