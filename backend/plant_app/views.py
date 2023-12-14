from django.shortcuts import get_object_or_404
from user_app.views import UserPermissions
from .serializers import Plant, Plant_Serializer
from rest_framework.response import Response
from favorites_app.models import Garden, Garden_plants
from rest_framework.status import (
    HTTP_201_CREATED, HTTP_204_NO_CONTENT, HTTP_400_BAD_REQUEST, HTTP_404_NOT_FOUND
)

# Create your views here.

class All_plants(UserPermissions):

    def get(self, request):
        all_plants = Plant.objects.all()

        ser_plants = Plant_Serializer(all_plants, many=True)

        return Response(ser_plants.data)
    
    def post(self, request):


        new_plant = Plant_Serializer(data=request.data)
        if new_plant.is_valid():
            new_plant.save()
            return Response(new_plant.data, status=HTTP_201_CREATED)
        else:
            return Response(new_plant.errors, status=HTTP_400_BAD_REQUEST)


class A_plant(UserPermissions):

    def get_user_garden(self, user):
        garden, created = Garden.objects.get_or_create(gardener=user)
        return garden
    
    def get(self, request, id):

        garden_plant = get_object_or_404(Plant, id=id)
        return Response(Plant_Serializer(garden_plant).data)
    

    def post(self, request, id):

        garden = self.get_user_garden(request.user)
        plant = get_object_or_404(Plant, id=id)

        garden_plant, created = Garden_plants.objects.get_or_create(garden=garden, plant=plant)
        if not created:
            garden_plant.save()

        return Response(f"{plant.common_name} has been added to your garden.", status=HTTP_201_CREATED)
    

    def delete(self, request, id):
        garden = self.get_user_garden(request.user)
        plant = get_object_or_404(Plant, id=id)

        try:
            garden_plant = Garden_plants.objects.get(garden=garden, plant=plant)
            garden_plant.delete()

            return Response({"message": "Plant removed from your garden."}, status=HTTP_204_NO_CONTENT)
        except Garden_plants.DoesNotExist:
            return Response({"detail": "This plant is not in your garden."})