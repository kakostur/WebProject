# /events/urls.py
from django.urls import path
from .views import EventListView, EventDetailView, EventRegisterView

urlpatterns = [
    path('', EventListView.as_view(), name='event_list'),
    path('<int:pk>/', EventDetailView.as_view(), name='event_detail'),
    path('<int:pk>/register/', EventRegisterView.as_view(), name='event_register'),
]
