from rest_framework import serializers
from .models import BirthCertificate, NationalID, MilitaryStatus

class BirthCertificateSerializer(serializers.ModelSerializer):
    class Meta:
        model = BirthCertificate
        fields = '__all__'

class NationalIDSerializer(serializers.ModelSerializer):
    class Meta:
        model = NationalID
        fields = '__all__'

class MilitaryStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = MilitaryStatus
        fields = '__all__'