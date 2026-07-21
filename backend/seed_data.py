import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'dealership.settings')
django.setup()

from django.contrib.auth.models import User
from inventory.models import Vehicle

print("Seeding MySQL database...")

# Create Admin User
if not User.objects.filter(username='admin').exists():
    User.objects.create_superuser('admin', 'admin@dealership.com', 'admin123', is_staff=True)
    print("Created Admin User: username='admin', password='admin123'")

# Create Customer User
if not User.objects.filter(username='customer').exists():
    User.objects.create_user('customer', 'customer@dealership.com', 'customer123')
    print("Created Customer User: username='customer', password='customer123'")

mock_vehicles = [
    {
        'make': 'Porsche', 'model': '911 GT3 RS', 'category': 'Coupe', 'price': 35000000, 'quantity': 3, 'year': 2024,
        'image_url': 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=800&q=80',
        'description': 'Track-focused naturally aspirated 4.0L flat-six engine producing 518 hp with active aero DRS.'
    },
    {
        'make': 'BMW', 'model': 'M5 Competition', 'category': 'Sedan', 'price': 17500000, 'quantity': 5, 'year': 2024,
        'image_url': 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=800&q=80',
        'description': 'Twin-turbo 4.4L V8 engine with M xDrive all-wheel drive performance and luxury cabin.'
    },
    {
        'make': 'Mercedes-AMG', 'model': 'G 63', 'category': 'SUV', 'price': 33000000, 'quantity': 2, 'year': 2024,
        'image_url': 'https://images.unsplash.com/photo-1520031441872-265e4ff70366?auto=format&fit=crop&w=800&q=80',
        'description': 'Handcrafted AMG 4.0L V8 biturbo luxury off-road SUV with side-exit sports exhaust.'
    },
    {
        'make': 'Audi', 'model': 'RS 7 Sportback', 'category': 'Sedan', 'price': 22400000, 'quantity': 4, 'year': 2024,
        'image_url': 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=800&q=80',
        'description': 'Aggressive fastback design powered by a 591 hp 4.0L twin-turbo V8 with quattro AWD.'
    },
    {
        'make': 'Lamborghini', 'model': 'Huracán EVO', 'category': 'Coupe', 'price': 32200000, 'quantity': 2, 'year': 2024,
        'image_url': 'https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=800&q=80',
        'description': 'Naturally aspirated 5.2L V10 screaming to 8,500 RPM with LDVI predictive dynamics.'
    },
    {
        'make': 'Ferrari', 'model': 'Roma', 'category': 'Coupe', 'price': 37600000, 'quantity': 1, 'year': 2024,
        'image_url': 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=800&q=80',
        'description': 'Timeless Italian design featuring a mid-front 3.9L turbocharged V8 delivering 612 hp.'
    },
    {
        'make': 'Land Rover', 'model': 'Range Rover SV', 'category': 'SUV', 'price': 41200000, 'quantity': 3, 'year': 2024,
        'image_url': 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=800&q=80',
        'description': 'Ultra-luxury flagship SUV with executive rear seats, ceramic controls, and twin-turbo V8.'
    },
    {
        'make': 'Ford', 'model': 'Mustang Dark Horse', 'category': 'Coupe', 'price': 8500000, 'quantity': 6, 'year': 2024,
        'image_url': 'https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?auto=format&fit=crop&w=800&q=80',
        'description': '500 hp 5.0L Coyote V8 with Tremec 6-speed manual transmission and MagneRide damping.'
    },
    {
        'make': 'Chevrolet', 'model': 'Corvette Z06', 'category': 'Convertible', 'price': 14500000, 'quantity': 2, 'year': 2024,
        'image_url': 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=800&q=80',
        'description': 'Flat-plane crank 5.5L LT6 V8 engine producing 670 hp with power hardtop.'
    },
    {
        'make': 'Ford', 'model': 'F-150 Raptor R', 'category': 'Truck', 'price': 12500000, 'quantity': 4, 'year': 2024,
        'image_url': 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80',
        'description': 'Supercharged 5.2L V8 delivering 720 hp with Fox Live Valve shocks for high-speed desert off-roading.'
    },
    {
        'make': 'Aston Martin', 'model': 'DB12 Super Tourer', 'category': 'Coupe', 'price': 45900000, 'quantity': 1, 'year': 2024,
        'image_url': 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=800&q=80',
        'description': 'Hand-built 671 hp 4.0L V8 twin-turbo grand tourer with modern interior architecture.'
    },
    {
        'make': 'Bentley', 'model': 'Continental GT Speed', 'category': 'Convertible', 'price': 52300000, 'quantity': 1, 'year': 2024,
        'image_url': 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=800&q=80',
        'description': 'Iconic British open-top luxury powered by a 6.0L W12 TSI engine with active all-wheel steering.'
    },
    {
        'make': 'Rolls-Royce', 'model': 'Ghost Black Badge', 'category': 'Sedan', 'price': 69500000, 'quantity': 1, 'year': 2024,
        'image_url': 'https://images.unsplash.com/photo-1631295868223-63265b40d9e4?auto=format&fit=crop&w=800&q=80',
        'description': 'The pinnacle of bespoke luxury with Starlight Headliner and 6.75L twin-turbo V12 engine.'
    },
    {
        'make': 'Toyota', 'model': 'Land Cruiser 300', 'category': 'SUV', 'price': 21000000, 'quantity': 5, 'year': 2024,
        'image_url': 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=800&q=80',
        'description': 'Legendary reliability meets modern luxury with a 3.3L Twin-Turbo V6 diesel and Multi-Terrain Select.'
    },
    {
        'make': 'Lexus', 'model': 'LC 500 Convertible', 'category': 'Convertible', 'price': 23900000, 'quantity': 2, 'year': 2024,
        'image_url': 'https://images.unsplash.com/photo-1616422285623-13ff0162193c?auto=format&fit=crop&w=800&q=80',
        'description': 'Breathtaking grand touring convertible with a naturally aspirated 5.0L V8 and Mark Levinson sound.'
    },
    {
        'make': 'Nissan', 'model': 'GT-R Nismo', 'category': 'Coupe', 'price': 21200000, 'quantity': 2, 'year': 2024,
        'image_url': 'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?auto=format&fit=crop&w=800&q=80',
        'description': 'Godzilla refined: 600 hp hand-crafted 3.8L twin-turbo V6 with carbon ceramic brakes.'
    },
    {
        'make': 'Jaguar', 'model': 'F-Type R 75', 'category': 'Convertible', 'price': 15300000, 'quantity': 3, 'year': 2024,
        'image_url': 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80',
        'description': 'Special 75th anniversary edition with supercharged 575 hp V8 exhaust symphony.'
    },
    {
        'make': 'Maserati', 'model': 'MC20 Super Sport', 'category': 'Coupe', 'price': 36900000, 'quantity': 1, 'year': 2024,
        'image_url': 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=800&q=80',
        'description': 'Carbon-fiber monocoque supercar featuring the F1 twin-spark Nettuno 3.0L V6 engine.'
    },
    {
        'make': 'Volkswagen', 'model': 'Golf R 20th Edition', 'category': 'Hatchback', 'price': 5200000, 'quantity': 7, 'year': 2024,
        'image_url': 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=800&q=80',
        'description': '315 hp turbocharged hot hatch with R-Performance torque-vectoring all-wheel drive.'
    },
    {
        'make': 'Hyundai', 'model': 'Ioniq 5 N', 'category': 'Hatchback', 'price': 6500000, 'quantity': 4, 'year': 2024,
        'image_url': 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=800&q=80',
        'description': '641 hp high-performance EV hatchback with N e-shift paddle gear simulations.'
    },
    {
        'make': 'BMW', 'model': 'X7 M60i', 'category': 'SUV', 'price': 21700000, 'quantity': 3, 'year': 2024,
        'image_url': 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80',
        'description': 'Three-row flagship luxury SUV with a mild-hybrid 523 hp M TwinPower Turbo V8 engine.'
    },
    {
        'make': 'Mercedes-Benz', 'model': 'S-Class S 450d', 'category': 'Sedan', 'price': 17700000, 'quantity': 4, 'year': 2024,
        'image_url': 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=800&q=80',
        'description': 'The benchmark for automotive luxury: 4MATIC drive, rear-axle steering, and MBUX hyperscreen.'
    },
    {
        'make': 'Audi', 'model': 'Q8 e-tron Edition', 'category': 'SUV', 'price': 11400000, 'quantity': 5, 'year': 2024,
        'image_url': 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=800&q=80',
        'description': 'All-electric luxury SUV offering 402 hp, virtual exterior mirrors, and fast DC charging.'
    },
    {
        'make': 'Volvo', 'model': 'XC90 Recharge Ultimate', 'category': 'SUV', 'price': 10100000, 'quantity': 4, 'year': 2024,
        'image_url': 'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=800&q=80',
        'description': 'Scandinavian plug-in hybrid SUV producing 455 hp with Bowers & Wilkins audio system.'
    },
    {
        'make': 'Porsche', 'model': 'Taycan Turbo S', 'category': 'Sedan', 'price': 24400000, 'quantity': 2, 'year': 2024,
        'image_url': 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=800&q=80',
        'description': '750 hp overboost electric sports sedan accelerating 0-100 km/h in 2.8 seconds.'
    },
    {
        'make': 'Dodge', 'model': 'RAM 1500 TRX', 'category': 'Truck', 'price': 13500000, 'quantity': 2, 'year': 2024,
        'image_url': 'https://images.unsplash.com/photo-1559416523-140ddc3d238c?auto=format&fit=crop&w=800&q=80',
        'description': 'Apex predator truck powered by a 702 hp Supercharged 6.2L HEMI V8 with Bilstein E2 shocks.'
    },
    {
        'make': 'Toyota', 'model': 'GR Supra 3.0', 'category': 'Coupe', 'price': 8500000, 'quantity': 5, 'year': 2024,
        'image_url': 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=800&q=80',
        'description': 'Gazoo Racing tuned 382 hp inline 6-cylinder engine with 6-speed manual gearbox option.'
    },
    {
        'make': 'Mini', 'model': 'John Cooper Works', 'category': 'Hatchback', 'price': 4700000, 'quantity': 6, 'year': 2024,
        'image_url': 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=800&q=80',
        'description': 'Pocket-rocket 228 hp TwinPower Turbo 4-cylinder engine with go-kart handling dynamics.'
    },
    {
        'make': 'Alfa Romeo', 'model': 'Giulia Quadrifoglio', 'category': 'Sedan', 'price': 12800000, 'quantity': 3, 'year': 2024,
        'image_url': 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=800&q=80',
        'description': 'Ferrari-derived 2.9L Twin-Turbo V6 generating 505 hp with carbon-fiber active front splitter.'
    },
    {
        'make': 'Tesla', 'model': 'Model S Plaid', 'category': 'Sedan', 'price': 15000000, 'quantity': 4, 'year': 2024,
        'image_url': 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=800&q=80',
        'description': 'Tri-motor electric vehicle delivering 1,020 hp and 0-100 km/h in 2.1 seconds.'
    }
]

created_count = 0
for car in mock_vehicles:
    v, created = Vehicle.objects.get_or_create(
        make=car['make'],
        model=car['model'],
        defaults=car
    )
    if created:
        created_count += 1

print(f"Successfully seeded {created_count} vehicles into MySQL database!")
