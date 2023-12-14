from django.db import models
from django.utils import timezone

# Create your models here.

class Plant(models.Model):

    common_name = models.CharField(max_length=255, default=None)

    scientific_name = models.CharField(max_length=255, default=None, null=True, blank=True)

    cycle = models.CharField(max_length=255, default=None, blank=True, null=True)

    watering = models.CharField(max_length=255, default=None, blank=True, null=True)

    sunlight = models.CharField(max_length=255, default=None, blank=True, null=True)

    thumbnail_url = models.CharField(default=None, null=True, blank=True)

    watered = models.BooleanField(default=False)

    notes = models.TextField(blank=True, null=True)

    last_watered = models.DateTimeField(null=True, blank=True, default=timezone.now)

