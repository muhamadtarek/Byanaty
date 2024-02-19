from django.contrib import admin
from .models import Profile, BirthCertificate, NationalID, MilitaryStatus 

admin.site.register(Profile)
admin.site.register(BirthCertificate)
admin.site.register(NationalID)
admin.site.register(MilitaryStatus)
