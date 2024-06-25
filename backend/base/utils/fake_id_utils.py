import os
import cv2
import numpy as np
from PIL import Image
import io
import exifread
from PIL import ImageChops, ImageEnhance

# Global thresholds
MAX_EDGES = 3000000
MAX_HUE_STD_DEV = 55
MAX_SATURATION_STD_DEV = 45
MAX_VALUE_STD_DEV = 55
MAX_STD_DEV = 50

# Function definitions from your provided code
def check_metadata(image_bytes):
    image = io.BytesIO(image_bytes)
    tags = exifread.process_file(image)
    for tag in tags.keys():
        if tag.startswith('Image Software'):
            return f"Image edited with {tags[tag]}"
    return "No editing software detected in metadata"

def histogram_analysis(image_path):
    img = cv2.imread(image_path)
    if img is None:
        print("Error: Could not read image at", image_path)
        return "Error: Could not read image"

    b, g, r = cv2.split(img)
    hist_b = cv2.calcHist([b], [0], None, [256], [0, 256])
    hist_g = cv2.calcHist([g], [0], None, [256], [0, 256])
    hist_r = cv2.calcHist([r], [0], None, [256], [0, 256])

    similarity_score = cv2.compareHist(hist_b, hist_g, cv2.HISTCMP_CORREL)
    threshold = 0.9

    if similarity_score < threshold:
        return "Histogram analysis indicates potential tampering"
    else:
        return "Histogram analysis passed"

def error_level_analysis(image_bytes):
    original = Image.open(io.BytesIO(image_bytes))
    
    # Convert the image to RGB mode if it's RGBA
    if original.mode == 'RGBA':
        original = original.convert('RGB')

    resaved = Image.new(original.mode, original.size)
    resaved.paste(original)

    # Save resaved image to buffer without closing it
    with io.BytesIO() as buffer:
        resaved.save(buffer, format='JPEG', quality=95)
        buffer.seek(0)  # Move to the beginning of the buffer

        # Open the saved image from the buffer for further processing
        saved_image = Image.open(buffer)

        # Perform error level analysis
        ela = ImageChops.difference(original, saved_image)
        extrema = ela.getextrema()
        max_diff = max([ex[1] for ex in extrema])

        if max_diff > 0:
            scale = 255.0 / max_diff
            ela = ImageEnhance.Brightness(ela).enhance(scale)
            return "Error level analysis indicates potential tampering"
        else:
            return "Error level analysis passed"

def template_matching(id_image_path):
    template_path = "base/Ids/template.jpg"
    id_image = cv2.imread(id_image_path, cv2.IMREAD_COLOR)
    template = cv2.imread(template_path, cv2.IMREAD_COLOR)

    if id_image is None or template is None:
        print(f"Error: Could not read image(s). id_image: {id_image_path}, template: {template_path}")
        return "Image read error"

    result = cv2.matchTemplate(id_image, template, cv2.TM_CCOEFF_NORMED)
    min_val, max_val, min_loc, max_loc = cv2.minMaxLoc(result)

    threshold = 0.8
    if max_val >= threshold:
        return True
    else:
        return False

# def detect_fake_id(image_path):
#     model_path = "fakeid_detection_model.h5"
#     model = load_model(model_path)

#     # Load and preprocess the image
#     image = Image.open(image_path)

#     # Convert RGBA image to RGB if necessary
#     if image.mode == 'RGBA':
#         image = image.convert('RGB')

#     # Resize the image to match model input size
#     target_size = (445, 527)  # Adjust as per your model's input size requirements
#     image = image.resize(target_size)

#     # Convert image to numpy array and normalize
#     image_array = np.array(image) / 255.0
#     image_array = np.expand_dims(image_array, axis=0)

#     # Make predictions using the loaded model
#     prediction = model.predict(image_array)

#     # Interpret the prediction
#     return "Fake ID" if prediction[0][0] > 0.5 else "Real ID"

def check_color_consistency(image_path):
    image = cv2.imread(image_path)
    hsv = cv2.cvtColor(image, cv2.COLOR_BGR2HSV)
    std_dev_hue = np.std(hsv[:,:,0])
    std_dev_saturation = np.std(hsv[:,:,1])
    std_dev_value = np.std(hsv[:,:,2])
    
    if std_dev_hue > MAX_HUE_STD_DEV or std_dev_saturation > MAX_SATURATION_STD_DEV or std_dev_value > MAX_VALUE_STD_DEV:
        return "Color consistency check failed"
    else:
        return "Color consistency check passed"

def check_tampering(image_path):
    image = cv2.imread(image_path)
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    edges = cv2.Canny(gray, 100, 200)
    num_edges = np.sum(edges)
    
    if num_edges > MAX_EDGES:
        return "Tampering detected"
    else:
        return "No tampering detected"

def check_hologram(image_path):
    image = cv2.imread(image_path)
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    std_dev = np.std(gray)
    
    if std_dev > MAX_STD_DEV:
        return "Hologram detected"
    else:
        return "No hologram detected"

def exif_data_verification(image_path):
    try:
        img = Image.open(image_path)
        exif_data = img._getexif()
        if exif_data is None:
            return "No Exif data found"

        if 36867 in exif_data:
            return f"DateTimeOriginal: {exif_data[36867]}"
        else:
            return "DateTimeOriginal not found"

    except Exception as e:
        return f"Error: {e}"

def noise_analysis(image_path):
    img = cv2.imread(image_path, cv2.IMREAD_GRAYSCALE)
    if img is None:
        print("Error: Could not read image at", image_path)
        return "Error: Could not read image"

    laplacian_var = cv2.Laplacian(img, cv2.CV_64F).var()
    threshold = 100

    if laplacian_var < threshold:
        return "Noise analysis indicates potential tampering"
    else:
        return "Noise analysis passed"

# Directory containing images
# image_directory = "/dataset/fake"

# # List all image files in the directory
# image_files = [f for f in os.listdir(image_directory) if os.path.isfile(os.path.join(image_directory, f))]

# # Template image path for template_matching function
# template_path = "/Ids/template.jpg"

# # Iterate through each image file
# for image_file in image_files:
#     image_path = os.path.join(image_directory, image_file)
#     print(f"Processing {image_path}")

#     # Read image using OpenCV
#     image = cv2.imread(image_path)

#     # Apply all checks
#     print("Color Consistency Check:")
#     print(check_color_consistency(image))
    
#     print("Tampering Check:")
#     print(check_tampering(image))
    
#     print("Hologram Check:")
#     print(check_hologram(image))
    
#     print("Histogram Analysis:")
#     print(histogram_analysis(image_path))
    
#     print("Error Level Analysis:")
#     with open(image_path, 'rb') as f:
#         image_bytes = f.read()
#     print(error_level_analysis(image_bytes))
    
#     print("Exif Data Verification:")
#     print(exif_data_verification(image_path))
    
#     print("Noise Analysis:")
#     print(noise_analysis(image_path))
    
#     print("Template Matching:")
#     result_template_matching = template_matching(image_path, template_path)
#     print(result_template_matching)
    
#     print("Detect Fake ID:")
#     result_detect_fake_id = detect_fake_id(image_path)
#     print(result_detect_fake_id)
    
#     print("\n")