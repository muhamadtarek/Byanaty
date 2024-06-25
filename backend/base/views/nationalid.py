from django.shortcuts import get_object_or_404
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from ..models import Profile, NationalID
from ..serializers import NationalIDSerializer

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def national_id_view(request):
    if request.method == 'POST':
        username = request.data.get('username', None)
        formdata = request.data.get('formData', None)

        # Your POST request handling logic here
        profile = get_object_or_404(Profile, user__username=username)

        serializer = NationalIDSerializer(data=formdata)

        if serializer.is_valid():
            national_id = serializer.save(user=profile.user)
            return Response(national_id.id, status=status.HTTP_201_CREATED)
        else:
            print("Serializer errors:", serializer.errors)  # Add this print statement
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
