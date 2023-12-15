from django.urls import path
from .views import Sign_up, Log_in, User_info, Log_out, Delete_user, UserProfilePicture, All_users, Other_users_garden
from django.conf import settings
from django.conf.urls.static import static




urlpatterns = [
    path('signup/', Sign_up.as_view(), name='signup'),
    path('login/', Log_in.as_view(), name='login'),
    path('info/', User_info.as_view(), name = 'info'),
    path('logout/', Log_out.as_view(), name='logout'),
    path('delete/', Delete_user.as_view(), name='delete'),
    path('profile-picture/', UserProfilePicture.as_view(), name='profile-picture'),
    path('all/', All_users.as_view(), name='all_users'),
    path('gardens/<str:username>/', Other_users_garden.as_view(), name='othergarden')
] 

# if settings.DEBUG:
#     urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)