from django.contrib import admin
from .models import Profile, BirthCertificate, NationalID, MilitaryStatus,MarriageCertificate, DivorceCertificate ,DeathCertificate

admin.site.register(Profile)
admin.site.register(BirthCertificate)
admin.site.register(NationalID)
admin.site.register(MilitaryStatus)
admin.site.register(MarriageCertificate)
admin.site.register(DivorceCertificate)
admin.site.register(DeathCertificate)
