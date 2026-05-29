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
    result = predict_image(image_bytes)
    if isinstance(result, tuple) and len(result) == 3:
        predicted_class, confidence, top_predictions = result
    else:
        predicted_class, confidence = result
        top_predictions = []
    
    if predicted_class is None:
        print("LOG: Prediction failed or model not loaded")
        return jsonify({"error": "Prediction failed. Model may not be trained."}), 500
    
    confidence_val = round(confidence, 2)
    message = "Prediction successful using ML model."
    
    # Add console logging
    print(f"LOG: Predicted class -> {predicted_class} | Confidence -> {confidence_val} | Top predictions -> {top_predictions}")
    
    return jsonify({
        "category": predicted_class,
        "confidence": confidence_val,
        "message": message,
        "top_predictions": top_predictions
    })

@app.route('/train-model')
def train_model_endpoint():
    try:
        from ml.run_training_host import execute_pipeline
        success = execute_pipeline()
        if success:
            from ml.predict import load_classifier
            load_classifier()
            return jsonify({"status": "success", "message": "Model retrained with organic waste data successfully!"})
        else:
            return jsonify({"status": "error", "message": "Pipeline execution failed."}), 500
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)