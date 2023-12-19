from django.db import models
from user_app.models import User
from plant_app.models import Plant

# Create your models here.

class Garden(models.Model):

    gardener = models.ForeignKey(User, related_name='garden', on_delete=models.CASCADE)



class Garden_plants(models.Model):

    garden = models.ForeignKey(Garden, related_name="garden_plants", on_delete=models.CASCADE, default=None)

    plant = models.ForeignKey(Plant, related_name="plant", on_delete=models.CASCADE, default=None)