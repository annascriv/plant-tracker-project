from rest_framework.views import APIView
from rest_framework.response import Response
import requests
from requests_oauthlib import OAuth1
from plant_project.settings import env
from user_app.views import UserPermissions
import pprint

# Create your views here.

class Plants(UserPermissions):
    

    def get(self, request, page_num):
         pp = pprint.PrettyPrinter(indent=2, depth=3)

         KEY = env.get("PLANT_API_KEY")

         endpoint = f"https://perenual.com/api/species-list?key={KEY}&page={page_num}&order=asc"

         response = requests.get(endpoint)

         responseJSON = response.json()

        #  pp.pprint(responseJSON)

         return Response(responseJSON)
    

    

class Icons(UserPermissions):
     

    def get(self, request, common_name):

        noun_project_api_key = env.get("NOUN_PROJECT_API_KEY")
        noun_project_secret_key = env.get("NOUN_PROJECT_SECRET_KEY")

        auth = OAuth1(noun_project_api_key, noun_project_secret_key)
        endpoint = f"https://api.thenounproject.com/v2/icon?query={common_name}"

        response = requests.get(endpoint, auth=auth)
        response_json = response.json()

        pp = pprint.PrettyPrinter(indent=2, depth=2)

        # pp.pprint(response_json)

        return Response(response_json)
    

class Plants_filter(UserPermissions):

    def get(self, request, categories):
         pp = pprint.PrettyPrinter(indent=2, depth=3)

         categories_list = categories.split("/")

         KEY = env.get("PLANT_API_KEY")

        #  categories_str = "&".join(f"{category}" for category in categories)

         endpoint = f"https://perenual.com/api/species-list?key={KEY}{categories}"

         response = requests.get(endpoint)

         responseJSON = response.json()

        #  pp.pprint(responseJSON)

         return Response(responseJSON)
    

class Plants_by_id(UserPermissions):

        def get(self, request, plant_id):
         pp = pprint.PrettyPrinter(indent=2, depth=3)

         KEY = env.get("PLANT_API_KEY")

         endpoint = f"https://perenual.com/api/species/details/{plant_id}?key={KEY}"

         response = requests.get(endpoint)

         responseJSON = response.json()

        #  pp.pprint(responseJSON)

         return Response(responseJSON)


class Plants_by_name(UserPermissions):

    def get(self, request, plant_name, page_num):

         KEY = env.get("PLANT_API_KEY")

         endpoint = f"https://perenual.com/api/species-list?key={KEY}&q={plant_name}&page={page_num}"

         response = requests.get(endpoint)

         responseJSON = response.json()

        #  pp.pprint(responseJSON)

         return Response(responseJSON)