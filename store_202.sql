-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 16, 2024 at 02:39 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `store`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `admin_id` int(11) NOT NULL,
  `admin_name` varchar(100) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `admin_email` varchar(100) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `admin_password` longtext CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`admin_id`, `admin_name`, `admin_email`, `admin_password`) VALUES
(1, 'admin', 'admin@gmail.com', '$2y$10$kr1byCaw2UwwGfHfg2ZZgOiZud/4123JvANZgdxsHVXCvN0sd7bFq');

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `productid` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cart`
--

INSERT INTO `cart` (`id`, `user_id`, `productid`, `quantity`, `date`) VALUES
(170, 10, 26, 1, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `checkedout`
--

CREATE TABLE `checkedout` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `productid` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `checkedout`
--

INSERT INTO `checkedout` (`id`, `user_id`, `productid`, `quantity`, `date`) VALUES
(105, 10, 40, 1, '2024-12-15 22:41:07'),
(106, 10, 30, 1, '2024-12-15 22:41:07');

-- --------------------------------------------------------

--
-- Table structure for table `images`
--

CREATE TABLE `images` (
  `image_id` int(11) NOT NULL,
  `ProductID` int(11) NOT NULL,
  `file_name` varchar(255) NOT NULL,
  `file_type` varchar(50) NOT NULL,
  `file_size` int(11) NOT NULL,
  `uploaded_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `images`
--

INSERT INTO `images` (`image_id`, `ProductID`, `file_name`, `file_type`, `file_size`, `uploaded_at`) VALUES
(83, 0, '669a59d5ad7ce_426321216_791823399656826_6211120463026321352_n.jpg', 'image/jpeg', 246264, '2024-07-19 20:19:33');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `productid` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `description` text DEFAULT NULL,
  `photo` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`productid`, `name`, `price`, `description`, `photo`, `created_at`) VALUES
