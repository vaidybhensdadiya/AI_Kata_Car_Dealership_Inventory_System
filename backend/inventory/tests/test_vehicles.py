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


@pytest.mark.django_db
class TestListVehicles:
    def setup_method(self):
        self.client = APIClient()
        self.url = '/api/vehicles/'
        self.user = User.objects.create_user(
            username='list_user',
            email='list@dealership.com',
            password='UserPassword123!'
        )

    def _get_token(self):
        res = self.client.post('/api/auth/login/', {'username': 'list_user', 'password': 'UserPassword123!'}, format='json')
        return res.data['access']

    def test_list_vehicles_empty(self):
        token = self._get_token()
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {token}')
        response = self.client.get(self.url)
        assert response.status_code == 200
        assert response.data == []

    def test_list_vehicles_populated(self):
        from inventory.models import Vehicle
        Vehicle.objects.create(make='BMW', model='M3', category='Sedan', price=75000, quantity=3)
        Vehicle.objects.create(make='Audi', model='RS6', category='Wagon', price=120000, quantity=2)

        token = self._get_token()
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {token}')
        response = self.client.get(self.url)
        assert response.status_code == 200
        assert len(response.data) == 2
        makes = [v['make'] for v in response.data]
        assert 'BMW' in makes
        assert 'Audi' in makes

    def test_list_vehicles_unauthenticated(self):
        response = self.client.get(self.url)
        assert response.status_code == 401


@pytest.mark.django_db
class TestSearchVehicles:
    def setup_method(self):
        self.client = APIClient()
        self.url = '/api/vehicles/search/'
        self.user = User.objects.create_user(
            username='search_user',
            email='search@dealership.com',
            password='UserPassword123!'
        )
        from inventory.models import Vehicle
        Vehicle.objects.create(make='Tesla', model='Model 3', category='Sedan', price=45000, quantity=10)
        Vehicle.objects.create(make='Tesla', model='Model Y', category='SUV', price=55000, quantity=5)
        Vehicle.objects.create(make='Ford', model='Mustang', category='Coupe', price=35000, quantity=2)
        Vehicle.objects.create(make='Porsche', model='911', category='Coupe', price=120000, quantity=1)

    def _get_token(self):
        res = self.client.post('/api/auth/login/', {'username': 'search_user', 'password': 'UserPassword123!'}, format='json')
        return res.data['access']

    def test_search_by_make(self):
        token = self._get_token()
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {token}')
        response = self.client.get(f'{self.url}?make=Tesla')
        assert response.status_code == 200
        assert len(response.data) == 2

    def test_search_by_category(self):
        token = self._get_token()
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {token}')
        response = self.client.get(f'{self.url}?category=Coupe')
        assert response.status_code == 200
        assert len(response.data) == 2

    def test_search_by_price_range(self):
        token = self._get_token()
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {token}')
        response = self.client.get(f'{self.url}?min_price=40000&max_price=60000')
        assert response.status_code == 200
        assert len(response.data) == 2

    def test_search_no_matches(self):
        token = self._get_token()
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {token}')
        response = self.client.get(f'{self.url}?make=Ferrari')
        assert response.status_code == 200
        assert response.data == []


@pytest.mark.django_db
class TestUpdateVehicle:
    def setup_method(self):
        self.client = APIClient()
        self.admin = User.objects.create_superuser(
            username='admin_update',
            email='admin_up@dealership.com',
            password='AdminPassword123!'
        )
        self.normal_user = User.objects.create_user(
            username='user_update',
            email='user_up@dealership.com',
            password='UserPassword123!'
        )
        from inventory.models import Vehicle
        self.vehicle = Vehicle.objects.create(
            make='Honda',
            model='Civic',
            category='Sedan',
            price=25000,
            quantity=8
        )
        self.url = f'/api/vehicles/{self.vehicle.id}/'

    def _get_token(self, username, password):
        res = self.client.post('/api/auth/login/', {'username': username, 'password': password}, format='json')
        return res.data['access']

    def test_update_vehicle_success_as_admin(self):
        token = self._get_token('admin_update', 'AdminPassword123!')
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {token}')
        payload = {
            'make': 'Honda',
            'model': 'Civic Type R',
            'category': 'Hatchback',
            'price': 45000,
            'quantity': 3
        }
        response = self.client.put(self.url, payload, format='json')
        assert response.status_code == 200
        assert response.data['model'] == 'Civic Type R'
        assert response.data['price'] == '45000.00'

    def test_update_vehicle_forbidden_as_normal_user(self):
        token = self._get_token('user_update', 'UserPassword123!')
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {token}')
        response = self.client.put(self.url, {'make': 'Honda', 'model': 'Civic'}, format='json')
        assert response.status_code == 403

    def test_update_vehicle_not_found(self):
        token = self._get_token('admin_update', 'AdminPassword123!')
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {token}')
        response = self.client.put('/api/vehicles/99999/', {'make': 'Honda', 'model': 'Civic'}, format='json')
        assert response.status_code == 404

    def test_update_vehicle_invalid_negative_price(self):
        token = self._get_token('admin_update', 'AdminPassword123!')
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {token}')
        payload = {
            'make': 'Honda',
            'model': 'Civic',
            'category': 'Sedan',
            'price': -100,
            'quantity': 5
        }
        response = self.client.put(self.url, payload, format='json')
        assert response.status_code == 400
        assert 'price' in response.data
