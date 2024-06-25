from django.contrib import admin
from .models import Profile, BirthCertificate, NationalID, MilitaryStatus,MarriageCertificate, DivorceCertificate ,DeathCertificate, Order

Profile._meta.verbose_name = "الملف الشخصي"
Profile._meta.verbose_name_plural = "الملفات الشخصية"

BirthCertificate._meta.verbose_name = "شهادة الميلاد"
BirthCertificate._meta.verbose_name_plural = "شهادات الميلاد"

NationalID._meta.verbose_name = "البطاقة الشخصية"
NationalID._meta.verbose_name_plural = "البطاقات الشخصية"

MilitaryStatus._meta.verbose_name = "الموقف التجنيدي"
MilitaryStatus._meta.verbose_name_plural = "الموقف التجنيدي"

MarriageCertificate._meta.verbose_name = "شهادة الزواج"
MarriageCertificate._meta.verbose_name_plural = "شهادات الزواج"

DivorceCertificate._meta.verbose_name = "شهادة الطلاق"
DivorceCertificate._meta.verbose_name_plural = "شهادات الطلاق"

DeathCertificate._meta.verbose_name = "شهادة الوفاة"
DeathCertificate._meta.verbose_name_plural = "شهادات الوفاة"

Order._meta.verbose_name = "الطلب"
Order._meta.verbose_name_plural = "الطلبات"



# Register all models with the custom verbose_name in the admin site
admin.site.register(Profile)
admin.site.register(BirthCertificate)
admin.site.register(NationalID)
admin.site.register(MilitaryStatus)
admin.site.register(MarriageCertificate)
admin.site.register(DivorceCertificate)
admin.site.register(DeathCertificate)
admin.site.register(Order)
