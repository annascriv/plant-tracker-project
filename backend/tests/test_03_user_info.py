from django.test import Client
from django.urls import reverse
from rest_framework.test import APITestCase
import json

"""
    This test will send a post request to first create a new user, and then to acquire the token from the 
    response and login. Then it will be set under the Authorization header of the next request where the APIView will 
    use TokenAuthentication to authenitcate the user.

    The endpoint will return {"username":"janedoe", "display_name": "Jane Doe"}.
"""

class Test_user_info(APITestCase):
    def test_03_user_info(self):
        user = Client()
        sign_up_response = user.post(
            reverse("signup"),
            data = {"username":"janedoe", "password":"jd", "display_name":"Jane Doe", "age":35},
            content_type="application/json",
        )

        response_body = json.loads(sign_up_response.content)
        self.client.credentials(HTTP_AUTHORIZATION=f"Token {response_body['token']}")
        response = self.client.get(reverse("info"))
        with self.subTest():
            self.assertEquals(response.status_code, 200)
        self.assert_(b"janedoe" in response.content and b"Jane Doe" in response.content)