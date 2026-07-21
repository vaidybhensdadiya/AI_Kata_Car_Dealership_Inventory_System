import pytest
from django.contrib.auth.models import User
from rest_framework.test import APIClient

@pytest.mark.django_db
class TestAddVehicle:
    def setup_method(self):
        self.client = APIClient()
        self.url = '/api/vehicles/'
        self.admin = User.objects.create_superuser(
            username='admin_user',
            email='admin@dealership.com',
            password='AdminPassword123!'
        )
        self.normal_user = User.objects.create_user(
            username='regular_user',
            email='user@dealership.com',
            password='UserPassword123!'
        )
        self.valid_payload = {
            'make': 'Tesla',
            'model': 'Model S',
            'category': 'Sedan',
            'price': 79999.99,
            'quantity': 5,
            'year': 2024,
            'image_url': 'https://images.unsplash.com/photo-1536700503339-1e4b06520771'
        }

    def _get_token(self, username, password):
        res = self.client.post('/api/auth/login/', {'username': username, 'password': password}, format='json')
        return res.data['access']

    def test_add_vehicle_success_as_admin(self):
        token = self._get_token('admin_user', 'AdminPassword123!')
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {token}')
        response = self.client.post(self.url, self.valid_payload, format='json')
        assert response.status_code == 201
        assert response.data['make'] == 'Tesla'
        assert response.data['model'] == 'Model S'
        assert response.data['quantity'] == 5

    def test_add_vehicle_forbidden_as_normal_user(self):
        token = self._get_token('regular_user', 'UserPassword123!')
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {token}')
        response = self.client.post(self.url, self.valid_payload, format='json')
        assert response.status_code == 403

    def test_add_vehicle_unauthenticated(self):
        response = self.client.post(self.url, self.valid_payload, format='json')
        assert response.status_code == 401

    def test_add_vehicle_invalid_negative_price(self):
        token = self._get_token('admin_user', 'AdminPassword123!')
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {token}')
        payload = self.valid_payload.copy()
        payload['price'] = -100.00
        response = self.client.post(self.url, payload, format='json')
        assert response.status_code == 400
        assert 'price' in response.data

    def test_add_vehicle_invalid_negative_quantity(self):
        token = self._get_token('admin_user', 'AdminPassword123!')
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {token}')
        payload = self.valid_payload.copy()
        payload['quantity'] = -5
        response = self.client.post(self.url, payload, format='json')
        assert response.status_code == 400
        assert 'quantity' in response.data

    def test_add_vehicle_missing_required_fields(self):
        token = self._get_token('admin_user', 'AdminPassword123!')
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {token}')
        response = self.client.post(self.url, {}, format='json')
        assert response.status_code == 400
        assert 'make' in response.data
        assert 'model' in response.data
