from django.db import models
from django.contrib.auth.models import User

class Profile(models.Model):
    user = models.OneToOneField(User, null=True,on_delete=models.CASCADE, related_name='profile')
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField()

    class Meta:
        app_label = 'base'

    def __str__(self):
        return self.user.username


class BirthCertificate(models.Model):
    profile = models.OneToOneField(Profile, on_delete=models.CASCADE, related_name='birth_certificate')
    birth_date = models.DateField()
    place_of_birth = models.CharField(max_length=100)
    registration_number = models.CharField(max_length=100)

    class Meta:
        app_label = 'base'

    def __str__(self):
        return f'{self.profile.user.username} - Birth Certificate'


class NationalID(models.Model):
    profile = models.OneToOneField(Profile, on_delete=models.CASCADE, related_name='national_id')
    id_number = models.CharField(max_length=100)
    issue_date = models.DateField()
    expiration_date = models.DateField()

    class Meta:
        app_label = 'base'

    def __str__(self):
        return f'{self.profile.user.username} - National ID'


class MilitaryStatus(models.Model):
    profile = models.OneToOneField(Profile, on_delete=models.CASCADE, related_name='military_status')
    status = models.CharField(max_length=100)
    document_number = models.CharField(max_length=100, null=True, blank=True)
    exemption_reason = models.CharField(max_length=200, null=True, blank=True)

    class Meta:
        app_label = 'base'

    def __str__(self):
        return f'{self.profile.user.username} - Military Status'