import os
import random
from flask import Flask, request, jsonify

app = Flask(__name__)

# Basic CORS support to allow frontend communication
@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    return response



@app.route('/')
def home():
    return "Backend Running"

@app.route('/predict', methods=['POST'])
def predict():
    # Accept image input
    if 'file' not in request.files:
        print("LOG: No file part in request")
        return jsonify({"error": "No file uploaded"}), 400
    
    file = request.files['file']
    if file.filename == '':
        print("LOG: No selected file")
        return jsonify({"error": "No selected file"}), 400
    
    # Read image bytes for prediction
    image_bytes = file.read()
    
    print(f"LOG: Received file {file.filename} for prediction")
    
    # Try using the real ML model
    from ml.predict import predict_image
    predicted_class, confidence = predict_image(image_bytes)
    
    if predicted_class is None:
        print("LOG: Prediction failed or model not loaded")
        return jsonify({"error": "Prediction failed. Model may not be trained."}), 500
    
    confidence_val = round(confidence, 2)
    message = "Prediction successful using ML model."
    
    # Add console logging
    print(f"LOG: Predicted class -> {predicted_class} | Confidence -> {confidence_val}")
    
    return jsonify({
        "category": predicted_class,
        "confidence": confidence_val,
        "message": message,
    })

if __name__ == '__main__':
    app.run(debug=True, port=5000)