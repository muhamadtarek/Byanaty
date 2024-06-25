from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
import base64
import pytesseract
import cv2
import os
import numpy as np
from ..utils.ocr_utils import extract_eng_num, extract_ara_num, save_images
from django.conf import settings

# Utility function to convert Arabic numbers to English
def convert_arabic_to_english(arabic_num_str):
    arabic_to_english_map = {
        '٠': '0', '١': '1', '٢': '2', '٣': '3', '٤': '4', '٥': '5',
        '٦': '6', '٧': '7', '٨': '8', '٩': '9'
    }
    english_num_str = ''.join(arabic_to_english_map.get(char, char) for char in arabic_num_str)
    return english_num_str

@csrf_exempt
def card_validation(request):
    if request.method == 'POST':
        pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe' # Path to Tesseract OCR executable
        try:
            data = json.loads(request.body)
            card_img_data = data.get('cardimg')
            username = data.get('username')
            serial_number = data.get('serial_number')

            if not card_img_data:
                return JsonResponse({'error': 'No card image provided'}, status=400)

            card_img_bytes = base64.b64decode(card_img_data.split(',')[1])

            img = cv2.imdecode(np.frombuffer(card_img_bytes, np.uint8), cv2.IMREAD_COLOR)

            eng_num_res = extract_eng_num(img)
            print(eng_num_res)

            ara_num_res = extract_ara_num(img)
            print(ara_num_res)

            if not ara_num_res or not eng_num_res:
                return JsonResponse({'number_detected': False, 'message': 'No number detected in the image'}, status=200)

            # Convert Arabic number to English
            ara_num_res_english = convert_arabic_to_english(ara_num_res)

            if serial_number == eng_num_res and username == ara_num_res_english:
                                   
                # Create directory for the user if it doesn't exist
                user_dir = os.path.join(settings.MEDIA_ROOT, username)
                if not os.path.exists(user_dir):
                    os.makedirs(user_dir)

                # Save the image
                image_path = os.path.join(user_dir, f'{username}_idcard_front_img.jpg')
                cv2.imwrite(image_path, img)

            return JsonResponse({
                'number_detected': True,
                'id_number': ara_num_res_english,
                'serial_number': eng_num_res
            }, status=200)
        

        
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)

    return JsonResponse({'error': 'Invalid request method'}, status=405)