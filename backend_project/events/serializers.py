from rest_framework import serializers
from .models import Event, Registration
from users.models import User 

class EventListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = '__all__'

class EventDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ['id', 'name', 'date', 'location', 'description']  # Если нужно ограничить поля

class RegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Registration
        fields = '__all__'
