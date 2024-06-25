import json
import cv2
import numpy as np
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import base64
from ..utils.fake_id_utils_bytes import check_metadata, histogram_analysis_from_bytes, error_level_analysis, check_hologram, exif_data_verification_from_bytes, noise_analysis_from_bytes   
from ..utils.fake_id_utils_bytes import template_matching_bytes as template_matching

@csrf_exempt
def id_verification(request):
    if request.method == 'POST':
        try:
            print("Request method is POST")
            
            # Load and decode image data from request body
            data = json.loads(request.body)
            print("Request body loaded")

            image_data = data.get('cardimg')
            if not image_data:
                print("No image data found in the request")
                return JsonResponse({'error': 'Image data is required'}, status=400)
            print("Image data found")

            # Decode base64 image data to bytes
            image_bytes = base64.b64decode(image_data.split(',')[1])
            print("Image data decoded to bytes")

            # Perform various checks
            metadata_result = check_metadata(image_bytes)
            print(f"Metadata check result: {metadata_result}")

            histogram_result = histogram_analysis_from_bytes(image_bytes)
            print(f"Histogram analysis result: {histogram_result}")

            ela_result = error_level_analysis(image_bytes)
            print(f"ELA result: {ela_result}")

            template_matching_result = template_matching(image_bytes)
            print(f"Template matching result: {template_matching_result}")

            hologram_result = check_hologram(image_bytes)
            print(f"Hologram check result: {hologram_result}")

            exif_verification_result = exif_data_verification_from_bytes(image_bytes)
            print(f"EXIF verification result: {exif_verification_result}")

            noise_analysis_result = noise_analysis_from_bytes(image_bytes)
            print(f"Noise analysis result: {noise_analysis_result}")

            passed = all([
                metadata_result, histogram_result, ela_result, template_matching_result, hologram_result,
                exif_verification_result, noise_analysis_result
            ])
            print(f"Overall result: {passed}")

            return JsonResponse({'passed': passed})

        except Exception as e:
            print(f"Exception occurred: {e}")
            return JsonResponse({'error': 'An error occurred during Id verification'}, status=500)

    print("Invalid request method")
    return JsonResponse({'error': 'Invalid request method'}, status=405)