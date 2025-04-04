import datetime
from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)

app.route('/api/entries', methods=['GET'])
def get_entries():
    return jsonify(entries)

# POST 
@app.route('/api/entries', methods=['POST'])
def create_entry():
    data = request.json
    new_entry = {
        "id": max(e["id"] for e in entries) + 1 if entries else 1,
        "date": data.get("date", datetime.now().strftime("%Y-%m-%d")),
        "username": data.get("username", "anonymous"),
        "things": data.get("things", [])
    }

    if len(new_entry["things"]) != 3:
        return jsonify({"error": "Exactly 3 good things must be provided."}), 400

    entries.append(new_entry)
    return jsonify(new_entry), 201

# PATCH 
@app.route('/api/entries/<int:entry_id>', methods=['PATCH'])
def update_entry(entry_id):
    data = request.json
    for entry in entries:
        if entry["id"] == entry_id:
            if "things" in data:
                entry["things"] = data["things"]
            if "date" in data:
                entry["date"] = data["date"]
            if "username" in data:
                entry["username"] = data["username"]
            return jsonify(entry)
    return jsonify({"error": "Entry not found"}), 404

# DELETE
@app.route('/api/entries/<int:entry_id>', methods=['DELETE'])
def delete_entry(entry_id):
    global entries
    entries = [e for e in entries if e["id"] != entry_id]
    return '', 204