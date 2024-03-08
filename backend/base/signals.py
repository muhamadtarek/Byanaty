from django.db.models.signals import post_save
from django.dispatch import receiver
from django.core.mail import send_mail
from django.conf import settings
from .models import NationalID, BirthCertificate, MilitaryStatus, MarriageCertificate, DivorceCertificate, DeathCertificate 

# Function to send email
def send_notification_email(instance):
    subject = 'تأكيد تسليم المستند'
    # العنوان الثابت والزمن
    fixed_address = 'أقرب مكتب للسجل المدني في مدينتك'
    fixed_time = 'من الساعة ٩:٠٠ صباحًا - ٢:٠٠ مساءً في أيام الأسبوع'

    message = (f"مرحبًا،\n\n"
            f"تم تسليم مستند {instance._meta.verbose_name} الخاص بك بنجاح "  #to-do: dictionary from english to arabic to display name of document
            f"وحفظه في قاعدة البيانات لدينا.\n\n"
            f"يرجى استلام مستندك في :\n"
            f"{fixed_address}\n\n"
            f"سيكون المستند جاهزًا للتسليم في الوقت التالي: {fixed_time}\n\n"
            f"أطيب التحيات،\n"
            f"فريق الخدمة الخاص بك")

    recipient_list = [instance.user.email]  # Ensure the user model has an email field
    send_mail(subject, message, settings.EMAIL_HOST_USER, recipient_list, fail_silently=False)

# Signal receivers for each document model
@receiver(post_save, sender=NationalID)
def national_id_saved(sender, instance, created, **kwargs):
    if created:  # Ensures the email is sent only on creation, not on every save
        send_notification_email(instance)

@receiver(post_save, sender=BirthCertificate)
def birth_certificate_saved(sender, instance, created, **kwargs):
    if created:
        send_notification_email(instance)

@receiver(post_save, sender=MilitaryStatus)
def military_status_saved(sender, instance, created, **kwargs):
    if created:
        send_notification_email(instance)

@receiver(post_save, sender=MarriageCertificate)
def marriage_certificate_saved(sender, instance, created, **kwargs):
    if created:
        send_notification_email(instance)

@receiver(post_save, sender=DivorceCertificate)
def divorce_certificate_saved(sender, instance, created, **kwargs):
    if created:
        send_notification_email(instance)

@receiver(post_save, sender=DeathCertificate)
def death_certificate_saved(sender, instance, created, **kwargs):
    if created:
        send_notification_email(instance)