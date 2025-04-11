from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import datetime

app = Flask(__name__)
CORS(app)

# Simulated in-memory "database"
users = []
entries = []

# Helper: find user by username or ID
def find_user_by_id(user_id):
    return next((u for u in users if u["id"] == user_id), None)

def find_user_by_email(email):
    return next((u for u in users if u["email"] == email), None)


# 1. Create Account

@app.route('/api/users', methods=['POST'])
def create_account():
    data = request.json
    username = data.get("username")
    email = data.get("email")
    password = data.get("password")

    if find_user_by_email(email):
        return jsonify({"error": "Email already in use"}), 400

    user_id = len(users) + 1
    new_user = {
        "id": user_id,
        "username": username,
        "email": email,
        "password": password  # ⚠️ Don't store plain text passwords in real apps!
    }
    users.append(new_user)
    return jsonify({"message": "Account created", "user_id": user_id}), 201


# 2. Submit Log Entry

@app.route('/api/entries', methods=['POST'])
def create_log():
    data = request.json
    user_id = data.get("user_id")
    things = data.get("things")
    date = data.get("date", datetime.now().strftime("%Y-%m-%d"))

    if not find_user_by_id(user_id):
        return jsonify({"error": "User not found"}), 404

    if not isinstance(things, list) or len(things) != 3:
        return jsonify({"error": "Exactly 3 good things are required."}), 400

    # Check if user already has a log for this date
    for entry in entries:
        if entry["user_id"] == user_id and entry["date"] == date:
            return jsonify({"error": "You already submitted for this date."}), 409

    entry_id = len(entries) + 1
    new_entry = {
        "id": entry_id,
        "user_id": user_id,
        "date": date,
        "things": things
    }
    entries.append(new_entry)
    return jsonify(new_entry), 201


# 3. Get Log Entry

@app.route('/api/entries', methods=['GET'])
def get_log():
    user_id = request.args.get("user_id", type=int)
    date = request.args.get("date")

    if not user_id or not date:
        return jsonify({"error": "user_id and date query parameters required"}), 400

    for entry in entries:
        if entry["user_id"] == user_id and entry["date"] == date:
            return jsonify(entry)
    
    return jsonify({"error": "Log not found for this date"}), 404


# Run the app

if __name__ == '__main__':
    app.run(debug=True)
