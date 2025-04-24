from django.contrib.auth.backends import ModelBackend
from django.db.models import Q
from .models import User

class EmailBackend(ModelBackend):
    def authenticate(self, request, username=None, password=None, **kwargs):
        try:
            user = User.objects.filter(
                Q(username=username) | Q(email=username)
            ).first()
            
            if user and user.check_password(password):
                return user
            return None
        except User.DoesNotExist:
            return None