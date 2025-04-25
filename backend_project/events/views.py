# /events/views.py
import logging
from rest_framework import status, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import Event, Registration
from .serializers import EventListSerializer, EventDetailSerializer, RegistrationSerializer
from rest_framework.permissions import IsAuthenticated

logger = logging.getLogger(__name__)

class EventListView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        events = Event.objects.all()
        serializer = EventListSerializer(events, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        logger.info(f"Received data: {request.data}")
        request.data['created_by'] = request.user.id
        serializer = EventDetailSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        logger.error(f"Invalid data: {serializer.errors}")
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class EventDetailView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    
    def get(self, request, pk):
        event = get_object_or_404(Event, pk=pk)
        serializer = EventDetailSerializer(event)
        return Response(serializer.data)
    
    def put(self, request, pk):
        event = get_object_or_404(Event, pk=pk)
        if request.user.id != event.created_by.id:
            return Response({"error": "You don't have permission to edit this event"}, 
                           status=status.HTTP_403_FORBIDDEN)
        
        serializer = EventDetailSerializer(event, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk):
        event = get_object_or_404(Event, pk=pk)
        if request.user.id != event.created_by.id:
            return Response({"error": "You don't have permission to delete this event"}, 
                           status=status.HTTP_403_FORBIDDEN)
        
        event.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class EventRegisterView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, pk):
        event = get_object_or_404(Event, pk=pk)
        registration, created = Registration.objects.get_or_create(event=event, user=request.user)
        if created:
            return Response({"message": "Registered successfully"}, status=status.HTTP_201_CREATED)
        return Response({"message": "Already registered"}, status=status.HTTP_200_OK)
