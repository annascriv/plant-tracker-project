# from django.test import Client
# from django.urls import reverse
# from rest_framework.test import APITestCase
# import json


# """
#     This test will sign up, create a new user, and acquire their token. It will set that token under the 
#     Authorization header, and send a POST request to create a new plant at 'garden/create-plant/'
# """

# answer = {
#     "detail": "Plant created and added to the garden!"
# }


# class Test_user_create_plant(APITestCase):
#     def test_05_user_create_plant(self):
#         user = Client()
#         sign_up_response = user.post(
#             reverse("signup"),
#             data = {"username":"janedoe", "password":"jd", "display_name":"Jane Doe", "age":35},
#             content_type="application/json",
#         )
#         response_body = json.loads(sign_up_response.content)
#         self.client.credentials(HTTP_AUTHORIZATION=f"Token {response_body['token']}")

#         response = self.client.post(
#             reverse("createplant"),
#             data={"common_name": "Red Rose"},
#             content_type="application/json",
#             )
        
#         print(response.content)
#         with self.subTest():
#             self.assertEquals(response.status_code, 201)
#         self.assertEquals(json.loads(response.content), answer)