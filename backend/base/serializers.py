from rest_framework import serializers
from .models import Profile, BirthCertificate, NationalID, MilitaryStatus

class BirthCertificateSerializer(serializers.ModelSerializer):
    class Meta:
        model = BirthCertificate
        fields = '__all__'
    
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