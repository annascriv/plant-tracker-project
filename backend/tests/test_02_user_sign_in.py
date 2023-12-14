from django.test import TestCase, Client
from django.urls import reverse

"""
    This test will send a post request to signup to first create a new user, and then a post request to the 'login' 
    endpoint to simulate a user signing in. The endpoint should return {"token":<token>, "user":<username>} as well 
    as a status code of 200.

"""

class Test_user_login(TestCase):
    def test_02_user_login(self):
        user = Client()

        user.post(
            reverse("signup"),
            data = {"username":"janedoe", "password":"jd", "display_name":"Jane Doe", "age":35},
            content_type="application/json",
        )

        response = user.post(
            reverse("login"),
            data = {"username": "janedoe", "password":"jd"},
            content_type="application/json",
        )
        # print(response.content)

        with self.subTest():
            self.assertEquals(response.status_code, 200)
        self.assert_(
            b'"user":"janedoe"' in response.content and b"token" in response.content
        )