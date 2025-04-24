# /events/views.py
from rest_framework import status, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.shortcuts import get_object_or_404
from .models import Event, Registration
from .serializers import EventListSerializer, EventDetailSerializer, RegistrationSerializer

from rest_framework.permissions import IsAuthenticated

class EventListView(APIView):
    permission_classes = [IsAuthenticated]  

    def get(self, request):
        events = Event.objects.all()
        serializer = EventListSerializer(events, many=True)
        return Response(serializer.data)


class EventDetailView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request, pk):
        event = get_object_or_404(Event, pk=pk)
        serializer = EventDetailSerializer(event)
        return Response(serializer.data)

class EventRegisterView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, pk):
        event = get_object_or_404(Event, pk=pk)
        registration, created = Registration.objects.get_or_create(event=event, user=request.user)
        if created:
            return Response({"message": "Registered successfully"}, status=status.HTTP_201_CREATED)
        return Response({"message": "Already registered"}, status=status.HTTP_200_OK)
