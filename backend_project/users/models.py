from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    ROLE_CHOICES = [
        ("volunteer", "Volunteer"),
        ("organizer", "Organizer"),
    ]
    role = models.CharField(max_length=50, choices=ROLE_CHOICES, default="volunteer")

    def __str__(self):
        return f"{self.username} ({self.role})"
