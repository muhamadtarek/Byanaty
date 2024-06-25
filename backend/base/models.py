from django.db import models
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
from django.contrib.auth.models import User
from django.db.models import Max
from django.utils import timezone


class Profile(models.Model):
    user = models.OneToOneField(User, null=True ,on_delete=models.CASCADE, related_name='profile', verbose_name="المستخدم")
    firstname = models.CharField(max_length=100, blank=False, null=False, verbose_name="الاسم الأول")
    lastname = models.CharField(max_length=100, blank=False, null=False, verbose_name="الاسم الأخير")
    email = models.EmailField(unique=True, blank=False, null=False, verbose_name="البريد الإلكتروني")
    serialnumber = models.CharField(max_length=100, blank=False, null=False, default=0,verbose_name="الرقم التسلسلي")
    nationalids = models.ForeignKey('NationalID', null=True, blank=True, on_delete=models.SET_NULL, related_name='profiles', verbose_name="البطاقة الشخصية")
    birthcertificates = models.ForeignKey('BirthCertificate', null=True, blank=True, on_delete=models.SET_NULL, related_name='profiles', verbose_name="شهادة الميلاد")
    militarystatus = models.ForeignKey('MilitaryStatus', null=True, blank=True, on_delete=models.SET_NULL, related_name='profiles', verbose_name="الموقف التجنيدي")
    marriagecertificates = models.ForeignKey('MarriageCertificate', null=True, blank=True, on_delete=models.SET_NULL, related_name='profiles', verbose_name="شهادة الزواج")
    divorcecertificates = models.ForeignKey('DivorceCertificate', null=True, blank=True, on_delete=models.SET_NULL, related_name='profiles', verbose_name="شهادة الطلاق")
    deathcertificates = models.ForeignKey('DeathCertificate', null=True, blank=True, on_delete=models.SET_NULL, related_name='profiles', verbose_name="شهادة الوفاة")
    orders = models.ForeignKey('Order', null=True, blank=True, on_delete=models.SET_NULL, related_name='profiles', verbose_name="الطلب")
    createdat = models.DateTimeField(default=timezone.now, verbose_name="تاريخ الإنشاء")

    class Meta:
        app_label = 'base'

    def __str__(self):
        return self.user.username
    
PARTY_CHOICES = [
    ('1', '1'),
    ('2', '2'),
]

class Order(models.Model):
    user = models.ForeignKey(User, null=True, blank=True,on_delete=models.SET_NULL, verbose_name="المستخدم")
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE, verbose_name="نوع المستند")
    object_id = models.PositiveIntegerField(verbose_name="معرف المستند")
    contentobject = GenericForeignKey('content_type', 'object_id')
    ordernumber = models.IntegerField(unique=True ,null=True, blank=True, verbose_name="عدد النسخ")
    fees = models.IntegerField(default=0, verbose_name="الرسوم")
    feespaid = models.BooleanField(default=False, verbose_name="تم دفع الرسوم")
    paymethod = models.CharField(max_length=100, default='', verbose_name="طريقة الدفع")
    deliverymethod = models.CharField(max_length=100, default='', verbose_name="طريقة التوصيل")
    delivered = models.BooleanField(default=False, verbose_name="تم التوصيل")
    deliveryaddress= models.CharField(max_length=100, null=True, blank=True, default='', verbose_name="عنوان التوصيل")
    firstpartydeliveryaddress = models.CharField(max_length=100, null=True, blank=True,default='', verbose_name="عنوان التوصيل للطرف الأول")
    secondpartydeliveryaddress = models.CharField(max_length=100, null=True, blank=True,default='', verbose_name="عنوان التوصيل للطرف الثاني")
    pickedbyfirstparty = models.BooleanField(default=False, null=True, blank=True,verbose_name="تم الاستلام للطرف الثاني")
    pickedbysecondparty = models.BooleanField(default=False, null=True, blank=True,verbose_name="تم الاستلام للطرف الأول")
    picked = models.BooleanField(default=False, verbose_name="تم الاستلام")
    copies = models.IntegerField(default=1, verbose_name="عدد النسخ")
    parties = models.CharField(max_length=1, choices=PARTY_CHOICES, default='1', verbose_name="الأطراف") #handle in view
    createdat = models.DateTimeField(default=timezone.now, verbose_name="تاريخ الطلب")

    class Meta:
        app_label = 'base'

    def __str__(self):
        return "#" + str(self.ordernumber)
    
    def save(self, *args, **kwargs):
        if not self.ordernumber:
            max_order_number = Order.objects.aggregate(max_number=Max('ordernumber'))['max_number']
            if max_order_number is not None:
                self.ordernumber = max_order_number + 1
            else:
                self.ordernumber = 1
        super(Order, self).save(*args, **kwargs)
    
