from django.urls import path
from .views import register_user, get_profile, get_routes, MyTokenObtainPairView
from rest_framework_simplejwt.views import TokenRefreshView
from ..views import birth_certificate_view,national_id_view, military_status_view

urlpatterns = [
    path('register/', register_user),
    path('profile/', get_profile),
    path('routes/', get_routes),
    path('documents/birth_certificate/', birth_certificate_view, name='birth_certificate_view'),
    path('documents/national_id/', national_id_view, name='national_id_view'),
    path('documents/military_status/', military_status_view, name='military_status_view'),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]