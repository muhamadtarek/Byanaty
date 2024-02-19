from django.db.models.signals import post_save
from django.dispatch import receiver
from django.core.mail import send_mail
from django.conf import settings
from .models import NationalID, BirthCertificate, MilitaryStatus  

# Function to send email
def send_notification_email(instance):
    subject = 'Document Submission Confirmation'
    # Fixed address and time
    fixed_address = '123 Document St., Maadi, Cairo'
    fixed_time = 'from 9:00 AM - 2:00 PM on a weekday'  

    message = (f"Hello,\n\n"
               f"Your {instance._meta.verbose_name} document has been successfully submitted "
               f"and saved in our database.\n\n"
               f"Please collect your document at the following address:\n"
               f"{fixed_address}\n\n"
               f"The document will be ready for pickup : {fixed_time}\n\n"
               f"Best regards,\n"
               f"Your Service Team")

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