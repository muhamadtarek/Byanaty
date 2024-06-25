from django.shortcuts import get_object_or_404
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from ..models import Profile, BirthCertificate
from ..serializers import BirthCertificateSerializer


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def birth_certificate_view(request):
    if request.method == 'GET':
        # Fetch the user's profile
        profile = get_object_or_404(Profile, user=request.user)
        
        # Retrieve the associated BirthCertificate instance
        birth_certificate = profile.birth_certificate

        serializer = BirthCertificateSerializer(birth_certificate)
        return Response(serializer.data)

    elif request.method == 'POST':
        # Your POST request handling logic here
        username = request.data.get('username', None)
        formdata = request.data.get('formData', None)

        # Your POST request handling logic here
        profile = get_object_or_404(Profile, user__username=username)

        serializer = BirthCertificateSerializer(data=formdata)
        if serializer.is_valid():
            birth_certificate = serializer.save(user=profile.user)
            return Response(birth_certificate.id, status=status.HTTP_201_CREATED)
        else:
            print("Serializer errors:", serializer.errors)  # Add this print statement
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
