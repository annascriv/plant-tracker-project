from rest_framework.serializers import ModelSerializer
from .models import Garden, Garden_plants
from plant_app.serializers import Plant, Plant_Serializer


class Garden_plantSerializer(ModelSerializer):
    plant = Plant_Serializer()
    class Meta:
        model = Garden_plants
        fields = "__all__"


class GardenSerializer(ModelSerializer):
    garden_plants = Garden_plantSerializer(many=True)

    class Meta:
        model = Garden
        fields = ["garden_plants"]