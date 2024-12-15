-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 09, 2024 at 10:44 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

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
(0, 'agnas', 'agnas@gmail.com', '$2y$10$MjY4OGFhMGNlMDQyMzE0Nu5EvOAo8iBD9ixrB.pVlCF7FJN/6BBgO');

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
(90, 1, 7, 2, '2024-08-04 16:05:18'),
(91, 1, 6, 5, '2024-08-05 14:33:38'),
(92, 1, 6, 5, '2024-08-07 21:46:37'),
(93, 1, 7, 1, '2024-08-07 21:46:37'),
(94, 1, 8, 2, '2024-08-07 21:46:37'),
(95, 1, 5, 4, '2024-08-07 21:46:37'),
(96, 1, 10, 1, '2024-08-07 21:46:37'),
(97, 1, 6, 10, '2024-08-08 17:44:15'),
(98, 1, 7, 1, '2024-08-08 17:44:15'),
(99, 1, 8, 1, '2024-08-08 17:44:15'),
(100, 1, 6, 1, '2024-11-15 19:02:21'),
(101, 1, 7, 1, '2024-11-15 19:02:21'),
(102, 1, 17, 5, '2024-12-05 21:06:25');

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
(5, 'patrick', 500.00, 'star', 'uploads/pat.jpg', '2024-07-29 18:05:48'),
(6, 'patrick spongebob', 500.00, 'pin head', 'uploads/408415377_754028823436284_7406563689914897874_n.jpg', '2024-07-29 18:06:28'),
(7, 'spongebob', 500.00, 'squarepants', 'uploads/406497575_755950759910757_1871141828095148653_n.jpg', '2024-07-29 18:07:05'),
(8, 'squidward', 500.00, 'bubble', 'uploads/434686164_826311082874724_7513186973919980339_n.jpg', '2024-07-29 18:07:22'),
(9, 'patrick star', 500.00, 'angry', 'uploads/426321216_791823399656826_6211120463026321352_n.jpg', '2024-07-29 18:07:37'),
(10, 'spongebob', 500.00, 'gang', 'uploads/426389162_795135212658978_6264665949960447214_n.jpg', '2024-07-29 18:08:01'),
(17, 'rov', 69.00, 'nigga', 'uploads/380672285_2784676041675303_4774097105850463242_n (1).jpg', '2024-12-05 13:05:38');

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
(1, 'kingagnas', 'agnasking21@gmail.com', '$2y$10$MGI1NzVmNjc4ZjA2ZDU5NOJCsSSrHW.lxaFZKuX4JAYrxGMADrOvm', '2024-07-28 13:21:36'),
(8, 'kingagnas', 'agnasking21@gmail.com', '$2y$10$YzUwNjE5YWE1MmQ2N2RiO.A2K526HRrgdCumdPu2X8VN/TwTtfbUS', '2024-10-08 18:26:14'),
(9, 'kingagnas21', 'king@gmail.com', '$2y$10$ZjJkYWNhYzZjMjk5M2UzN.PFUk0X.Zj6ea3UCubuglyFaMNUL6qMu', '2024-10-08 18:26:42');

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=165;

--
-- AUTO_INCREMENT for table `checkedout`
--
ALTER TABLE `checkedout`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=103;

--
-- AUTO_INCREMENT for table `images`
--
ALTER TABLE `images`
  MODIFY `image_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=84;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `productid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

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
