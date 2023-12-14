from django.test import Client
from django.urls import reverse
from rest_framework.test import APITestCase
import json
from rest_framework.authtoken.models import Token

"""
    This test will sign up, create a new user, and acquire their token. It will set that token under the 
    Authorization header, and send a POST request to logout and delete the users token.
"""


class Test_user_logout(APITestCase):
    def test_04_user_logout(self):
        user = Client()
        sign_up_response = user.post(
            reverse("signup"),
            data = {"username":"janedoe", "password":"jd", "display_name":"Jane Doe", "age":35},
            content_type="application/json",
        )
        response_body = json.loads(sign_up_response.content)
        self.client.credentials(HTTP_AUTHORIZATION=f"Token {response_body['token']}")
        response = self.client.post(reverse("logout"))
        with self.subTest():
            tokens = Token.objects.all()
            self.assertEquals(len(tokens), 0)
        self.assertEquals(response.status_code, 204)