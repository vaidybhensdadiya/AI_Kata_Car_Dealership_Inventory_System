-- ========================================================
-- Car Dealership Inventory System - MySQL Database Export
-- Database Name: dealership_db
-- ========================================================

CREATE DATABASE IF NOT EXISTS `dealership_db` DEFAULT CHARACTER SET utf8mb4;
USE `dealership_db`;

-- Table structure for `auth_user`
DROP TABLE IF EXISTS `auth_user`;
CREATE TABLE `auth_user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `password` varchar(128) NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `username` varchar(150) NOT NULL,
  `first_name` varchar(150) NOT NULL,
  `last_name` varchar(150) NOT NULL,
  `email` varchar(254) NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `date_joined` datetime(6) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for `auth_user` (3 records)
INSERT INTO `auth_user` (`id`, `password`, `last_login`, `is_superuser`, `username`, `first_name`, `last_name`, `email`, `is_staff`, `is_active`, `date_joined`) VALUES
(1, 'pbkdf2_sha256$1000000$TB9cupFnTjJGo5CTtCqHpG$WSVW7hFDBfI1MA27z2YhGFH+MnLsUn4UQ0GCL7jsXUw=', NULL, 1, 'admin', '', '', 'admin@dealership.com', 1, 1, '2026-07-21 16:13:08'),
(2, 'pbkdf2_sha256$1000000$SVrGWoubOxpArm4bjN04PG$eagOJ21V1JgKLTNYWpnpiTHbaIHgBLzfwwum2OZkTDM=', NULL, 0, 'customer', '', '', 'customer@dealership.com', 0, 1, '2026-07-21 16:13:09'),
(3, 'pbkdf2_sha256$1000000$YVx2X2w06QmL2wyAzApasr$VIacc4+2MpnjeNF8vYjizdke+Zn107aGQ+Vlg3YA7kw=', NULL, 0, 'testuser123', '', '', 'test123_unique@example.com', 0, 1, '2026-07-21 16:21:34');

-- Table structure for `inventory_vehicle`
DROP TABLE IF EXISTS `inventory_vehicle`;
CREATE TABLE `inventory_vehicle` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `make` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL,
  `category` varchar(50) NOT NULL,
  `price` decimal(14,2) NOT NULL,
  `quantity` int NOT NULL,
  `year` int NOT NULL,
  `image_url` varchar(500) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `description` longtext NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for `inventory_vehicle` (30 records)
INSERT INTO `inventory_vehicle` (`id`, `make`, `model`, `category`, `price`, `quantity`, `year`, `image_url`, `created_at`, `updated_at`, `description`) VALUES
(1, 'Porsche', '911 GT3 RS', 'Coupe', '35000000.00', 3, 2024, 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=800&q=80', '2026-07-21 16:13:10', '2026-07-21 16:13:10', 'Track-focused naturally aspirated 4.0L flat-six engine producing 518 hp with active aero DRS.'),
(2, 'BMW', 'M5 Competition', 'Sedan', '17500000.00', 5, 2024, 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=800&q=80', '2026-07-21 16:13:10', '2026-07-21 16:13:10', 'Twin-turbo 4.4L V8 engine with M xDrive all-wheel drive performance and luxury cabin.'),
(3, 'Mercedes-AMG', 'G 63', 'SUV', '33000000.00', 2, 2024, 'https://images.unsplash.com/photo-1520031441872-265e4ff70366?auto=format&fit=crop&w=800&q=80', '2026-07-21 16:13:10', '2026-07-21 16:13:10', 'Handcrafted AMG 4.0L V8 biturbo luxury off-road SUV with side-exit sports exhaust.'),
(4, 'Audi', 'RS 7 Sportback', 'Sedan', '22400000.00', 4, 2024, 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=800&q=80', '2026-07-21 16:13:10', '2026-07-21 16:13:10', 'Aggressive fastback design powered by a 591 hp 4.0L twin-turbo V8 with quattro AWD.'),
(5, 'Lamborghini', 'Huracán EVO', 'Coupe', '32200000.00', 2, 2024, 'https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=800&q=80', '2026-07-21 16:13:10', '2026-07-21 16:13:10', 'Naturally aspirated 5.2L V10 screaming to 8,500 RPM with LDVI predictive dynamics.'),
(6, 'Ferrari', 'Roma', 'Coupe', '37600000.00', 1, 2024, 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=800&q=80', '2026-07-21 16:13:10', '2026-07-21 16:13:10', 'Timeless Italian design featuring a mid-front 3.9L turbocharged V8 delivering 612 hp.'),
(7, 'Land Rover', 'Range Rover SV', 'SUV', '41200000.00', 3, 2024, 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=800&q=80', '2026-07-21 16:13:10', '2026-07-21 16:13:10', 'Ultra-luxury flagship SUV with executive rear seats, ceramic controls, and twin-turbo V8.'),
(8, 'Ford', 'Mustang Dark Horse', 'Coupe', '8500000.00', 6, 2024, 'https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?auto=format&fit=crop&w=800&q=80', '2026-07-21 16:13:10', '2026-07-21 16:13:10', '500 hp 5.0L Coyote V8 with Tremec 6-speed manual transmission and MagneRide damping.'),
(9, 'Chevrolet', 'Corvette Z06', 'Convertible', '14500000.00', 2, 2024, 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=800&q=80', '2026-07-21 16:13:10', '2026-07-21 16:13:10', 'Flat-plane crank 5.5L LT6 V8 engine producing 670 hp with power hardtop.'),
(10, 'Ford', 'F-150 Raptor R', 'Truck', '12500000.00', 4, 2024, 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80', '2026-07-21 16:13:10', '2026-07-21 16:13:10', 'Supercharged 5.2L V8 delivering 720 hp with Fox Live Valve shocks for high-speed desert off-roading.'),
(11, 'Aston Martin', 'DB12 Super Tourer', 'Coupe', '45900000.00', 1, 2024, 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=800&q=80', '2026-07-21 16:13:10', '2026-07-21 16:13:10', 'Hand-built 671 hp 4.0L V8 twin-turbo grand tourer with modern interior architecture.'),
(12, 'Bentley', 'Continental GT Speed', 'Convertible', '52300000.00', 1, 2024, 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=800&q=80', '2026-07-21 16:13:10', '2026-07-21 16:13:10', 'Iconic British open-top luxury powered by a 6.0L W12 TSI engine with active all-wheel steering.'),
(13, 'Rolls-Royce', 'Ghost Black Badge', 'Sedan', '69500000.00', 1, 2024, 'https://images.unsplash.com/photo-1631295868223-63265b40d9e4?auto=format&fit=crop&w=800&q=80', '2026-07-21 16:13:10', '2026-07-21 16:13:10', 'The pinnacle of bespoke luxury with Starlight Headliner and 6.75L twin-turbo V12 engine.'),
(14, 'Toyota', 'Land Cruiser 300', 'SUV', '21000000.00', 5, 2024, 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=800&q=80', '2026-07-21 16:13:10', '2026-07-21 16:13:10', 'Legendary reliability meets modern luxury with a 3.3L Twin-Turbo V6 diesel and Multi-Terrain Select.'),
(15, 'Lexus', 'LC 500 Convertible', 'Convertible', '23900000.00', 2, 2024, 'https://images.unsplash.com/photo-1616422285623-13ff0162193c?auto=format&fit=crop&w=800&q=80', '2026-07-21 16:13:10', '2026-07-21 16:13:10', 'Breathtaking grand touring convertible with a naturally aspirated 5.0L V8 and Mark Levinson sound.'),
(16, 'Nissan', 'GT-R Nismo', 'Coupe', '21200000.00', 2, 2024, 'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?auto=format&fit=crop&w=800&q=80', '2026-07-21 16:13:10', '2026-07-21 16:13:10', 'Godzilla refined: 600 hp hand-crafted 3.8L twin-turbo V6 with carbon ceramic brakes.'),
(17, 'Jaguar', 'F-Type R 75', 'Convertible', '15300000.00', 3, 2024, 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80', '2026-07-21 16:13:10', '2026-07-21 16:13:10', 'Special 75th anniversary edition with supercharged 575 hp V8 exhaust symphony.'),
(18, 'Maserati', 'MC20 Super Sport', 'Coupe', '36900000.00', 1, 2024, 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=800&q=80', '2026-07-21 16:13:10', '2026-07-21 16:13:10', 'Carbon-fiber monocoque supercar featuring the F1 twin-spark Nettuno 3.0L V6 engine.'),
(19, 'Volkswagen', 'Golf R 20th Edition', 'Hatchback', '5200000.00', 7, 2024, 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=800&q=80', '2026-07-21 16:13:10', '2026-07-21 16:13:10', '315 hp turbocharged hot hatch with R-Performance torque-vectoring all-wheel drive.'),
(20, 'Hyundai', 'Ioniq 5 N', 'Hatchback', '6500000.00', 4, 2024, 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=800&q=80', '2026-07-21 16:13:10', '2026-07-21 16:13:10', '641 hp high-performance EV hatchback with N e-shift paddle gear simulations.'),
(21, 'BMW', 'X7 M60i', 'SUV', '21700000.00', 3, 2024, 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80', '2026-07-21 16:13:10', '2026-07-21 16:13:10', 'Three-row flagship luxury SUV with a mild-hybrid 523 hp M TwinPower Turbo V8 engine.'),
(22, 'Mercedes-Benz', 'S-Class S 450d', 'Sedan', '17700000.00', 4, 2024, 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=800&q=80', '2026-07-21 16:13:10', '2026-07-21 16:13:10', 'The benchmark for automotive luxury: 4MATIC drive, rear-axle steering, and MBUX hyperscreen.'),
(23, 'Audi', 'Q8 e-tron Edition', 'SUV', '11400000.00', 5, 2024, 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=800&q=80', '2026-07-21 16:13:10', '2026-07-21 16:13:10', 'All-electric luxury SUV offering 402 hp, virtual exterior mirrors, and fast DC charging.'),
(24, 'Volvo', 'XC90 Recharge Ultimate', 'SUV', '10100000.00', 4, 2024, 'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=800&q=80', '2026-07-21 16:13:10', '2026-07-21 16:13:10', 'Scandinavian plug-in hybrid SUV producing 455 hp with Bowers & Wilkins audio system.'),
(25, 'Porsche', 'Taycan Turbo S', 'Sedan', '24400000.00', 2, 2024, 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=800&q=80', '2026-07-21 16:13:10', '2026-07-21 16:13:10', '750 hp overboost electric sports sedan accelerating 0-100 km/h in 2.8 seconds.'),
(26, 'Dodge', 'RAM 1500 TRX', 'Truck', '13500000.00', 2, 2024, 'https://images.unsplash.com/photo-1559416523-140ddc3d238c?auto=format&fit=crop&w=800&q=80', '2026-07-21 16:13:10', '2026-07-21 16:13:10', 'Apex predator truck powered by a 702 hp Supercharged 6.2L HEMI V8 with Bilstein E2 shocks.'),
(27, 'Toyota', 'GR Supra 3.0', 'Coupe', '8500000.00', 5, 2024, 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=800&q=80', '2026-07-21 16:13:10', '2026-07-21 16:13:10', 'Gazoo Racing tuned 382 hp inline 6-cylinder engine with 6-speed manual gearbox option.'),
(28, 'Mini', 'John Cooper Works', 'Hatchback', '4700000.00', 6, 2024, 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=800&q=80', '2026-07-21 16:13:10', '2026-07-21 16:13:10', 'Pocket-rocket 228 hp TwinPower Turbo 4-cylinder engine with go-kart handling dynamics.'),
(29, 'Alfa Romeo', 'Giulia Quadrifoglio', 'Sedan', '12800000.00', 3, 2024, 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=800&q=80', '2026-07-21 16:13:10', '2026-07-21 16:13:10', 'Ferrari-derived 2.9L Twin-Turbo V6 generating 505 hp with carbon-fiber active front splitter.'),
(30, 'Tesla', 'Model S Plaid', 'Sedan', '15000000.00', 4, 2024, 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=800&q=80', '2026-07-21 16:13:10', '2026-07-21 16:13:10', 'Tri-motor electric vehicle delivering 1,020 hp and 0-100 km/h in 2.1 seconds.');
