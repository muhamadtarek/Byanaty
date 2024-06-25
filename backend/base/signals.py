from django.core.exceptions import ObjectDoesNotExist
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.core.mail import send_mail
from django.conf import settings
import logging
from .models import Order

# Function to send email
def send_notification_email(instance):
    subject = 'تأكيد تسليم المستند'
    # العنوان الثابت والزمن
    fixed_address = 'أقرب مكتب للسجل المدني في مدينتك'
    fixed_time = 'من الساعة ٩:٠٠ صباحًا - ٢:٠٠ مساءً جميع أيام الأسبوع ما عدا الجمعة والسبت'

    message = (f"مرحبًا،\n\n"
            f"تم تسليم طلب مستند {instance._meta.verbose_name} الخاص بك بنجاح "  #to-do: dictionary from english to arabic to display name of document
            f"وحفظه في قاعدة البيانات لدينا.\n\n"
            f"يرجى استلام مستندك في :\n"
            f"{fixed_address}\n\n"
            f"سيكون المستند جاهزًا للتسليم في الوقت التالي: {fixed_time}\n\n"
            f"أطيب التحيات،\n"
            f"فريق الخدمة الإلكترونية للسجل المدني\n\n")

    recipient_list = [instance.user.email]  # Ensure the user model has an email field
    send_mail(subject, message, settings.EMAIL_HOST_USER, recipient_list, fail_silently=False)

@receiver(post_save, sender=Order)
def update_related_model(sender, instance, update_fields, **kwargs):
    # Check if the 'picked' field was updated
   if update_fields is not None and 'picked' in update_fields:
        # Get the model that the Payment is associated with
        related_model = instance.content_type.model_class()

        # Get the instance of the related model
        related_instance = related_model.objects.get(id=instance.object_id)

        # Update the 'picked' field in the related instance
        related_instance.picked = instance.picked
        related_instance.save()


@receiver(post_save, sender=Order)
def order_saved(sender, instance, **kwargs):
    try:
        # Attempt to get the instance of the related model
        related_instance = instance.content_type.model_class().objects.get(id=instance.object_id)
        # Proceed with sending notification emails
        send_notification_email(related_instance)
    
    except ObjectDoesNotExist:
        # Handle the case where the related instance does not exist
        # For example, log an error message
        logging.error(f"Related instance for Order #{instance.ordernumber} does not exist.")