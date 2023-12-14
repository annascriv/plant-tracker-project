from django.shortcuts import get_object_or_404
from user_app.views import UserPermissions
from .serializers import Garden, Garden_plants, Garden_plantSerializer, GardenSerializer, Plant_Serializer, Plant
from rest_framework.response import Response
from rest_framework.status import HTTP_201_CREATED, HTTP_400_BAD_REQUEST, HTTP_204_NO_CONTENT, HTTP_404_NOT_FOUND
from rest_framework.generics import CreateAPIView
from rest_framework.views import APIView
from django.utils import timezone
from datetime import datetime

# Create your views here.

class Garden_view(UserPermissions, APIView):

    def get(self, request):
    
        try:
            user = request.user
            garden_instance = get_object_or_404(Garden, gardener_id=user)

            ser_garden = GardenSerializer(garden_instance)
            return Response(ser_garden.data)
        except Garden.DoesNotExist:
            return Response({"detail": "Garden was not found."})
        

    def post(self, request):

        try:
            user = request.user

            plant_id = request.data.get("plant_id")
            plant_instance = get_object_or_404(Plant, id=plant_id)

            garden_instance, created = Garden.objects.get_or_create(gardener = user)

            garden_plant_instance = Garden_plants.objects.create(garden = garden_instance, plant=plant_instance)

            ser_garden = GardenSerializer(garden_instance)

            return Response(ser_garden.data, status=HTTP_201_CREATED)            
        except Plant.DoesNotExist as e:
            return Response({"detail": "Plant was not found"}, status=HTTP_404_NOT_FOUND)
        

        


class New_Plant(UserPermissions):

    def post(self, request):
        
        try:
            user = request.user

            plant_data = request.data
            plant_serializer = Plant_Serializer(data=plant_data)


            if plant_serializer.is_valid():
                plant_instance = plant_serializer.save()

                garden_instance, created = Garden.objects.get_or_create(gardener = user)
                garden_plant_instance = Garden_plants.objects.create(garden=garden_instance, plant=plant_instance)

                return Response({"detail": "Plant created and added to the garden!"}, status=HTTP_201_CREATED)
            else:
                return Response({"detail": "Invalid plant data"}, plant_serializer.errors)
            
        except Exception as e:
            return Response({"detail": "Error creating plant"}, e, status=HTTP_400_BAD_REQUEST)
        


class EditPlant(UserPermissions):

    def put(self, request, plant_id):

        plant = get_object_or_404(Plant, id=plant_id)

        ser_plant = Plant_Serializer(plant, data=request.data, partial = True)

        if ser_plant.is_valid():
            ser_plant.save()
            return Response({"message": "plant has been updated"}, status=HTTP_204_NO_CONTENT)
        
        return Response(ser_plant.errors, status=HTTP_400_BAD_REQUEST)
    
    def delete(self, request, plant_id):

        plant = get_object_or_404(Plant, id=plant_id)

        plant.delete()

        return Response({"message": "Plant has been deleted"}, status=HTTP_204_NO_CONTENT)
    

    def post(self, request, plant_id):

        try:
            plant = get_object_or_404(Plant, id=plant_id)

            plant.last_watered = timezone.now()
   
            plant.save()


            return Response({"message": f"{plant.common_name} has been watered"}, status=HTTP_204_NO_CONTENT)
            
        except Exception as e:
            return Response({"error": str(e)},status=HTTP_400_BAD_REQUEST)
    
    

class FertilizePlant(UserPermissions):

    def post(self, request, plant_id):
        try:
            plant = get_object_or_404(Plant, id=plant_id)

            plant.last_fertilized = timezone.now()

            plant.save()
            return Response({"message": f"{plant.common_name} has been fertilized!"}, status=HTTP_204_NO_CONTENT)
        
        except Exception as e:
            return Response( {"error": str(e)},status=HTTP_400_BAD_REQUEST)

    