import os
from PIL import Image, ImageEnhance
import random

GEN_IMG_PATH = r"C:\Users\rashi\.gemini\antigravity\brain\155994f7-a2e8-4d09-a211-1756176225a6\organic1_1779209158021.png"
DEST_DIR = os.path.join(os.path.dirname(__file__), '..', 'datasets', 'trashnet', 'organic')

def augment_and_populate():
    if not os.path.exists(GEN_IMG_PATH):
        print(f"Error: Generated image not found at {GEN_IMG_PATH}")
        return False
        
    os.makedirs(DEST_DIR, exist_ok=True)
    
    # Load base image
    img = Image.open(GEN_IMG_PATH).convert('RGB')
    
    # Let's generate 100 augmented images
    print("Generating 100 augmented organic images...")
    for i in range(100):
        # 1. Random rotation
        angle = random.uniform(-45, 45)
        aug_img = img.rotate(angle, Image.BICUBIC, expand=True)
        
        # 2. Random crop back to base size or resize back
        aug_img = aug_img.resize((img.width, img.height), Image.Resampling.LANCZOS)
        
        # 3. Random horizontal flip
        if random.choice([True, False]):
            aug_img = aug_img.transpose(Image.FLIP_LEFT_RIGHT)
            
        # 4. Random vertical flip
        if random.choice([True, False]):
            aug_img = aug_img.transpose(Image.FLIP_TOP_BOTTOM)
            
        # 5. Random brightness variation
        brightness_factor = random.uniform(0.6, 1.4)
        aug_img = ImageEnhance.Brightness(aug_img).enhance(brightness_factor)
        
        # 6. Random contrast variation
        contrast_factor = random.uniform(0.7, 1.3)
        aug_img = ImageEnhance.Contrast(aug_img).enhance(contrast_factor)
        
        # Save augmented image
        dest_path = os.path.join(DEST_DIR, f"organic_{i+1}.jpg")
        aug_img.save(dest_path, "JPEG", quality=90)
        
    print(f"Successfully populated {DEST_DIR} with 100 augmented samples.")
    return True

if __name__ == '__main__':
    augment_and_populate()
