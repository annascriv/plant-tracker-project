from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.files.storage import FileSystemStorage

# Create your models here.

fs = FileSystemStorage(location='media/photos')

class User(AbstractUser):

    username = models.CharField(unique=True, null=False)

    email = models.EmailField(blank=True, null=True, default=None)

    display_name = models.CharField(max_length=255, unique=False, default=None, null=True, blank=True)

    age = models.PositiveIntegerField(default=18, blank=True, null=True)

    bio = models.CharField(default="Write a bio here", blank=True, null=True)

    profile_picture = models.ImageField(upload_to='profile-pic/', blank=True, null=True, default=None)



    USERNAME_FIELD = "username"
    REQUIRED_FIELDS = []



