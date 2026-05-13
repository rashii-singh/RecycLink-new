import os
import random
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/')
def health_check():
    return jsonify({"status": "healthy", "message": "Waste Segregation API is running"}), 200

@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({"error": "No file uploaded"}), 400
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    # ML Placeholder dummy result
    prediction = {
        "class": "Plastic",
        "confidence": 0.92,
        "message": "Waste classified successfully"
    }
    
    print(f"LOG: Received image {file.filename}, predicted: {prediction['class']}")
    
    return jsonify(prediction), 200

if __name__ == '__main__':
    app.run(debug=True, port=5000)
