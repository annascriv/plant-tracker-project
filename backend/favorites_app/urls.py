from django.urls import path
from .views import Garden_view, New_Plant, EditPlant

urlpatterns = [
    path('', Garden_view.as_view(), name="garden_view"),
    path('create-plant/', New_Plant.as_view(), name='createplant'),
    path('edit-plant/<int:plant_id>/', EditPlant.as_view(), name='editplant')
]