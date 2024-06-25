from django.urls import path
from .views import register_user, get_profile, get_routes, MyTokenObtainPairView
from rest_framework_simplejwt.views import TokenRefreshView
from ..views.nationalid import national_id_view
from ..views.birthcertificate import birth_certificate_view
from ..views.militarystatus import military_status_view
from ..views.divorcecertificate import divorce_certificate_view
from ..views.marriagecertificate import marriage_certificate_view
from ..views.deathcertificate import death_certificate_view
from ..views.ocr import card_validation
from ..views.facevalidate import face_validation
from ..views.blinkdetect import detect_blink_realtime
from ..views.idverify import id_verification
from ..views.order import order_view



urlpatterns = [
    path('register/', register_user),
    path('profile/', get_profile),
    path('routes/', get_routes),
    path('ocr_id/', card_validation, name='card_validation'),
    path('order/', order_view, name='order_view'),
    path('detect_blink_realtime/', detect_blink_realtime, name='detect_blink_realtime'),
    path('face_validation/', face_validation, name='face_validation'),
    path('id_verification/', id_verification, name='id_verification'),
    path('documents/birth_certificate/', birth_certificate_view, name='birth_certificate_view'),
    path('documents/national_id/', national_id_view, name='national_id_view'),
    path('documents/military_status/', military_status_view, name='military_status_view'),
    path('documents/divorce_certificate/', divorce_certificate_view, name='divorce_certificate_view'),
    path('documents/marriage_certificate/', marriage_certificate_view, name='marriage_certificate_view'),
    path('documents/death_certificate/', death_certificate_view, name='death_certificate_view'),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]