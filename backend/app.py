from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
import requests
import firebase_admin
from firebase_admin import firestore

app = firebase_admin.initialize_app()
db = firestore.client()

app = Flask(__name__)
CORS(app)

@app.route("/")
def hello_world():
    return "<p>Hello World! The backend is working</p>"