from django.contrib.auth import authenticate
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import (
    HTTP_201_CREATED,
    HTTP_204_NO_CONTENT,
    HTTP_400_BAD_REQUEST,
)
from rest_framework.authtoken.models import Token
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser



from .models import User
from .serializers import UserSerializer
from favorites_app.models import Garden

# Create your views here.

class Sign_up(APIView):
    def post(self, request):
        try:
            data = request.data.copy()
            data["username"] = request.data["username"]
            new_user = User.objects.create_user(**data)
            new_token = Token.objects.create(user = new_user)

            Garden.objects.create(gardener = new_user)
        

            return Response(
                {"user": new_user.username, "token": new_token.key},
                status=HTTP_201_CREATED
                            )
        except Exception as e:
            print(e)
            return Response("Something went wrong", status=HTTP_400_BAD_REQUEST)
        

class Log_in(APIView):
    def post(self, request):
        try:
            username = request.data["username"]
            password = request.data["password"]
            user = authenticate(username=username, password=password)

            if user:
                token, created = Token.objects.get_or_create(user=user)
                return Response({"user": user.username, "token": token.key})
            return Response("Something went wrong creating a token.")
        
        except Exception as e:
            print(e)
            return Response("Something went wrong", status=HTTP_400_BAD_REQUEST)
        

class UserPermissions(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]


class User_info(UserPermissions):
    def get(self, request):

        user = UserSerializer(request.user)
        return Response(user.data)
    

    def put(self, request):

        user = request.user

        try:
            updated_user = UserSerializer(instance = user, data=request.data, partial=True)
            if updated_user.is_valid():
                updated_user.save()

            return Response(status=HTTP_204_NO_CONTENT)
        except Exception as e:
            print("error updating", e)
            return Response(status=HTTP_400_BAD_REQUEST)
    

    
    

class Log_out(UserPermissions):
    def post(self, request):
        request.user.auth_token.delete()
        return Response(status=HTTP_204_NO_CONTENT)
    

class Delete_user(UserPermissions):

    def delete(self, request):
        user = request.user
        user.delete()
        return Response({"message": "Account deleted successfully"}, status=HTTP_204_NO_CONTENT)


class UserProfilePicture(UserPermissions):

    parser_classes = (MultiPartParser,)

    def post(self, request, *args, **kwargs):

        user = request.user

        user.profile_picture = request.data.get("profile_picture")

        user.save()

        ser_user = UserSerializer(user)

        return Response(ser_user.data, status=HTTP_201_CREATED)