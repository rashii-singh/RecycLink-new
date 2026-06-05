import os
import tensorflow as tf
from PIL import Image
import numpy as np
import io
from keras.models import load_model

MODEL_PATH = os.path.join(os.path.dirname(__file__), '..', 'models', 'waste_classifier.h5')
CLASSES_PATH = os.path.join(os.path.dirname(__file__), '..', 'models', 'classes.txt')

model = None
class_names = []

def load_classifier():
    global model, class_names
    if os.path.exists(MODEL_PATH) and os.path.exists(CLASSES_PATH):
        try:
            model = load_model(MODEL_PATH)
            with open(CLASSES_PATH, 'r') as f:
                class_names = f.read().splitlines()
            return True
        except Exception as e:
            import traceback
            traceback.print_exc()
            print(f"Error loading model: {e}")
            return False

def get_friendly_name(cat):
    mapping = {
        "organic": "Organic Waste",
        "cardboard": "Cardboard",
        "glass": "Glass",
        "metal": "Metal",
        "paper": "Paper",
        "plastic": "Plastic",
        "trash": "Trash"
    }
    return mapping.get(cat.lower(), cat.title())

def predict_image(image_bytes):
    global model, class_names
    if model is None:
        if not load_classifier():
            return None, 0.0, []
            
    try:
        img = Image.open(io.BytesIO(image_bytes)).convert('RGB')
        img = img.resize((224, 224))
        img_array = tf.keras.utils.img_to_array(img)
        img_array = tf.expand_dims(img_array, 0) # Create a batch

        predictions = model.predict(img_array)
        score = predictions[0]
        
        # Post-prediction temperature scaling for confidence calibration (T = 1.3)
        epsilon = 1e-7
        logits = np.log(score + epsilon)
        temperature = 1.3
        scaled_logits = logits / temperature
        
        # Softmax re-normalization
        exp_logits = np.exp(scaled_logits - np.max(scaled_logits))
        calibrated_score = exp_logits / np.sum(exp_logits)
        
        predicted_class = class_names[np.argmax(calibrated_score)]
        confidence = float(np.max(calibrated_score))
        
        # Calculate calibrated confidence percentage
        confidence_pct = round(confidence * 100, 2)
        
        # Get top 3 predictions
        top_indices = np.argsort(calibrated_score)[::-1][:3]
        top_predictions = []
        for idx in top_indices:
            friendly_name = get_friendly_name(class_names[idx])
            top_predictions.append({
                "category": friendly_name,
                "confidence": round(float(calibrated_score[idx]) * 100, 1)
            })
        
        # 1. Below 70% confidence check
        if confidence_pct < 70.0:
            return "Unable to confidently identify waste type", confidence_pct / 100.0, top_predictions
            
        # 2. Uncertain (between 70% and 85%) check (especially for mixed/organic waste)
        if confidence_pct < 85.0:
            return "Mixed or unclear waste detected", confidence_pct / 100.0, top_predictions
            
        return predicted_class.title(), confidence_pct / 100.0, top_predictions
    except Exception as e:
        import traceback
        traceback.print_exc()
        print(f"Prediction error: {e}")
        return None, 0.0, []
