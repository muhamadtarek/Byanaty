from rest_framework import serializers
from .models import BirthCertificate, NationalID, MilitaryStatus, MarriageCertificate, DivorceCertificate, DeathCertificate, Order
from django.contrib.contenttypes.models import ContentType


class BirthCertificateSerializer(serializers.ModelSerializer):
    class Meta:
        model = BirthCertificate
        fields = '__all__'

    def create(self, validated_data):
        user = validated_data.pop('user')

        birth_certificate = BirthCertificate.objects.create(user=user, **validated_data)

        return birth_certificate
    
class NationalIDSerializer(serializers.ModelSerializer):
    class Meta:
        model = NationalID
        fields = '__all__'

    def create(self, validated_data):
        # Extract the 'user' object from the validated data
        user = validated_data.pop('user')

        # Create the NationalID instance

        national_id = NationalID.objects.create(user=user, **validated_data)

        return national_id

class MilitaryStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = MilitaryStatus
        fields = '__all__'

    def create(self, validated_data):
        # Extract the 'user' object from the validated data
        user = validated_data.pop('user')

        # Create the NationalID instance

        military_status = MilitaryStatus.objects.create(user=user, **validated_data)

        return military_status

class MarriageCertificateSerializer(serializers.ModelSerializer):
    class Meta:
        model = MarriageCertificate
        fields = '__all__'

    def create(self, validated_data):
        # Extract the 'user' object from the validated data
        user = validated_data.pop('user')

        marriage_certificate = MarriageCertificate.objects.create(user=user, **validated_data)

        return marriage_certificate

class DivorceCertificateSerializer(serializers.ModelSerializer):
    class Meta:
        model = DivorceCertificate
        fields = '__all__'

    def create(self, validated_data):
        user = validated_data.pop('user')

        divorce_certificate = DivorceCertificate.objects.create(user=user, **validated_data)

        return divorce_certificate

class DeathCertificateSerializer(serializers.ModelSerializer):
    class Meta:
        model = DeathCertificate
        fields = '__all__'

    def create(self, validated_data):
        user = validated_data.pop('user')

        death_certificate = DeathCertificate.objects.create(user=user, **validated_data)

        return death_certificate
    

class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = '__all__'

    def create(self, validated_data):
        user = validated_data.pop('user')

        order = Order.objects.create(user=user, **validated_data)

        return order