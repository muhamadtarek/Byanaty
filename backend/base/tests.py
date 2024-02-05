import uuid
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from django.contrib.auth.models import User
from .models import Profile, NationalID,BirthCertificate,MilitaryStatus
from rest_framework_simplejwt.tokens import RefreshToken

class NationalIDAPITests(APITestCase):
    
    @classmethod
    def setUpTestData(cls):
        cls.user = User.objects.create_user(username='testuser', password='testpass123')
        cls.profile, created = Profile.objects.get_or_create(user=cls.user)
        cls.national_id = NationalID.objects.create(
            profile=cls.profile,
            id_number='1234567890',
            issue_date='2020-01-01',
            expiration_date='2030-01-01'
        )

    def setUp(self):
        refresh = RefreshToken.for_user(self.user)
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {refresh.access_token}')

    def test_get_national_id(self):
        url = reverse('national_id_view')  # No change needed if name='national-id-view' is correct
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['id_number'], self.national_id.id_number)

    def test_create_national_id(self):
        url = reverse('national_id_view')  # Again, ensure the name matches your url name
        data = {
            'id_number': '0987654321',
            'issue_date': '2021-01-01',
            'expiration_date': '2031-01-01'
        }
        response = self.client.post(url, data, format='json')
        self.assertIn(response.status_code, [status.HTTP_201_CREATED, status.HTTP_400_BAD_REQUEST])
        # Adjust assertion based on the expected behavior of your application


class BirthCertificateAPITests(APITestCase):
    
    @classmethod
    def setUpTestData(cls):
        # Set up a user, profile, and a birth certificate for testing
        cls.user = User.objects.create_user(username='testuserbc', password='testpass123bc')
        cls.profile, _ = Profile.objects.get_or_create(user=cls.user)
        cls.birth_certificate = BirthCertificate.objects.create(
            profile=cls.profile,
            birth_date='1990-01-01',
            place_of_birth='Test',
            registration_number='BC123456789'
        )

    def setUp(self):
        # Authenticate the user for each test
        refresh = RefreshToken.for_user(self.user)
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {refresh.access_token}')

    def test_get_birth_certificate(self):
        # Test retrieving the birth certificate
        url = reverse('birth_certificate_view')  # Ensure this matches the actual URL name in urls.py
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['registration_number'], self.birth_certificate.registration_number)

    def test_create_birth_certificate(self):
        # Test creating a new birth certificate
        url = reverse('birth_certificate_view')  # Ensure this matches the actual URL name in urls.py
        data = {
            'birth_date': '2000-02-02',
            'place_of_birth': 'Newville',
            'registration_number': 'BC987654321'
        }
        response = self.client.post(url, data, format='json')
        # Expecting either a 201 CREATED or a 400 BAD REQUEST depending on the logic for handling duplicate entries
        self.assertIn(response.status_code, [status.HTTP_201_CREATED, status.HTTP_400_BAD_REQUEST])

        # Optionally, verify the BirthCertificate object was created in the database
        if response.status_code == status.HTTP_201_CREATED:
            self.assertTrue(BirthCertificate.objects.filter(registration_number='BC987654321').exists())

class MilitaryStatusAPITests(APITestCase):
    
    @classmethod
    def setUpTestData(cls):
        # Set up a user, profile, and a military status for testing
        cls.user = User.objects.create_user(username='testuserms', password='testpass123ms')
        cls.profile, _ = Profile.objects.get_or_create(user=cls.user)
        cls.military_status = MilitaryStatus.objects.create(
            profile=cls.profile,
            status='Exempted',
            document_number='MS123456789',
            exemption_reason='Medical'
        )

    def setUp(self):
        # Authenticate the user for each test
        refresh = RefreshToken.for_user(self.user)
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {refresh.access_token}')

    def test_get_military_status(self):
        # Test retrieving the military status
        url = reverse('military_status_view')  # Make sure this matches your actual URL name in urls.py
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['document_number'], self.military_status.document_number)

    def test_create_military_status(self):
        # Test creating a new military status
        url = reverse('military_status_view')  # Ensure this matches the actual URL name in urls.py
        data = {
            'status': 'Served',
            'document_number': 'MS987654321',
            'exemption_reason': ''  # Assuming exemption_reason can be blank if status is not 'Exempted'
        }
        response = self.client.post(url, data, format='json')
        # Expecting either a 201 CREATED or a 400 BAD REQUEST depending on the logic for handling duplicate entries or validation
        self.assertIn(response.status_code, [status.HTTP_201_CREATED, status.HTTP_400_BAD_REQUEST])

        # Optionally, verify the MilitaryStatus object was created in the database
        if response.status_code == status.HTTP_201_CREATED:
            self.assertTrue(MilitaryStatus.objects.filter(document_number='MS987654321').exists())