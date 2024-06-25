import base64
import cv2
import numpy as np
from rest_framework.decorators import api_view
from rest_framework.response import Response
from ..utils.face_utils import detect_blink

@api_view(['POST'])
def detect_blink_realtime(request):
    try:
        frames = request.data.get('frames', [])
        if not frames:
            return Response({"error": "No frames provided"}, status=400)

        # Decode the last frame from base64 to image
        frame_data = frames[-1]
        frame_bytes = base64.b64decode(frame_data)
        nparr = np.frombuffer(frame_bytes, np.uint8)
        img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        
        if img is None or img.size == 0:
            return Response({"error": "Failed to decode image"}, status=400)

        # Call your blink detection function
        blink_detected = detect_blink(img)

        return Response({"blink_detected": blink_detected})

    except Exception as e:
        return Response({"error": str(e)}, status=500)