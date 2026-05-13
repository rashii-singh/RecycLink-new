import os
import tensorflow as tf
from dataset_loader import verify_dataset

MODEL_PATH = os.path.join(os.path.dirname(__file__), '..', 'models', 'waste_classifier.h5')
DATASET_DIR = os.path.join(os.path.dirname(__file__), '..', 'datasets', 'trashnet')

def train():
    if not verify_dataset():
        print("Aborting training due to missing dataset.")
        return

    print("Loading dataset...")
    # Setup dataset
    batch_size = 32
    img_height = 224
    img_width = 224

    train_ds = tf.keras.utils.image_dataset_from_directory(
      DATASET_DIR,
      validation_split=0.2,
      subset="training",
      seed=123,
      image_size=(img_height, img_width),
      batch_size=batch_size)

    val_ds = tf.keras.utils.image_dataset_from_directory(
      DATASET_DIR,
      validation_split=0.2,
      subset="validation",
      seed=123,
      image_size=(img_height, img_width),
      batch_size=batch_size)

    class_names = train_ds.class_names
    print(f"Classes found: {class_names}")

    # Build model using MobileNetV2
    base_model = tf.keras.applications.MobileNetV2(
        input_shape=(img_height, img_width, 3),
        include_top=False,
        weights='imagenet'
    )
    base_model.trainable = False # Freeze base model

    model = tf.keras.Sequential([
        tf.keras.layers.Rescaling(1./127.5, offset=-1), # MobileNetV2 expects [-1, 1]
        base_model,
        tf.keras.layers.GlobalAveragePooling2D(),
        tf.keras.layers.Dropout(0.2),
        tf.keras.layers.Dense(len(class_names), activation='softmax')
    ])

    model.compile(
        optimizer='adam',
        loss=tf.keras.losses.SparseCategoricalCrossentropy(),
        metrics=['accuracy']
    )

    print("Starting training...")
    epochs = 5 # Small number for demonstration, increase for real use
    history = model.fit(
        train_ds,
        validation_data=val_ds,
        epochs=epochs
    )
    
    os.makedirs(os.path.dirname(MODEL_PATH), exist_ok=True)
    model.save(MODEL_PATH)
    
    # Save class names mapping
    with open(os.path.join(os.path.dirname(__file__), '..', 'models', 'classes.txt'), 'w') as f:
        f.write('\n'.join(class_names))

    print(f"Model saved to {MODEL_PATH}")

if __name__ == '__main__':
    train()
