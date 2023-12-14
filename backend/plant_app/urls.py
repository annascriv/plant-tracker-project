from django.urls import path
from .views import All_plants, A_plant

urlpatterns = [
    path("", All_plants.as_view(), name="my_plants"),
    path("<int:id>/", A_plant.as_view(), name="a_plant")
]