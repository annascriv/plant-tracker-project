from django.urls import path
from .views import Plants, Icons, Plants_filter, Plants_by_id, Plants_by_name

urlpatterns = [
    path('<int:page_num>/', Plants.as_view(), name='all_plants'),
    path('icons/<str:common_name>/', Icons.as_view(), name='icons'),
    path('<str:categories>/', Plants_filter.as_view(), name='filtered_plants'),
    path('plant-details/<int:plant_id>/', Plants_by_id.as_view(), name='plantsbyid'),
    path('plant-details/<str:plant_name>/<int:page_num>/', Plants_by_name.as_view(), name='plantbyname')
]