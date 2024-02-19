from django.contrib.auth.models import User
from django.db import IntegrityError,transaction
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAuthenticated

from ..models import Profile
from .serializers import MyTokenObtainPairSerializer,ProfileSerializer, UserSerializer
from rest_framework_simplejwt.views import TokenObtainPairView


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_profile(request):
    user = request.user
    try:
        profile = user.profile
        serializer = ProfileSerializer(profile, many=False)
        return Response(serializer.data)
    except User.profile.RelatedObjectDoesNotExist:
        return Response({"error": "Profile not found."}, status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
def register_user(request):
    # Check if user already exists
    username = request.data.get('username')
    if User.objects.filter(username=username).exists():
        return Response({'error': 'User with this national id already exists'}, status=status.HTTP_400_BAD_REQUEST)

    elif Profile.objects.filter(email=request.data.get('email')).exists():    
        return Response({'error': 'User with this email already exists'}, status=status.HTTP_400_BAD_REQUEST)
    
    user_serializer = UserSerializer(data=request.data)

    if user_serializer.is_valid():
        new_user = user_serializer.save()

        # Check if profile already exists
        profile, created = Profile.objects.get_or_create(user=new_user)
        if not created:
            # If profile exists, update it
            profile_data = {
                'first_name': request.data.get('first_name', ''),
                'last_name': request.data.get('last_name', ''),
                'email': request.data.get('email', '')
            }
            profile_serializer = ProfileSerializer(profile, data=profile_data, partial=True)
            if profile_serializer.is_valid():
                profile_serializer.save()
        else:
            # If profile does not exist, create it
            profile.first_name = request.data.get('first_name', '')
            profile.last_name = request.data.get('last_name', '')
            profile.email = request.data.get('email', '')
            profile.save()

        return Response(user_serializer.data, status=status.HTTP_201_CREATED)
    else:
        return Response(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['GET'])
def get_routes(request):
    """returns a view containing all the possible routes"""
    routes = [
        '/api/token',
        '/api/token/refresh'
    ]

    return Response(routes)