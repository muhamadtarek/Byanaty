from rest_framework import serializers
from .models import Profile, BirthCertificate, NationalID, MilitaryStatus

class ArabicChoiceField(serializers.ChoiceField):
    def __init__(self, choices, **kwargs):
        self.reverse_choices = {label: value for value, label in choices}
        super().__init__(choices, **kwargs)

    def to_internal_value(self, data):
        return self.reverse_choices.get(data, None)

class BirthCertificateSerializer(serializers.ModelSerializer):
    class Meta:
        model = BirthCertificate
        fields = '__all__'
    
class NationalIDSerializer(serializers.ModelSerializer):
    religion = ArabicChoiceField(choices=NationalID.RELIGION_CHOICES)
    gender = ArabicChoiceField(choices=NationalID.GENDER_CHOICES)
    socialStatus = ArabicChoiceField(choices=NationalID.MARITAL_STATUS_CHOICES)
    waywork = ArabicChoiceField(choices=NationalID.SECTOR_CHOICES)
    work = ArabicChoiceField(choices=NationalID.WORK_STATUS_CHOICES)

    class Meta:
        model = NationalID
        fields = '__all__'

    def create(self, validated_data):
        # Extract the 'user' object from the validated data
        user = validated_data.pop('user')

        # Create the NationalID instance with the remaining validated data
        validated_data['waywork'] = 'قطاع خاص'
        validated_data['gender'] = 'ذكر'
        validated_data['work'] = 'يعمل'
        validated_data['religion'] = 'مسلم'
        validated_data['socialStatus'] = 'أعزب'
        national_id = NationalID.objects.create(user=user, **validated_data)

        return national_id

class MilitaryStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = MilitaryStatus
        fields = '__all__'