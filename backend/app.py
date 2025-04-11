from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
import requests

import firebase_admin
from firebase_admin import credentials, firestore

cred = credentials.Certificate("/app/backend/key.json")
firebase_admin.initialize_app(cred)

db = firestore.client()

app = Flask(__name__)
CORS(app)

@app.route("/")
def hello_world():
    return "<p>Hello World! The backend is working</p>"

@app.route('/users', methods=['GET'])
def get_all_users():
    users_ref = db.collection('users')
    docs = users_ref.stream()

    users = []
    for doc in docs:
        user_data = doc.to_dict()
        user_data['id'] = doc.id  # include doc ID if useful
        users.append(user_data)

    return jsonify(users)