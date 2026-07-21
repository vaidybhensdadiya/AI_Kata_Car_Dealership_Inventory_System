import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'dealership.settings')
django.setup()

from django.contrib.auth.models import User
from inventory.models import Vehicle

if not User.objects.filter(username='admin').exists():
    User.objects.create_superuser('admin', 'admin@dealership.com', 'admin123')
    print('Created demo admin user: username=admin, password=admin123')

if not User.objects.filter(username='customer').exists():
    User.objects.create_user('customer', 'customer@dealership.com', 'customer123')
    print('Created demo customer user: username=customer, password=customer123')

sample_cars = [
    {'make': 'Porsche', 'model': '911 GT3 RS', 'category': 'Coupe', 'price': 241300, 'quantity': 3, 'year': 2024},
    {'make': 'BMW', 'model': 'M5 Competition', 'category': 'Sedan', 'price': 111100, 'quantity': 5, 'year': 2024},
    {'make': 'Mercedes-AMG', 'model': 'G 63', 'category': 'SUV', 'price': 179000, 'quantity': 2, 'year': 2024},
    {'make': 'Ford', 'model': 'F-150 Raptor R', 'category': 'Truck', 'price': 109145, 'quantity': 4, 'year': 2024},
    {'make': 'Chevrolet', 'model': 'Corvette Z06', 'category': 'Convertible', 'price': 114395, 'quantity': 1, 'year': 2024},
    {'make': 'Volkswagen', 'model': 'Golf R 20th', 'category': 'Hatchback', 'price': 45390, 'quantity': 6, 'year': 2023}
]

for car in sample_cars:
    if not Vehicle.objects.filter(make=car['make'], model=car['model']).exists():
        Vehicle.objects.create(**car)
        print(f"Created vehicle: {car['make']} {car['model']}")
