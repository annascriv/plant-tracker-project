from django.test import TestCase, Client
from django.urls import reverse

"""
This test will send a post request to the 'signup' endpoint with a request body of 
{"username":"janedoe", "password":"jd", "display_name":"Jane Doe", "age":35}
to simulate a user sending a post request to sign up.
"""

class Test_user_sign_up(TestCase):

    def test_001_user_sign_up(self):
        user = Client()

        response = user.post(
            reverse("signup"),
            data={"username":"janedoe", "password":"jd", "display_name":"Jane Doe", "age":35},
            content_type="application/json",
        )

        # print(response.content)

        with self.subTest():
            self.assertEquals(response.status_code, 201)
            self.assert_(
                b'{"user":"janedoe"' in response.content
                and b"token" in response.content
            )