(26, 'BBS Wheels (Germany) Platinum Silver Diamond Cut 8.5x19 (SX)', 34800.00, 'SX PLATINUM SILVER / DIAMOND CUT Trendy double spoke design inspired by actual OEM designs. Compatible with all common tyre pressure monitoring systems. Breites Angebot an Anwendungen mit ABE Freigaben.   The bestseller re-imagined in a modern double-spoke design. With its innovative SX design, BBS is once again represented in the entry-level segment. This wheel is compatible with all common tyre pressure monitoring systems. ', 'uploads/bbs.jpeg', '2024-12-15 13:26:23'),
(27, 'BBS Wheel Bolt Set with BBS Laser Logo (Black color - 20 pcs. / set)', 24300.00, 'Wheel bolt set with BBS-Laser-Logo Black color - 20 pcs. / set  ﻿Special optics in classic design - the BBS wheel bolts in black. A nice eye-catcher is the lasered BBS logo on top of the screw head.', 'uploads/bolt.webp', '2024-12-15 13:27:39'),
(28, 'BBS Spacers & Special Bolts (AUDI/VW)', 12800.00, 'SPECIAL ACCESSORIES 2 spacers and 10 special bolts  Mat. no 09.31.310 (12mm), 09.31.361 (10mm), 09.31.362 (5mm), 09.31.378 (5mm)', 'uploads/spacer.webp', '2024-12-15 13:28:58'),
(29, 'PIAA Twin Power + Magnet Oil Filter Z12-M', 1287.00, 'High-performance oil filter. Dual-layer filtration system with magnet to catch metal debris. 2 layers filtration structure: Combination of high-performance 10 microns and standard 20-micron filter papers, results in up to 150% more filtration effect than conventional filters. Special Woven: PIAA original design to achieve the most efficient filtration. Enlarged oil Inlet port: PIAA original design, up to 170% more oil flow than conventional filters. Magnet effect: Super powerful magnet ring (100 millitesla/1000 gauss) built in the filter, catches metal debris. (Special feature with magnet type only) Wide Adaptability: Covers 95% Japanese passenger vehicles in Japan.', 'uploads/filter.webp', '2024-12-15 13:29:39'),
(30, 'Recaro Japan Motorsport/Racing Shell Seat Series PRO RACER SP-A HANS Velour Black', 289500.00, 'The RECARO Pro Racer – our premium product for GT and touring cars built to the FIA 8855-1999 standard – was developed for HANS driver safety systems and comes in four versions. The seat is available in carbon-aramid composite (CFRP/AFRP) or glass fiber reinforced polymer (GFRP), and in various sizes, including an XL option for drivers of larger build. The Pro Racer fits like a glove. And the FIA-homologated flexible sidemount accommodates any driver’s physique with ease.', 'uploads/Recaro.webp', '2024-12-15 13:33:02'),
(33, 'OLD MAN EMU Suspension Lift Kit for Toyota Fortuner (2016-2020) Diesel Engine', 60940.00, 'This set consists of:  Front Shock Absorber Rear Shocks Absorber Front Coil Spring Rear Coil Spring Rear Drive Shaft Spacer  From the factory, most new 4WD vehicles are tuned for comfort during on-road driving. Once the weight is added, in the form of accessories and cargo, and road conditions deteriorate, the performance and reliability of your 4WD suffer.  Quality, application-specific, aftermarket suspension is designed to increase load carrying capability and improve both vehicle handling and comfort across all terrain, whilst providing increased ground clearance to better tackle more challenging terrain. Unlike some other accessories, you’ll notice the benefits of a new suspension system every time you drive your vehicle.', 'uploads/sus.webp', '2024-12-15 14:12:32'),
(34, 'Pegasus Skyline Autotec Halogen Bulbs 5000 Kelvin', 700.00, 'Available in the following bulb types:  H4 - Hi/lo 12v 60/55w H11 -12v 55w (can also be used on some h8/h9/h16 and 9012 but your responsibility to verify compatibility) 9005/HB3 - 12v 65w 9006/HB4 - 12v 55w H7 - 12v 55w H1 - 12v 55w H3- 12v 55w (3000k and 5000k only) 881- 12v 27w (3000k and 5000k only) 880 - 12v 27w (3000k and 5000k only) * German Technology  Must be with complete packaging, no physical/cosmetic damage and replacement should be exactly the same item.', 'uploads/lamp.webp', '2024-12-15 14:16:50'),
(35, 'K-FOX Car Alarm', 2035.00, 'ONE WAY CAR ALARM WITH TRUNK OPEN WITH PROGRAMMABLE SHOCK SENSOR   Module: BLUE LED Indicator, Wire Kit and Switch Transmitter: 1 pc KD-89 Black/Chrome 4 Button Remote 1 pc KD-X9 Black/Chrome 4 Button Remote 1 LOUD SIREN: #6004-6 12V 25W 125db 6 Tones  Features: Alarm mode, Automatic arming-programmable, Automatic central door lock, Anti-hijacking, Car finding Closing door reminder, Door open warning, Emergency alarm/override, Shock sensor - Ultrasonic & Programmable Power interrupted memory, Programmable power door lock, Silent alarm mode, Trunk remote release', 'uploads/alarm.webp', '2024-12-15 14:17:48'),
(36, 'Bosch Europa Supertone Horn', 3849.00, 'Premium Euro-Style Solution  For privileged vehicles or other special uses. Low bassy supertone for use with wide range of vehicle types. *Suitable for privileged vehicles or other special uses. Micro-porous Teflon Filter for pressure compensation. Weather-, impact- and corrosion- resistant', 'uploads/horn.webp', '2024-12-15 14:18:23'),
(37, 'Denso Conventional Wiper Blade 26\"', 290.00, 'Conventional Blade Series A popular choice for the everyday motorist, DENSO’s Conventional Wiper Blades offer all-round, long-lasting performance with a selection of different blade and installation options. The DENSO Wiper Blade Standard is suitable for cost conscious customers with basic performance of proven DENSO Wiper Blade, with affordable price. “Super-Cut” Rubber Edge for effective wiping performance  Features and Benefits:  Unique OEM design Sleek, aerodynamic design', 'uploads/wiper.webp', '2024-12-15 14:19:01'),
(38, 'Deflector Water Resistant Car Cover Sedan XL (Blue)', 3160.00, 'SEDAN SIZE: L 494 x W 196 x H 120 cm  SB (SILVER & BLUE) 2 SIDES: Silver w/ yellow reflector CENTER: Blue with silver reflector and silver Deflector  Car Model Application: AUDI A5 AUDI A6 AUDI A7 BENZ E CLASS BMW 5 BMW 6 LEXUS ES350 LEXUS GS LEXUS LC MAZDA 6 MERCEDES BENZ C ESTATE MERCEDES BENZ CLS MERCEDES BENZ E MERCEDES BENZ SL PORSCHE CARRERA TOYOTA CAMRY  EXPANDED SIZE, BIGGER THAN STANDARD SIZE! FEATURES: • SURE FIT due to LARGER SIZE than factory specs. • Double Stitched for added strength • 98% Waterproof & Fire Retardant • Breathable allows dissipation of trapped unhealthy oxidized formaldehyde • Protects car paint & rubber parts from harmful ultra-violet rays and acid rain SAFETY BENEFITS: • FRONT & REAR: reflectorized YELLOW TRIANGLE & Reflectorized SILVER DEFLECTOR • RIGHT & LEFT SIDE: reflectorized SILVER TRIANGLE + Reflectorized YELLOW DEFLECTOR • Double Straps Insert Clip Lock; 1 set at Front of Front tires + 1 pair at Rear after rear tires. • Strong organizer zippered BLUE bag, can be used to store clothes, blankets, etc. • All sides with Reflectorized Triangle • Anti-Wind Blow-Off with front and rear straps with insert lock • Zippered bag with handle for tidy storage  Protects from: Bird Droppings, UV Rays, Rain, Dust, Vandalism, Scratch', 'uploads/sedan.webp', '2024-12-15 14:19:54'),
(39, 'Deflector Motorcycle Cover XL 2-Tone Color Yellow and Silver Grey', 1130.00, '2-Tone Color Yellow and Silver Grey Size: 97\" L x 41\" W x 50\" H  Lightweight material Fire Resistant With Anti-Scratch Backing Water Resistant Stitchless (Heat Welded)  Safety Features: Reflective triangle on all side for safe distance visibility Quick release lock located at center to prevent cover from being blown away', 'uploads/motor.webp', '2024-12-15 14:20:27'),
(40, 'Hamer Front Bumper King Series Bull Bar', 78000.00, 'Exceed ADR standards of approval in all states and territories – airbag and crash sensors are fully functional. Made from high-quality 3mm thick steel plate Winch compatible – laser cut holes to allow access Market-leading, advanced powder coating black surface finish Appealing LED fog lights, indicator, daytime running lights, and position style compliment and allow OEM switches to carry over and function per usual Specialist design to maximize airflow to the radiator  Application:  RAPTOR RANGER T7/EVEREST REVO/FORTUNER 2016 VIGO/FORTUNER OLD TERRA DMAX 2020-2021 D-MAX 2015-2019 MU-X 2015-2019 PAJERO SPORT NEW/TRITON NEW PAJERO SPORT OLD/TRITON OLD MONTERO JIMNY', 'uploads/bump.webp', '2024-12-15 14:21:51'),
(41, 'Floorguard COIL CAR MAT - UNIVERSAL', 2200.00, '5 Pcs Set COIL CAR MAT (UNIVERSAL) Thickness: 12mm; 3.6 kgs/m2 / 6mm min; 2.6 kgs/m2 Backing: Spike Back Packaging: 1 set/plastic bag with hanger & color header card  Made from new materials - no recycled materials and no noxious smell 3.6 kg/m2 - 1.8 m2 Coil Mat w/ Spike Back Front : 75cm x 55cm (29.5” x 21.7”) Rear : 52.5cm x 55cm (20.7” x 21.7”) Center: 57.5cm x 27.5cm (22.6” x 10.8”)', 'uploads/mat.webp', '2024-12-15 14:22:19'),
(42, 'Pioneer ND-DVR100 GPS Integrated Dash Camera - Full HD & Parking Mode', 7490.00, 'Features: Full High Definition Video Resolution Parking Mode 2.0\" LCD Screen 3.5-Gauge car charger power cable Super low footprint installation for discrete mounting 111° ultra-wide viewing angle GPS/Glonass records location and speed data Parking Mode automatically records when motion is detected Full HD recording at 27.5 fps to provide high-quality footage Wide Dynamic Range (WDR) image processing for Night Mode operation 8GB Micro SD card included Cigarette Lighter power 500mAh battery for Parking Mode Additional Features: Dual-mode operation:  Driving mode: When the vehicle is moving, the camera captures a seamless and continuous recording of video clip files, with three available sensitivity settings for impact detection. When triggered, the camera stores the video clip in an Event folder so that it is not overwritten and is available for later access.  Parking mode: When the vehicle is parked, the camera initiates standby mode. Recording automatically begins during this mode if the G-sensor detects an impact or motion is detected in front of the camera. Video resolution: Full High Definition Screen size: 2.0” LCD Rechargeable Lithium-ion battery Dimensions- 2-3/8” x 2-5/8” x 1-1/2”', 'uploads/dash.webp', '2024-12-15 14:23:17'),
(43, 'Fuzione Foldable Storage Box', 2999.00, 'Here’s the perfect solution. This storage box, trunk organizer, or trunk box will keep everything organized and in a safe place. Big enough to fit everything you need.  Dimensions:  26 inches wide 12 inches tall 10 in length', 'uploads/storage.webp', '2024-12-15 14:24:56');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `username`, `email`, `password`, `created_at`) VALUES
(10, 'joel', 'joel@gg.com', '$2y$10$ODhhZWEzMzYyNWE4MWE4ZOo3K7z5Tn5FzsOnbUeUYFB4dEN.ZOk/.', '2024-12-13 15:02:38');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `productid` (`productid`);

--
-- Indexes for table `checkedout`
--
ALTER TABLE `checkedout`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `productid` (`productid`);

--
-- Indexes for table `images`
--
ALTER TABLE `images`
  ADD PRIMARY KEY (`image_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`productid`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cart`
--
ALTER TABLE `cart`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=171;

--
-- AUTO_INCREMENT for table `checkedout`
--
ALTER TABLE `checkedout`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=107;

--
-- AUTO_INCREMENT for table `images`
--
ALTER TABLE `images`
  MODIFY `image_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=84;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `productid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cart`
--
ALTER TABLE `cart`
  ADD CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `cart_ibfk_2` FOREIGN KEY (`productid`) REFERENCES `products` (`productid`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `checkedout`
--
ALTER TABLE `checkedout`
  ADD CONSTRAINT `checkedout_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `checkedout_ibfk_2` FOREIGN KEY (`productid`) REFERENCES `products` (`productid`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
