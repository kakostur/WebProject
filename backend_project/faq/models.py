from django.db import models

class FAQ(models.Model):
    question = models.CharField(max_length=300)
    answer = models.TextField()
