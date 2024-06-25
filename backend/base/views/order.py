from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from django.utils import timezone
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.contrib.contenttypes.models import ContentType
from ..models import Order, Profile, NationalID, BirthCertificate, MilitaryStatus, MarriageCertificate, DivorceCertificate, DeathCertificate
from ..serializers import OrderSerializer, NationalIDSerializer, BirthCertificateSerializer, MilitaryStatusSerializer, MarriageCertificateSerializer, DivorceCertificateSerializer, DeathCertificateSerializer
import json

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def order_view(request):
    if request.method == 'POST':
        try:
            data = request.data
            username = data.get('username')
            order_details = data.get('orderDetails', {})
            document_type = data.get('documentType')
            object_id = data.get('objectId')


            if not username:
                return JsonResponse({'status': 'error', 'message': 'Username is required'}, status=400)
            if not order_details:
                return JsonResponse({'status': 'error', 'message': 'Order details are required'}, status=400)
            if not document_type:
                return JsonResponse({'status': 'error', 'message': 'Document type is required'}, status=400)
            if not object_id:
                return JsonResponse({'status': 'error', 'message': 'Object ID is required'}, status=400)

            # Validate and get user profile
            profile = get_object_or_404(Profile, user__username=username)

            # Determine content type ID based on document type
            content_type = None
            if document_type == 'national_id':
                content_type = ContentType.objects.get_for_model(NationalID)
            elif document_type == 'birth_certificate':
                content_type = ContentType.objects.get_for_model(BirthCertificate)
            elif document_type == 'military_status':
                content_type = ContentType.objects.get_for_model(MilitaryStatus)
            elif document_type == 'marriage_certificate':
                content_type = ContentType.objects.get_for_model(MarriageCertificate)
            elif document_type == 'divorce_certificate':
                content_type = ContentType.objects.get_for_model(DivorceCertificate)
            elif document_type == 'death_certificate':
                content_type = ContentType.objects.get_for_model(DeathCertificate)
            else:
                return JsonResponse({'status': 'error', 'message': 'Invalid document type'}, status=400)

            # Prepare order data
            order_data = {
                "content_type": content_type.id,
                "fees": order_details.get('fees', 0),
                "paymethod": order_details.get('paymethod', ''),
                "deliverymethod": order_details.get('deliverymethod', ''),
                "deliveryaddress": order_details.get('deliveryaddress', ''),
                "firstpartydeliveryaddress": order_details.get('partyAddresses', [{}])[0].get('address', '') if order_details.get('parties', 1) == 2 else '',
                "secondpartydeliveryaddress": order_details.get('partyAddresses', [{}])[1].get('address', '') if order_details.get('parties', 1) == 2 else '',
                "parties": str(order_details.get('parties', '1')),
                "createdat": timezone.now().isoformat(),
                "pickedbyfirstparty": False,
                "pickedbysecondparty": False,
                "object_id": int(object_id)
            }
            if 'copies' in order_details:
                order_data['copies'] = order_details['copies']

            print("Order Data Final: ", order_data)

            # Serialize and save order
            serializer = OrderSerializer(data=order_data)
            print('gotten data!6')
            if serializer.is_valid():
                order = serializer.save(user=profile.user)
                order.save(update_fields=['picked'])
        
                # Serialize the order instance to JSON
                response_serializer = OrderSerializer(order)
                return Response(response_serializer.data, status=status.HTTP_201_CREATED)
            else:
                print("serializer errors:", serializer.errors)
                return JsonResponse({'status': 'error', 'message': serializer.errors}, status=400)
        except Profile.DoesNotExist:
            return JsonResponse({'status': 'error', 'message': 'Invalid username'}, status=400)
        except ContentType.DoesNotExist:
            return JsonResponse({'status': 'error', 'message': 'Invalid content type ID'}, status=400)
        except Exception as e:
            print("Exception occurred:", e)
            return JsonResponse({'status': 'error', 'message': str(e)}, status=400)

    # elif request.method == 'GET':
    #     try:
    #         username = request.GET.get('username')
    #         if not username:
    #             return JsonResponse({'status': 'error', 'message': 'User ID is required'}, status=400)

    #         # Validate and get user
    #         user = User.objects.get(username=username)

    #         # Retrieve all orders for the user
    #         orders = Order.objects.filter(user=user)

    #         order_list = [{
    #             'ordernumber': order.ordernumber,
    #             'username': order.user.username,
    #             'content_type_id': order.content_type.id,
    #             'content_type': f"{order.content_type.app_label}.{order.content_type.model}",  # String representation
    #             'object_id': order.object_id,
    #             'fees': order.fees,
    #             'fees_paid': order.feespaid,
    #             'pay_method': order.paymethod,
    #             'delivery_method': order.deliverymethod,
    #             'first_party_delivery_address': order.firstpartydeliveryaddress,
    #             'second_party_delivery_address': order.secondpartydeliveryaddress,
    #             'picked': order.picked,
    #             'copies': order.copies,
    #             'parties': order.parties,
    #             'created_at': order.createdat,
    #             'any_order_picked': orders.filter(picked=True).exists()  # Check if any order has picked as true
    #         } for order in orders]

    #         return JsonResponse({'status': 'success', 'orders': order_list}, status=200)
    #     except User.DoesNotExist:
    #         return JsonResponse({'status': 'error', 'message': 'Invalid user ID'}, status=400)
    #     except Exception as e:
    #         return JsonResponse({'status': 'error', 'message': str(e)}, status=400)
    # else:
    #     return JsonResponse({'status': 'error', 'message': 'Invalid request method'}, status=405)
