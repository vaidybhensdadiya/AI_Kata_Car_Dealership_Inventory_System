-- ========================================================
-- Car Dealership Inventory System - MySQL Database Export
-- Database Name: dealership_db
-- ========================================================

CREATE DATABASE IF NOT EXISTS `dealership_db` DEFAULT CHARACTER SET utf8mb4;
USE `dealership_db`;

-- Table structure for `auth_user`
CREATE TABLE IF NOT EXISTS `auth_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `password` varchar(128) NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `username` varchar(150) NOT NULL UNIQUE,
  `first_name` varchar(150) NOT NULL,
  `last_name` varchar(150) NOT NULL,
  `email` varchar(254) NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `date_joined` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dumping initial accounts for `auth_user`
INSERT INTO `auth_user` (`id`, `password`, `is_superuser`, `username`, `first_name`, `last_name`, `email`, `is_staff`, `is_active`, `date_joined`) VALUES
(1, 'pbkdf2_sha256$870000$admin$password123', 1, 'admin', 'System', 'Admin', 'admin@dealership.com', 1, 1, NOW()),
(2, 'pbkdf2_sha256$870000$customer$password123', 0, 'customer', 'Demo', 'Customer', 'customer@dealership.com', 0, 1, NOW());

-- Table structure for `inventory_vehicle`
CREATE TABLE IF NOT EXISTS `inventory_vehicle` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `make` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL,
  `category` varchar(50) NOT NULL,
  `price` decimal(14,2) NOT NULL,
  `quantity` int(11) NOT NULL,
  `year` int(11) NOT NULL DEFAULT 2024,
  `image_url` varchar(500) NOT NULL DEFAULT '',
  `description` longtext NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT NOW(),
  `updated_at` datetime(6) NOT NULL DEFAULT NOW(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Dumping 30 vehicle records for `inventory_vehicle`
INSERT INTO `inventory_vehicle` (`id`, `make`, `model`, `category`, `price`, `quantity`, `year`, `image_url`, `description`, `created_at`, `updated_at`) VALUES
(1, 'Porsche', '911 GT3 RS', 'Coupe', 35000000.00, 3, 2024, 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=800&q=80', 'Track-focused naturally aspirated 4.0L flat-six engine producing 518 hp with active aero DRS.', NOW(), NOW()),
(2, 'BMW', 'M5 Competition', 'Sedan', 17500000.00, 5, 2024, 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=800&q=80', 'Twin-turbo 4.4L V8 engine with M xDrive all-wheel drive performance and luxury cabin.', NOW(), NOW()),
(3, 'Mercedes-AMG', 'G 63', 'SUV', 33000000.00, 2, 2024, 'https://images.unsplash.com/photo-1520031441872-265e4ff70366?auto=format&fit=crop&w=800&q=80', 'Handcrafted AMG 4.0L V8 biturbo luxury off-road SUV with side-exit sports exhaust.', NOW(), NOW()),
(4, 'Audi', 'RS 7 Sportback', 'Sedan', 22400000.00, 4, 2024, 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=800&q=80', 'Aggressive fastback design powered by a 591 hp 4.0L twin-turbo V8 with quattro AWD.', NOW(), NOW()),
(5, 'Lamborghini', 'Huracán EVO', 'Coupe', 32200000.00, 2, 2024, 'https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=800&q=80', 'Naturally aspirated 5.2L V10 screaming to 8,500 RPM with LDVI predictive dynamics.', NOW(), NOW()),
(6, 'Ferrari', 'Roma', 'Coupe', 37600000.00, 1, 2024, 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=800&q=80', 'Timeless Italian design featuring a mid-front 3.9L turbocharged V8 delivering 612 hp.', NOW(), NOW()),
(7, 'Land Rover', 'Range Rover SV', 'SUV', 41200000.00, 3, 2024, 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=800&q=80', 'Ultra-luxury flagship SUV with executive rear seats, ceramic controls, and twin-turbo V8.', NOW(), NOW()),
(8, 'Ford', 'Mustang Dark Horse', 'Coupe', 8500000.00, 6, 2024, 'https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?auto=format&fit=crop&w=800&q=80', '500 hp 5.0L Coyote V8 with Tremec 6-speed manual transmission and MagneRide damping.', NOW(), NOW()),
(9, 'Chevrolet', 'Corvette Z06', 'Convertible', 14500000.00, 2, 2024, 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=800&q=80', 'Flat-plane crank 5.5L LT6 V8 engine producing 670 hp with power hardtop.', NOW(), NOW()),
(10, 'Ford', 'F-150 Raptor R', 'Truck', 12500000.00, 4, 2024, 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80', 'Supercharged 5.2L V8 delivering 720 hp with Fox Live Valve shocks for high-speed desert off-roading.', NOW(), NOW()),
(11, 'Aston Martin', 'DB12 Super Tourer', 'Coupe', 45900000.00, 1, 2024, 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=800&q=80', 'Hand-built 671 hp 4.0L V8 twin-turbo grand tourer with modern interior architecture.', NOW(), NOW()),
(12, 'Bentley', 'Continental GT Speed', 'Convertible', 52300000.00, 1, 2024, 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=800&q=80', 'Iconic British open-top luxury powered by a 6.0L W12 TSI engine with active all-wheel steering.', NOW(), NOW()),
(13, 'Rolls-Royce', 'Ghost Black Badge', 'Sedan', 69500000.00, 1, 2024, 'https://images.unsplash.com/photo-1631295868223-63265b40d9e4?auto=format&fit=crop&w=800&q=80', 'The pinnacle of bespoke luxury with Starlight Headliner and 6.75L twin-turbo V12 engine.', NOW(), NOW()),
(14, 'Toyota', 'Land Cruiser 300', 'SUV', 21000000.00, 5, 2024, 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=800&q=80', 'Legendary reliability meets modern luxury with a 3.3L Twin-Turbo V6 diesel and Multi-Terrain Select.', NOW(), NOW()),
(15, 'Lexus', 'LC 500 Convertible', 'Convertible', 23900000.00, 2, 2024, 'https://images.unsplash.com/photo-1616422285623-13ff0162193c?auto=format&fit=crop&w=800&q=80', 'Breathtaking grand touring convertible with a naturally aspirated 5.0L V8 and Mark Levinson sound.', NOW(), NOW()),
(16, 'Nissan', 'GT-R Nismo', 'Coupe', 21200000.00, 2, 2024, 'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?auto=format&fit=crop&w=800&q=80', 'Godzilla refined: 600 hp hand-crafted 3.8L twin-turbo V6 with carbon ceramic brakes.', NOW(), NOW()),
(17, 'Jaguar', 'F-Type R 75', 'Convertible', 15300000.00, 3, 2024, 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80', 'Special 75th anniversary edition with supercharged 575 hp V8 exhaust symphony.', NOW(), NOW()),
(18, 'Maserati', 'MC20 Super Sport', 'Coupe', 36900000.00, 1, 2024, 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=800&q=80', 'Carbon-fiber monocoque supercar featuring the F1 twin-spark Nettuno 3.0L V6 engine.', NOW(), NOW()),
(19, 'Volkswagen', 'Golf R 20th Edition', 'Hatchback', 5200000.00, 7, 2024, 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=800&q=80', '315 hp turbocharged hot hatch with R-Performance torque-vectoring all-wheel drive.', NOW(), NOW()),
(20, 'Hyundai', 'Ioniq 5 N', 'Hatchback', 6500000.00, 4, 2024, 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=800&q=80', '641 hp high-performance EV hatchback with N e-shift paddle gear simulations.', NOW(), NOW()),
(21, 'BMW', 'X7 M60i', 'SUV', 21700000.00, 3, 2024, 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80', 'Three-row flagship luxury SUV with a mild-hybrid 523 hp M TwinPower Turbo V8 engine.', NOW(), NOW()),
(22, 'Mercedes-Benz', 'S-Class S 450d', 'Sedan', 17700000.00, 4, 2024, 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=800&q=80', 'The benchmark for automotive luxury: 4MATIC drive, rear-axle steering, and MBUX hyperscreen.', NOW(), NOW()),
(23, 'Audi', 'Q8 e-tron Edition', 'SUV', 11400000.00, 5, 2024, 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=800&q=80', 'All-electric luxury SUV offering 402 hp, virtual exterior mirrors, and fast DC charging.', NOW(), NOW()),
(24, 'Volvo', 'XC90 Recharge Ultimate', 'SUV', 10100000.00, 4, 2024, 'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=800&q=80', 'Scandinavian plug-in hybrid SUV producing 455 hp with Bowers & Wilkins audio system.', NOW(), NOW()),
(25, 'Porsche', 'Taycan Turbo S', 'Sedan', 24400000.00, 2, 2024, 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=800&q=80', '750 hp overboost electric sports sedan accelerating 0-100 km/h in 2.8 seconds.', NOW(), NOW()),
(26, 'Dodge', 'RAM 1500 TRX', 'Truck', 13500000.00, 2, 2024, 'https://images.unsplash.com/photo-1559416523-140ddc3d238c?auto=format&fit=crop&w=800&q=80', 'Apex predator truck powered by a 702 hp Supercharged 6.2L HEMI V8 with Bilstein E2 shocks.', NOW(), NOW()),
(27, 'Toyota', 'GR Supra 3.0', 'Coupe', 8500000.00, 5, 2024, 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=800&q=80', 'Gazoo Racing tuned 382 hp inline 6-cylinder engine with 6-speed manual gearbox option.', NOW(), NOW()),
(28, 'Mini', 'John Cooper Works', 'Hatchback', 4700000.00, 6, 2024, 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=800&q=80', 'Pocket-rocket 228 hp TwinPower Turbo 4-cylinder engine with go-kart handling dynamics.', NOW(), NOW()),
(29, 'Alfa Romeo', 'Giulia Quadrifoglio', 'Sedan', 12800000.00, 3, 2024, 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=800&q=80', 'Ferrari-derived 2.9L Twin-Turbo V6 generating 505 hp with carbon-fiber active front splitter.', NOW(), NOW()),
(30, 'Tesla', 'Model S Plaid', 'Sedan', 15000000.00, 4, 2024, 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=800&q=80', 'Tri-motor electric vehicle delivering 1,020 hp and 0-100 km/h in 2.1 seconds.', NOW(), NOW());