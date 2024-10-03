-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 05, 2024 at 11:16 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `krw`
--

-- --------------------------------------------------------

--
-- Table structure for table `quotation`
--

CREATE TABLE `quotation` (
  `quotation_id` int(9) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `gender` varchar(10) NOT NULL,
  `date` date NOT NULL,
  `designation` varchar(255) NOT NULL,
  `domain` varchar(255) NOT NULL,
  `entitle` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `quantity` int(11) NOT NULL,
  `total` decimal(10,2) NOT NULL,
  `discount` decimal(10,2) NOT NULL,
  `grandTotal` decimal(10,2) NOT NULL,
  `inputCount` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `quotation`
--

INSERT INTO `quotation` (`quotation_id`, `name`, `email`, `gender`, `date`, `designation`, `domain`, `entitle`, `description`, `price`, `quantity`, `total`, `discount`, `grandTotal`, `inputCount`) VALUES
(37, 'ravi sharma', 'ravi@gmail.com', 'male', '2024-08-14', 'Scholar', 'Life Science', 'NA', 'Thesis', 50000.00, 1, 50000.00, 10000.00, 40000.00, 2),
(38, 'Zakiya Zeenath ', 'zakiya@gmail.com', 'female', '2024-08-31', 'Research Scholar', 'Electrical engineering ', 'NA', '2 Conference Papers, 2 Research Articles, A Thesis', 150000.00, 1, 150000.00, 20000.00, 130000.00, 3),
(39, 'suman', 'suman@gmail.com', 'female', '2024-09-02', 'Research Scholar', 'Engineering', 'NA', 'Thesis', 50000.00, 1, 50000.00, 10000.00, 40000.00, 2),
(40, 'suman', 'suman@gmail.com', 'female', '2024-09-02', 'Research Scholar', 'Management', 'NA', 'Thesis', 100000.00, 1, 100000.00, 40000.00, 60000.00, 2);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `quotation`
--
ALTER TABLE `quotation`
  ADD PRIMARY KEY (`quotation_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `quotation`
--
ALTER TABLE `quotation`
  MODIFY `quotation_id` int(9) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
