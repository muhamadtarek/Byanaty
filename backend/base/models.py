from django.db import models
from django.contrib.auth.models import User


class Profile(models.Model):
    user = models.OneToOneField(User, null=True ,on_delete=models.CASCADE, related_name='profile')
    first_name = models.CharField(max_length=100, blank=False, null=False)
    last_name = models.CharField(max_length=100, blank=False, null=False)
    email = models.EmailField(unique=True, blank=False, null=False)
    national_id = models.OneToOneField('NationalID', null=True, on_delete=models.SET_NULL, related_name='profile')


    class Meta:
        app_label = 'base'

    def __str__(self):
        return self.user.username
    
class NationalID(models.Model):
    user = models.OneToOneField(User, null=True,on_delete=models.CASCADE)
    idCard = models.IntegerField(default=0)
    firstName = models.CharField(max_length=100, default='')
    dadName = models.CharField(max_length=100, default='')
    momName = models.CharField(max_length=100, default='')
    birthdaydate = models.DateField(default='2000-01-01')
    city3 = models.CharField(max_length=100,default='')
    city2 = models.CharField(max_length=100, default='')
    city = models.CharField(max_length=100, default='')
    buildingNumber = models.IntegerField(default=0)
    street = models.CharField(max_length=100, default='')
    floor = models.CharField(max_length=100 , default='')
    appartment = models.IntegerField(default=0)
    phone = models.IntegerField(default=0)
    group = models.CharField(max_length=100, default='') #تجمع سكني
    job = models.CharField(max_length=100, default='')
    workyear = models.IntegerField(default=0)
    tradeoffice = models.CharField(max_length=100, default='')
    tradeofficeNum = models.IntegerField(default=0)
    work = models.CharField(max_length=100, default='')
    religion = models.CharField(max_length=100, default='')
    gender = models.CharField(max_length=100, default='')
    socialStatus = models.CharField(max_length=100, default='')
    waywork = models.CharField(max_length=100, default='')

    class Meta:
        app_label = 'base'

    def __str__(self):
        return f'{self.user.username} - National ID'
    

class BirthCertificate(models.Model):
    user = models.OneToOneField(User, null=True,on_delete=models.CASCADE)
    idCard = models.IntegerField(default=0)
    birth_date = models.DateField()
    place_of_birth = models.CharField(max_length=100)
    registration_number = models.CharField(max_length=100)

    class Meta:
        app_label = 'base'

    def __str__(self):
        return f'{self.profile.user.username} - Birth Certificate'
    

class MilitaryStatus(models.Model):
    user = models.OneToOneField(User, null=True,on_delete=models.CASCADE)
    idCard = models.IntegerField(default=0)
    status = models.CharField(max_length=100)
    document_number = models.CharField(max_length=100, null=True, blank=True)
    exemption_reason = models.CharField(max_length=200, null=True, blank=True)

    class Meta:
        app_label = 'base'

    def __str__(self):
        return f'{self.profile.user.username} - Military Status'
    

class MarriageCertificate(models.Model):
    user = models.OneToOneField(User, null=True,on_delete=models.CASCADE)
    idCard = models.IntegerField(default=0)
    status = models.CharField(max_length=100)
    document_number = models.CharField(max_length=100, null=True, blank=True)
    exemption_reason = models.CharField(max_length=200, null=True, blank=True)

    class Meta:
        app_label = 'base'

    def __str__(self):
        return f'{self.profile.user.username} - Marriage Certificate'
    

class DivorceCertificate(models.Model):
    user = models.OneToOneField(User, null=True,on_delete=models.CASCADE)
    idCard = models.IntegerField(default=0)
    status = models.CharField(max_length=100)
    document_number = models.CharField(max_length=100, null=True, blank=True)
    exemption_reason = models.CharField(max_length=200, null=True, blank=True)

    class Meta:
        app_label = 'base'  # Add this line 

    def __str__(self):
        return f'{self.profile.user.username} - Divorce Certificate'


class DeathCertificate(models.Model):
    user = models.OneToOneField(User, null=True,on_delete=models.CASCADE)
    idCard = models.IntegerField(default=0)
    status = models.CharField(max_length=100)
    document_number = models.CharField(max_length=100, null=True, blank=True)
    exemption_reason = models.CharField(max_length=200, null=True, blank=True)

    class Meta:
        app_label = 'base'

    def __str__(self):
        return f'{self.profile.user.username} - Death Certificate'