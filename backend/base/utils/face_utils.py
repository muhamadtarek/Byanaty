# utils.py
import cv2
import base64
import numpy as np
import cv2
import numpy as np
import os
from deepface import DeepFace

def load_image_from_bytes(image_bytes):
    try:
        # Decode image bytes to a NumPy array
        nparr = np.frombuffer(image_bytes, np.uint8)
        # Decode the image array to an OpenCV image
        img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        return img
    except Exception as e:
        print(f"Error loading image from bytes: {e}")
        return None

def detect_multiple_faces(image_bytes):
    try:
        # Load the image from bytes
        image = load_image_from_bytes(image_bytes)
        
        if image is None:
            print("Error: Failed to load image from bytes")
            return 0
        
        # Load the pre-trained Haar Cascade for face detection
        face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')

        # Convert the image to grayscale as Haar Cascade works on grayscale images
        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

        # Detect faces in the image
        faces = face_cascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=5, minSize=(30, 30))

        # Return the number of faces detected
        return len(faces)
    
    except Exception as e:
        print(f"Error detecting faces: {e}")
        return 0
    
def detect_blink(img):
    face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
    eye_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_eye.xml')

    # Converting the recorded image to grayscale
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    # Applying filter to remove impurities
    gray = cv2.bilateralFilter(gray, 5, 1, 1)

    # Detecting the face for region of image to be fed to eye classifier
    faces = face_cascade.detectMultiScale(gray, 1.3, 5, minSize=(200, 200))
    blink_detected = False

    if len(faces) > 0:
        for (x, y, w, h) in faces:
            img = cv2.rectangle(img, (x, y), (x + w, y + h), (0, 255, 0), 2)

            # roi_face is face which is input to eye classifier
            roi_face = gray[y:y + h, x:x + w]
            roi_face_clr = img[y:y + h, x:x + w]
            eyes = eye_cascade.detectMultiScale(roi_face, 1.3, 5, minSize=(50, 50))

            # Examining the length of eyes object for eyes
            if len(eyes) < 2:
                blink_detected = True

    return blink_detected

def validate_faces(card_image_bytes, face_image_bytes):
    try:
        # Specify paths to save images
        card_image_path = "card_image.jpg"
        face_image_path = "face_image.jpg"
        
        # Detect and crop faces
        card_face_file = detect_and_crop_face(card_image_bytes, card_image_path)
        face_face_file = detect_and_crop_face(face_image_bytes, face_image_path)
        
        if not card_face_file or not face_face_file:
            return {
                'card_face_detected': False,
                'live_face_detected': False,
                'faces_match': False,
                'message': 'Error during face detection and cropping'
            }
        
        # Perform face recognition using DeepFace on cropped face images
        result = DeepFace.verify(card_face_file, face_face_file)
        
        # Clean up temporary files
        os.remove(card_image_path)
        os.remove(face_image_path)
        
        return {
            'card_face_detected': True,
            'live_face_detected': True,
            'faces_match': result["verified"]
        }

    except Exception as e:
        print(f"Error during face validation: {e}")
        return {
            'card_face_detected': False,
            'live_face_detected': False,
            'faces_match': False,
            'message': 'Error during face validation'
        }


def create_image_file(image_bytes, output_path):
    try:
        # Decode base64 data
        image_data = np.frombuffer(image_bytes, np.uint8)
        
        # Decode image array
        image = cv2.imdecode(image_data, cv2.IMREAD_COLOR)
        
        if image is None or image.size == 0:
            raise ValueError("Decoded image is empty")
        
        # Save the image to the output path
        cv2.imwrite(output_path, image)
        
        return output_path
    
    except Exception as e:
        print(f"Error creating image file: {e}")
        return None

def detect_and_crop_face(image_bytes, output_path):
    try:
        # Check if the output path exists
        if os.path.exists(output_path):
            print(f"Output path '{output_path}' already exists. Skipping creation.")
            return output_path
        
        # Create the image file from base64 data
        image_file = create_image_file(image_bytes, output_path)
        
        if image_file is None:
            return None
        
        # Load the saved image
        image = cv2.imread(image_file)
        
        if image is None or image.size == 0:
            raise ValueError(f"Failed to load image from {image_file}")
        
        # Convert to grayscale
        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        
        # Load the face cascade classifier
        face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
        
        # Detect faces in the grayscale image
        faces = face_cascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=5, minSize=(30, 30))
        
        if len(faces) != 1:
            print(f"Error: No face detected or multiple faces detected in {image_file}")
            return None
        
        # Extract the coordinates of the detected face
        x, y, w, h = faces[0]
        
        # Add padding to the bounding box
        padding = 10
        x = max(0, x - padding)
        y = max(0, y - padding)
        w += padding * 2
        h += padding * 2
        
        # Crop the face region from the image
        cropped_face = image[y:y+h, x:x+w]
        
        if cropped_face is None or cropped_face.size == 0:
            raise ValueError("Cropped face image is empty")
        
        # Save the cropped face to the output path
        cv2.imwrite(output_path, cropped_face)
        print(f"Face cropped and saved as {output_path}")
        
        return output_path
    
    except Exception as e:
        print(f"Error during face detection and cropping: {e}")
        return None