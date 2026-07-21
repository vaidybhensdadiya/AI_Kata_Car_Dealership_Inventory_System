import pytest
from django.contrib.auth.models import User
from rest_framework.test import APIClient
from inventory.models import Vehicle

@pytest.mark.django_db
class TestPurchaseVehicle:
    def setup_method(self):
        self.client = APIClient()
        self.user = User.objects.create_user(
            username='buyer',
            email='buyer@dealership.com',
            password='Password123!'
        )
        self.vehicle_in_stock = Vehicle.objects.create(
            make='Toyota',
            model='Camry',
            category='Sedan',
            price=28000,
            quantity=3
        )
        self.vehicle_out_of_stock = Vehicle.objects.create(
            make='Ford',
            model='F-150',
            category='Truck',
            price=40000,
            quantity=0
        )
        self.purchase_url = f'/api/vehicles/{self.vehicle_in_stock.id}/purchase/'

    def _get_token(self):
        res = self.client.post('/api/auth/login/', {'username': 'buyer', 'password': 'Password123!'}, format='json')
        return res.data['access']

    def test_purchase_vehicle_success(self):
        token = self._get_token()
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {token}')
        response = self.client.post(self.purchase_url)
        assert response.status_code == 200
        assert response.data['quantity'] == 2
        self.vehicle_in_stock.refresh_from_db()
        assert self.vehicle_in_stock.quantity == 2

    def test_purchase_vehicle_out_of_stock(self):
        token = self._get_token()
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {token}')
        url = f'/api/vehicles/{self.vehicle_out_of_stock.id}/purchase/'
        response = self.client.post(url)
        assert response.status_code == 400
        assert 'detail' in response.data

    def test_purchase_vehicle_not_found(self):
        token = self._get_token()
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {token}')
        response = self.client.post('/api/vehicles/99999/purchase/')
        assert response.status_code == 404

    def test_purchase_vehicle_unauthenticated(self):
        response = self.client.post(self.purchase_url)
        assert response.status_code == 401


@pytest.mark.django_db
class TestRestockVehicle:
    def setup_method(self):
        self.client = APIClient()
        self.admin = User.objects.create_superuser(
            username='admin_restock',
            email='admin_re@dealership.com',
            password='AdminPassword123!'
        )
        self.normal_user = User.objects.create_user(
            username='user_restock',
            email='user_re@dealership.com',
            password='UserPassword123!'
        )
        self.vehicle = Vehicle.objects.create(
            make='Nissan',
            model='Altima',
            category='Sedan',
            price=24000,
            quantity=2
        )
        self.url = f'/api/vehicles/{self.vehicle.id}/restock/'

    def _get_token(self, username, password):
        res = self.client.post('/api/auth/login/', {'username': username, 'password': password}, format='json')
        return res.data['access']

    def test_restock_vehicle_success_as_admin(self):
        token = self._get_token('admin_restock', 'AdminPassword123!')
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {token}')
        response = self.client.post(self.url, {'quantity': 10}, format='json')
        assert response.status_code == 200
        assert response.data['quantity'] == 12
        self.vehicle.refresh_from_db()
        assert self.vehicle.quantity == 12

    def test_restock_vehicle_forbidden_as_normal_user(self):
        token = self._get_token('user_restock', 'UserPassword123!')
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {token}')
        response = self.client.post(self.url, {'quantity': 5}, format='json')
        assert response.status_code == 403

    def test_restock_vehicle_invalid_negative_quantity(self):
        token = self._get_token('admin_restock', 'AdminPassword123!')
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {token}')
        response = self.client.post(self.url, {'quantity': -5}, format='json')
        assert response.status_code == 400

    def test_restock_vehicle_not_found(self):
        token = self._get_token('admin_restock', 'AdminPassword123!')
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {token}')
        response = self.client.post('/api/vehicles/99999/restock/', {'quantity': 5}, format='json')
        assert response.status_code == 404