class NationalID(models.Model):
    user = models.ForeignKey(User, null=True, blank=True,on_delete=models.SET_NULL, verbose_name="المستخدم")
    firstname = models.CharField(max_length=100, default='', verbose_name="الاسم الأول")
    fatherfullname = models.CharField(max_length=100, default='', verbose_name="اسم الأب بالكامل")
    motherfullname = models.CharField(max_length=100, default='', verbose_name="اسم الأم بالكامل")
    birthdate = models.DateField(default='2000-01-01', verbose_name="تاريخ الميلاد")
    city = models.CharField(max_length=100, default='', verbose_name="المحافظة")
    city2 = models.CharField(max_length=100, default='', verbose_name="القسم")
    city3 = models.CharField(max_length=100, default='', verbose_name="القرية")
    buildingnumber = models.CharField(max_length=100, default='', verbose_name="رقم المبنى")
    street = models.CharField(max_length=100, default='', verbose_name="الشارع")
    floor = models.CharField(max_length=100, default='', verbose_name="الطابق")
    appartment = models.IntegerField(default=0, verbose_name="رقم الشقة")
    phone = models.IntegerField(default=0, verbose_name="الهاتف")
    residentialgroup = models.CharField(max_length=100, default='', verbose_name="التجمع السكني")
    job = models.CharField(max_length=100, default='', verbose_name="الوظيفة")
    yearofwork = models.IntegerField(default=0, verbose_name="سنة التوظيف")
    tradeoffice = models.CharField(max_length=100, default='', verbose_name="مكتب التجارة")
    tradeofficenumber = models.IntegerField(default=0, verbose_name="رقم مكتب التجارة")
    workstatus = models.CharField(max_length=100, default='', verbose_name="حالة العمل")
    religion = models.CharField(max_length=100, default='', verbose_name="الديانة")
    gender = models.CharField(max_length=100, default='', verbose_name="الجنس")
    socialstatus = models.CharField(max_length=100, default='', verbose_name="الحالة الاجتماعية")
    worktype = models.CharField(max_length=100, default='', verbose_name="جهة العمل")
    workplace = models.CharField(max_length=100, default='', verbose_name="مكان العمل")
    renewal = models.BooleanField(default=True, verbose_name="تجديد") #handle if both true in view
    replacement = models.BooleanField(default=False, verbose_name="بدل فاقد") #handle if both true in view
    pending = models.BooleanField(default=True, verbose_name="قيد الانتظار")
    completed = models.BooleanField(default=False, verbose_name="تم الانتهاء") #set by admin
    picked = models.BooleanField(default=False, verbose_name="تم الاستلام") #set by admin
    validthru = models.DateField(null=True, blank=True, verbose_name="صالحة حتى") #set by admin
    issuedate = models.DateField(null=True, blank=True, verbose_name="تاريخ الإنشاء") #set by admin
    nationalidreissuecount = models.IntegerField(null=True, blank=True, verbose_name="عدد مرات الإصدار") #set by admin
    valid = models.BooleanField(null=True, blank=True, verbose_name="صالحة") #set by admin
    issuenumber = models.CharField(max_length=100, null=True, blank=True, verbose_name="رقم الإصدار") #set by admin
    createdat = models.DateTimeField(default=timezone.now, verbose_name="تاريخ عمل الطلب")


    class Meta:
        app_label = 'base'

    def __str__(self):
        return self.user.username
    

