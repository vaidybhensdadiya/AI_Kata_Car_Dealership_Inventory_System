import pytest
from django.contrib.auth.models import User
from rest_framework.test import APIClient

@pytest.mark.django_db
class TestUserRegistration:
    def setup_method(self):
        self.client = APIClient()
        self.url = '/api/auth/register/'
        self.valid_payload = {
            'username': 'john_doe',
            'email': 'john@example.com',
            'password': 'StrongPassword123!',
            'first_name': 'John',
            'last_name': 'Doe'
        }

    def test_user_registration_success(self):
        response = self.client.post(self.url, self.valid_payload, format='json')
        assert response.status_code == 201
        assert 'username' in response.data
        assert response.data['username'] == 'john_doe'
        assert response.data['email'] == 'john@example.com'
        assert 'password' not in response.data
        assert User.objects.filter(username='john_doe').exists()

    def test_user_registration_missing_username(self):
        payload = self.valid_payload.copy()
        del payload['username']
        response = self.client.post(self.url, payload, format='json')
        assert response.status_code == 400
        assert 'username' in response.data

    def test_user_registration_missing_password(self):
        payload = self.valid_payload.copy()
        del payload['password']
        response = self.client.post(self.url, payload, format='json')
        assert response.status_code == 400
        assert 'password' in response.data

    def test_user_registration_duplicate_username(self):
        User.objects.create_user(username='john_doe', email='other@example.com', password='Password123!')
        response = self.client.post(self.url, self.valid_payload, format='json')
        assert response.status_code == 400
        assert 'username' in response.data

    def test_user_registration_duplicate_email(self):
        User.objects.create_user(username='other_user', email='john@example.com', password='Password123!')
        response = self.client.post(self.url, self.valid_payload, format='json')
        assert response.status_code == 400
        assert 'email' in response.data
