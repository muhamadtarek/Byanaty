from django.shortcuts import get_object_or_404
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from .models import Profile, BirthCertificate, NationalID, MilitaryStatus
from .serializers import BirthCertificateSerializer, NationalIDSerializer, MilitaryStatusSerializer

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def national_id_view(request):
    if request.method == 'GET':
        # Fetch the user's profile
        profile = get_object_or_404(Profile, user=request.user)
        
        # Retrieve the associated NationalID instance
        national_id = profile.national_id

        print("National ID:", national_id)  # Add this print statement

        serializer = NationalIDSerializer(national_id)
        return Response(serializer.data)

    elif request.method == 'POST':
        # Your POST request handling logic here
        id_card = request.data.get('idCard', None)
        if id_card:
            profile = get_object_or_404(Profile, user__username=id_card)
            national_id = profile.national_id  # Retrieve the associated NationalID instance

            serializer = NationalIDSerializer(data=request.data)

            if serializer.is_valid():
                serializer.save(user=profile.user)  # Remove national_id from here
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            else:
                print("Serializer errors:", serializer.errors)  # Add this print statement
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({'error': 'national id is required.'}, status=status.HTTP_400_BAD_REQUEST)















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
        idCard = request.data.get('idCard', None)
        if idCard:
            profile = get_object_or_404(Profile, user__username=idCard)
            birth_certificate = profile.birth_certificate  # Retrieve the associated BirthCertificate instance

            serializer = BirthCertificateSerializer(data=request.data)

            if serializer.is_valid():
                serializer.save(user=profile.user)  # Remove birth_certificate from here
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            else:
                print("Serializer errors:", serializer.errors)  # Add this print statement
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({'error': 'Birth certificate data is required.'}, status=status.HTTP_400_BAD_REQUEST)















@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def military_status_view(request):
    if request.method == 'GET':
        # Fetch the user's profile
        profile = get_object_or_404(Profile, user=request.user)
        
        # Retrieve the associated MilitaryStatus instance
        military_status = profile.military_status

        serializer = MilitaryStatusSerializer(military_status)
        return Response(serializer.data)

    elif request.method == 'POST':
        # Your POST request handling logic here
        idCard = request.data.get('idCard', None)
        if idCard:
            profile = get_object_or_404(Profile, user__username=idCard)
            military_status = profile.military_status  # Retrieve the associated MilitaryStatus instance

            serializer = MilitaryStatusSerializer(data=request.data)

            if serializer.is_valid():
                serializer.save(user=profile.user)  # Remove military_status from here
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            else:
                print("Serializer errors:", serializer.errors)  # Add this print statement
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({'error': 'Military status data is required.'}, status=status.HTTP_400_BAD_REQUEST)