class BirthCertificate(models.Model):
    user = models.ForeignKey(User, null=True, blank=True,on_delete=models.SET_NULL, verbose_name="المستخدم")
    name = models.CharField(max_length=100, default='', verbose_name="الاسم بالكامل")
    fatherid = models.IntegerField(default=0, verbose_name="الرقم القومي للأب")
    motherid = models.IntegerField(default=0, verbose_name="الرقم القومي للأم")
    birthdate = models.DateField(default='2000-01-01', verbose_name="تاريخ الميلاد")
    governorate = models.CharField(max_length=100, default='', verbose_name="المحافظة")
    gender = models.CharField(max_length=100, default='', verbose_name="الجنس")
    religion = models.CharField(max_length=100, default='', verbose_name="الديانة")
    pending = models.BooleanField(default=True, verbose_name="قيد الانتظار") #set by admin
    completed = models.BooleanField(default=False, verbose_name="تم الانتهاء") #set by admin
    picked = models.BooleanField(default=False, verbose_name="تم الاستلام") #set by admin
    copies = models.IntegerField(default=1, verbose_name="عدد النسخ") #set by admin after user specifies it in payment panel
    createdat = models.DateTimeField(default=timezone.now, verbose_name="تاريخ عمل الطلب")


    class Meta:
        app_label = 'base'

    def __str__(self):
        return self.user.username
    

def user_directory_path(instance, filename):
    # file will be uploaded to MEDIA_ROOT/military_status_images/<username>/<filename>
    return f'military_status_images/{instance.user.username}/{filename}'

class MilitaryStatus(models.Model):
    user = models.ForeignKey(User, null=True, blank=True,on_delete=models.SET_NULL, verbose_name="المستخدم")
    backidimage = models.ImageField(upload_to=user_directory_path, null=True, blank=True, verbose_name="صورة البطاقة الخلفية")
    educationimage = models.ImageField(upload_to=user_directory_path, null=True, blank=True, verbose_name="صورة الشهادة الدراسية")
    birthcertificateimage = models.ImageField(upload_to=user_directory_path, null=True, blank=True, verbose_name="صورة شهادة الميلاد")
    pending = models.BooleanField(default=True, verbose_name="قيد الانتظار")
    completed = models.BooleanField(default=False, verbose_name="تم الانتهاء") #set by admin
    picked = models.BooleanField(default=False, verbose_name="تم الاستلام") #set by admin
    createdat = models.DateTimeField(default=timezone.now, verbose_name="تاريخ عمل الطلب")


    class Meta:
        app_label = 'base'

    def __str__(self):
        return self.user.username
    

class MarriageCertificate(models.Model):
    user = models.ForeignKey(User, null=True, blank=True,on_delete=models.SET_NULL, verbose_name="المستخدم")
    wifefullname = models.CharField(max_length=100, default='', verbose_name="اسم الزوجة بالكامل")
    husbandfullname = models.CharField(max_length=100, default='', verbose_name="اسم الزوج بالكامل")
    wifeid = models.IntegerField(default=0, verbose_name="الرقم القومي للزوجة")
    husbandid = models.IntegerField(default=0, verbose_name="الرقم القومي للزوج")
    wifeaddress = models.CharField(max_length=100, default='', verbose_name="عنوان الزوجة")
    husbandaddress = models.CharField(max_length=100, default='', verbose_name="عنوان الزوج")
    marriagedate = models.DateField(default='2000-01-01', verbose_name="تاريخ الزواج")
    husbandreligion = models.CharField(max_length=100, default='', verbose_name="ديانة الزوج")
    wifereligion = models.CharField(max_length=100, default='', verbose_name="ديانة الزوجة")
    maazounnfullname = models.CharField(max_length=100, default='', verbose_name="اسم المأذون بالكامل")
    maazounnid = models.IntegerField(default=0, verbose_name="الرقم القومي للمأذون")
    completed = models.BooleanField(default=False, verbose_name="تم الانتهاء")
    picked = models.BooleanField(default=False, verbose_name="تم الاستلام")
    pending = models.BooleanField(default=True, verbose_name="قيد الانتظار")
    createdat = models.DateTimeField(default=timezone.now, verbose_name="تاريخ عمل الطلب")


    class Meta:
        app_label = 'base'

    def __str__(self):
        return self.user.username
    

