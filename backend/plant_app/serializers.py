from .models import Plant
from rest_framework.serializers import ModelSerializer

class Plant_Serializer(ModelSerializer):
    class Meta:
        model = Plant
        fields ="__all__"