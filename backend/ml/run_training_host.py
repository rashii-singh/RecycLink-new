import os
import sys

# Add current folder to path
sys.path.append(os.path.dirname(__file__))

from augment_organic import augment_and_populate
from train_model import train

def execute_pipeline():
    print("Step 1: Populating organic waste folder...")
    success = augment_and_populate()
    if not success:
        print("Failed to populate organic folder. Aborting.")
        return False
        
    print("Step 2: Training the classification model...")
    train()
    print("All tasks completed successfully!")
    return True

if __name__ == '__main__':
    execute_pipeline()
