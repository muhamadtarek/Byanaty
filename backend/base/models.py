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

    RELIGION_CHOICES = [
        ('muslim', 'مسلم'),
        ('christian', 'مسيحي'),
        ('jewish', 'يهودي'),
    ]
    GENDER_CHOICES = [
        ('male', 'ذكر'),
        ('female', 'أنثى'),
    ]
    MARITAL_STATUS_CHOICES = [
        ('single', 'أعزب'),
        ('married', 'متزوج'),
        ('divorced', 'مطلق'),
        ('widowed', 'أرمل'),
    ]
    WORK_STATUS_CHOICES = [
        ('employed', 'يعمل'),
        ('unemployed', 'لا يعمل'),

    ]
    SECTOR_CHOICES = [
        ('other', 'أخرى'),
        ('private', 'قطاع خاص'),
        ('business', 'قطاع أعمال'),
        ('public', 'قطاع عام'),
        ('government', 'حكومة'),
    ]
    work = models.CharField(max_length=20, choices=WORK_STATUS_CHOICES,default = "يعمل")
    religion = models.CharField(max_length=20, choices=RELIGION_CHOICES,default = "مسلم")
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES, default = "ذكر")
    socialStatus = models.CharField(max_length=10, choices=MARITAL_STATUS_CHOICES, default = "أعزب")
    waywork = models.CharField(max_length=20, choices=SECTOR_CHOICES, default = "قطاع خاص")

    class Meta:
        app_label = 'base'

    def __str__(self):
        return f'{self.user.username} - National ID'
    


























class BirthCertificate(models.Model):
    profile = models.OneToOneField(Profile, on_delete=models.CASCADE, related_name='birth_certificate')
    birth_date = models.DateField()
    place_of_birth = models.CharField(max_length=100)
    registration_number = models.CharField(max_length=100)

    class Meta:
        app_label = 'base'

    def __str__(self):
        return f'{self.profile.user.username} - Birth Certificate'
    

class MilitaryStatus(models.Model):
    profile = models.OneToOneField(Profile, on_delete=models.CASCADE, related_name='military_status')
    status = models.CharField(max_length=100)
    document_number = models.CharField(max_length=100, null=True, blank=True)
    exemption_reason = models.CharField(max_length=200, null=True, blank=True)

    class Meta:
        app_label = 'base'

    def __str__(self):
        return f'{self.profile.user.username} - Military Status'