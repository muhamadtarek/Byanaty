import os
import cv2
import numpy as np
from PIL import Image
import io
import exifread
from PIL import ImageChops, ImageEnhance

# Global thresholds
MAX_STD_DEV = 50

# Utility functions adapted to work with bytes data
def check_metadata(image_bytes):
    image = Image.open(io.BytesIO(image_bytes))
    tags = exifread.process_file(io.BytesIO(image_bytes))
    for tag in tags.keys():
        if tag.startswith('Image Software'):
            return False  # Edited software detected
    return True  # No editing software detected in metadata

def template_matching_bytes(image_bytes):

    template_path = r'C:\Users\Mohamed\Desktop\projects\Byanaty\backend\base\Ids\template.jpg'
    
    template = cv2.imread(template_path, cv2.IMREAD_COLOR)

    if template is None:
        print(f"Error: Could not read template image: {template_path}")
        return False

    # Convert the image bytes to a NumPy array and decode into an OpenCV image
    nparr = np.frombuffer(image_bytes, np.uint8)
    id_image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

    if id_image is None:
        print("Error: Could not decode image from bytes")
        return False

    # Perform template matching
    result = cv2.matchTemplate(id_image, template, cv2.TM_CCOEFF_NORMED)
    min_val, max_val, min_loc, max_loc = cv2.minMaxLoc(result)

    threshold = 0.1
    return max_val >= threshold

def histogram_analysis_from_bytes(image_bytes):
    img = cv2.imdecode(np.frombuffer(image_bytes, np.uint8), cv2.IMREAD_COLOR)
    if img is None:
        print("Error: Could not decode image from bytes")
        return False  # Error decoding image

    b, g, r = cv2.split(img)
    hist_b = cv2.calcHist([b], [0], None, [256], [0, 256])
    hist_g = cv2.calcHist([g], [0], None, [256], [0, 256])
    hist_r = cv2.calcHist([r], [0], None, [256], [0, 256])

    similarity_score = cv2.compareHist(hist_b, hist_g, cv2.HISTCMP_CORREL)
    threshold = 0.5

    if similarity_score < threshold:
        return False  # Histogram analysis indicates potential tampering
    else:
        return True  # Histogram analysis passed

def error_level_analysis(image_bytes):
    try:
        # Open the original image from bytes
        original = Image.open(io.BytesIO(image_bytes))

        # Convert to RGB mode if RGBA
        if original.mode == 'RGBA':
            original = original.convert('RGB')

        # Create a resaved image to perform error level analysis
        with io.BytesIO() as buffer:
            original.save(buffer, format=original.format, quality=95)
            buffer.seek(0)  # Move to the beginning of the buffer

            # Open the saved image from the buffer for ELA
            saved_image = Image.open(buffer).convert('RGB')

            # Perform error level analysis
            ela = ImageChops.difference(original, saved_image)
            extrema = ela.getextrema()
            max_diff = max([ex[1] for ex in extrema])

            # Adjust threshold as needed based on testing and requirements
            if max_diff > 5:
                return False  # Error level analysis indicates potential tampering
            else:
                return True  # Error level analysis passed

    except Exception as e:
        print(f"Error during error level analysis: {e}")
        return False  # Handle exceptions gracefully


def check_hologram(image_bytes):
    try:
        # Decode the base64 image data to bytes (if necessary)
        image = np.frombuffer(image_bytes, dtype=np.uint8)
        image = cv2.imdecode(image, cv2.IMREAD_COLOR)

        # Convert the image to grayscale
        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

        # Calculate standard deviation of grayscale image
        std_dev = np.std(gray)

        # Determine if hologram is detected based on standard deviation
        if std_dev > MAX_STD_DEV:
            return False  # Hologram detected
        else:
            return True  # No hologram detected

    except Exception as e:
        print(f"Error in check_hologram: {e}")
        return False  # Handle errors gracefully

def exif_data_verification_from_bytes(image_bytes):
    try:
        img = Image.open(io.BytesIO(image_bytes))
        exif_data = img._getexif()
        if exif_data is None:
            return True  # No Exif data found

        if 36867 in exif_data:
            return True  # DateTimeOriginal found
        else:
            return True  # DateTimeOriginal not found

    except Exception as e:
        return False  # Error occurred

def noise_analysis_from_bytes(image_bytes):
    img = cv2.imdecode(np.frombuffer(image_bytes, np.uint8), cv2.IMREAD_GRAYSCALE)
    if img is None:
        print("Error: Could not decode image from bytes")
        return False  # Error decoding image

    laplacian_var = cv2.Laplacian(img, cv2.CV_64F).var()
    threshold = 0.1

    if laplacian_var < threshold:
        return False  # Noise analysis indicates potential tampering
    else:
        return True  # Noise analysis passed