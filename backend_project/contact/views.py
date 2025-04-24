from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from .serializers import ContactSerializer
from .models import ContactMessage

@api_view(["POST"])
@permission_classes([AllowAny])
def send_contact(request):
    ser = ContactSerializer(data=request.data)
    ser.is_valid(raise_exception=True)
    ContactMessage.objects.create(**ser.validated_data)
    return Response({"message": "Message sent"}, status=status.HTTP_201_CREATED)
