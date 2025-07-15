from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import os

app = Flask(__name__, static_folder='../frontend', static_url_path='')
CORS(app)

users = {
    "alice": "alice123",
    "bob": "bob123",
    "admin": "admin123"
}

@app.route('/')
def home():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data.get("username")
    password = data.get("password")

    if username in users and users[username] == password:
        return jsonify({"success": True})
    return jsonify({"success": False})

@app.route('/forgot-password', methods=['POST'])
def forgot_password():
    username = request.json.get("username")
    if username in users:
        link = f"/reset-password.html?username={username}"
        return jsonify({"link": link})
    return jsonify({"error": "User not found"}), 404

@app.route('/reset-password', methods=['POST'])
def reset_password():
    data = request.json
    username = data.get("username")
    newpass = data.get("password")
    if username in users:
        users[username] = newpass
        return jsonify({"status": "Password updated"})
    return jsonify({"error": "Invalid user"}), 400

@app.route('/<path:path>')
def static_files(path):
    return send_from_directory(app.static_folder, path)

@app.route('/users')
def get_users():
    return jsonify(list(users.keys()))


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(debug=True, host="0.0.0.0", port=port)