class DivorceCertificate(models.Model):
    user = models.ForeignKey(User, null=True, blank=True,on_delete=models.SET_NULL, verbose_name="المستخدم")
    wifename = models.CharField(max_length=100, default='', verbose_name="اسم الزوجة بالكامل")
    husbandname = models.CharField(max_length=100, default='', verbose_name="اسم الزوج بالكامل")
    wifeid = models.IntegerField(default=0, verbose_name="الرقم القومي للزوجة")
    husbandid = models.IntegerField(default=0, verbose_name="الرقم القومي للزوج")
    wifeaddress = models.CharField(max_length=100, default='', verbose_name="عنوان الزوجة")
    husbandaddress = models.CharField(max_length=100, default='', verbose_name="عنوان الزوج")
    divorcedate = models.DateField(default='2000-01-01', verbose_name="تاريخ الطلاق")
    husbandreligion = models.CharField(max_length=100, default='', verbose_name="ديانة الزوج")
    wifereligion = models.CharField(max_length=100, default='', verbose_name="ديانة الزوجة")
    maazounnfullname = models.CharField(max_length=100, default='', verbose_name="اسم المأذون بالكامل")
    maazounnid = models.IntegerField(default=0, verbose_name="الرقم القومي للمأذون")
    completed = models.BooleanField(default=False, verbose_name="تم الانتهاء")
    picked = models.BooleanField(default=False, verbose_name="تم الاستلام")
    pending = models.BooleanField(default=True, verbose_name="قيد الانتظار")
    createdat = models.DateTimeField(default=timezone.now, verbose_name="تاريخ عمل الطلب")



    class Meta:
        app_label = 'base'  # Add this line 

    def __str__(self):
        return self.user.username


class DeathCertificate(models.Model):
    user = models.ForeignKey(User, null=True, blank=True,on_delete=models.SET_NULL, verbose_name="المستخدم")
    deceasedname = models.CharField(max_length=100, default='', verbose_name="اسم المتوفى بالكامل")
    deceasedid = models.IntegerField(default=0, verbose_name="الرقم القومي للمتوفى")
    deceasedmotherfullname = models.CharField(max_length=100, default='', verbose_name="اسم والدة المتوفى بالكامل")
    deceasedfatherfullname = models.CharField(max_length=100, default='', verbose_name="اسم والد المتوفى بالكامل")
    deceasedbirthdate = models.DateField(default='2000-01-01', verbose_name="تاريخ ميلاد المتوفى")
    deceaseddeathdate = models.DateField(default='2000-01-01', verbose_name="تاريخ وفاة المتوفى")
    placeofdeath = models.CharField(max_length=100, default='', verbose_name="مكان الوفاة")
    causeofdeath = models.CharField(max_length=100, default='', verbose_name="سبب الوفاة")
    religion = models.CharField(max_length=100, default='', verbose_name="الديانة")
    completed = models.BooleanField(default=False, verbose_name="تم الانتهاء")
    picked = models.BooleanField(default=False, verbose_name="تم الاستلام")
    pending = models.BooleanField(default=True, verbose_name="قيد الانتظار")
    createdat = models.DateTimeField(default=timezone.now, verbose_name="تاريخ عمل الطلب")


    class Meta:
        app_label = 'base'

    def __str__(self):
        return self.user.username