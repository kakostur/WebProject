from rest_framework import generics, permissions
from rest_framework.response import Response
from .models import FAQ
from .serializers import FAQSerializer

class FAQListView(generics.ListAPIView):
    queryset = FAQ.objects.all()
    serializer_class = FAQSerializer
    permission_classes = [permissions.AllowAny]

class FAQCreateView(generics.CreateAPIView):
    queryset = FAQ.objects.all()
    serializer_class = FAQSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        if self.request.user.role != "admin":
            raise permissions.PermissionDenied()
        serializer.save()

class FAQUpdateView(generics.UpdateAPIView):
    queryset = FAQ.objects.all()
    serializer_class = FAQSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_update(self, serializer):
        if self.request.user.role != "admin":
            raise permissions.PermissionDenied()
        serializer.save()

class FAQDeleteView(generics.DestroyAPIView):
    queryset = FAQ.objects.all()
    serializer_class = FAQSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_destroy(self, instance):
        if self.request.user.role != "admin":
            raise permissions.PermissionDenied()
        instance.delete()
