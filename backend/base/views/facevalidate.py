from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
import base64
import numpy as np
from ..utils.face_utils import validate_faces, detect_multiple_faces, detect_blink

@csrf_exempt
def face_validation(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            card_img_data = data.get('cardimg')
            face_img_data = data.get('faceimg')

            if not card_img_data or not face_img_data:
                return JsonResponse({'error': 'Card image, face image are required'}, status=400)

            # Decode base64 data to bytes
            card_img_bytes = base64.b64decode(card_img_data.split(',')[1])
            face_img_bytes = base64.b64decode(face_img_data.split(',')[1])

            # Convert frames from base64 to bytes
            card_faces = detect_multiple_faces(card_img_bytes)
            if not isinstance(card_faces, (list, tuple)):
                card_faces = []  # or handle the error appropriately

            live_faces = detect_multiple_faces(face_img_bytes)
            if not isinstance(live_faces, (list, tuple)):
                live_faces = []  # or handle the error appropriately

            if card_faces and len(card_faces) > 1:
                return JsonResponse({'card_face_detected': True, 'multiple_faces_detected_card': True, 'live_face_detected': False, 'faces_match': False}, status=200)

            if live_faces and len(live_faces) > 1:
                return JsonResponse({'card_face_detected': False, 'multiple_faces_detected_card': False, 'live_face_detected': True, 'multiple_faces_detected_live': True, 'faces_match': False}, status=200)

            validation_result = validate_faces(card_img_bytes, face_img_bytes)
            validation_result['multiple_faces_detected_card'] = False
            validation_result['multiple_faces_detected_live'] = False

            # Convert all numpy booleans to standard Python booleans
            validation_result = {k: bool(v) if isinstance(v, np.bool_) else v for k, v in validation_result.items()}
            return JsonResponse(validation_result, status=200)
        
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)

    return JsonResponse({'error': 'Invalid request method'}, status=405)