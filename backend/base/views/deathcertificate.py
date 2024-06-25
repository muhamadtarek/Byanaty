from django.shortcuts import get_object_or_404
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from ..models import Profile
from ..serializers import DeathCertificate
 
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def death_certificate_view(request):
    if request.method == 'POST':
        username = request.data.get('username', None)
        formdata = request.data.get('formData', None)

        # Your POST request handling logic here
        profile = get_object_or_404(Profile, user__username=username)

        serializer = DeathCertificate(data=formdata)

        if serializer.is_valid():
            death_certificate = serializer.save(user=profile.user)  # Remove death_certificate from here
            return Response(death_certificate.id, status=status.HTTP_201_CREATED)
        else:
            print("Serializer errors:", serializer.errors)  # Add this print statement
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)