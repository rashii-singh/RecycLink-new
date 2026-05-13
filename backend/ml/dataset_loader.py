import os

DATASET_DIR = os.path.join(os.path.dirname(__file__), '..', 'datasets', 'trashnet')
CATEGORIES = ['cardboard', 'glass', 'metal', 'paper', 'plastic', 'trash', 'organic']

def verify_dataset():
    if not os.path.exists(DATASET_DIR):
        os.makedirs(DATASET_DIR)
        
    missing_categories = []
    has_images = False
    
    for category in CATEGORIES:
        cat_dir = os.path.join(DATASET_DIR, category)
        if not os.path.exists(cat_dir):
            os.makedirs(cat_dir)
            missing_categories.append(category)
        else:
            if len(os.listdir(cat_dir)) > 0:
                has_images = True
                
    if not has_images:
        print("="*60)
        print("DATASET NOT FOUND OR EMPTY!")
        print(f"Please place your dataset images in: {os.path.abspath(DATASET_DIR)}")
        print("Required subfolders:")
        for cat in CATEGORIES:
            print(f" - {cat}/")
        print("\nNote: You can download the TrashNet dataset from:")
        print("https://github.com/garythung/trashnet")
        print("For 'organic', you can add images of food waste/compost.")
        print("="*60)
        return False
        
    return True

if __name__ == '__main__':
    verify_dataset()
