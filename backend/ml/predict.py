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
            print(f"Error loading model: {e}")
            return False
    return False

def predict_image(image_bytes):
    global model, class_names
    if model is None:
        if not load_classifier():
            return None, 0.0
            
    try:
        img = Image.open(io.BytesIO(image_bytes)).convert('RGB')
        img = img.resize((224, 224))
        img_array = tf.keras.utils.img_to_array(img)
        img_array = tf.expand_dims(img_array, 0) # Create a batch

        predictions = model.predict(img_array)
        score = tf.nn.softmax(predictions[0])
        
        predicted_class = class_names[np.argmax(score)]
        confidence = float(np.max(score))
        
        return predicted_class.title(), confidence
    except Exception as e:
        print(f"Prediction error: {e}")
        return None, 0.0
