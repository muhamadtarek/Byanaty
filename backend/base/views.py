from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from .models import Profile, BirthCertificate, NationalID, MilitaryStatus
from .serializers import BirthCertificateSerializer, NationalIDSerializer, MilitaryStatusSerializer

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def birth_certificate_view(request):
    profile, created = Profile.objects.get_or_create(user=request.user)
    if request.method == 'GET':
        try:
            birth_certificate = profile.birth_certificate
            serializer = BirthCertificateSerializer(birth_certificate)
            return Response(serializer.data)
        except BirthCertificate.DoesNotExist:
            return Response({'error': 'Birth Certificate not found.'}, status=status.HTTP_404_NOT_FOUND)

    elif request.method == 'POST':
        serializer = BirthCertificateSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(profile=profile)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def national_id_view(request):
    profile, created = Profile.objects.get_or_create(user=request.user)
    if request.method == 'GET':
        try:
            national_id = profile.national_id
            serializer = NationalIDSerializer(national_id)
            return Response(serializer.data)
        except NationalID.DoesNotExist:
            return Response({'error': 'National ID not found.'}, status=status.HTTP_404_NOT_FOUND)

    elif request.method == 'POST':
        serializer = NationalIDSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(profile=profile)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def military_status_view(request):
    profile, created = Profile.objects.get_or_create(user=request.user)
    if request.method == 'GET':
        try:
            military_status = profile.military_status
            serializer = MilitaryStatusSerializer(military_status)
            return Response(serializer.data)
        except MilitaryStatus.DoesNotExist:
            return Response({'error': 'Military Status not found.'}, status=status.HTTP_404_NOT_FOUND)

    elif request.method == 'POST':
        serializer = MilitaryStatusSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(profile=profile)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)