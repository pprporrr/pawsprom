-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Aug 24, 2023 at 02:51 PM
-- Server version: 5.7.39
-- PHP Version: 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `project`
--

-- --------------------------------------------------------

--
-- Table structure for table `adoptionApplication`
--

CREATE TABLE `adoptionApplication` (
  `applicationID` int NOT NULL,
  `pet_petID` int NOT NULL,
  `user_userID` int NOT NULL,
  `approvalStatus` ENUM('Approved', 'Rejected', 'Pending') NOT NULL,
  `dateofapplication` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `adoptionApplication`
--

INSERT INTO `adoptionApplication` (`applicationID`, `pet_petID`, `user_userID`, `approvalStatus`, `dateofapplication`) VALUES
(1, 102, 201, 'Approved', '2023-07-10'),
(2, 104, 202, 'Rejected', '2023-07-18'),
(3, 103, 202, 'Pending', '2023-07-22');

-- --------------------------------------------------------

--
-- Table structure for table `pet`
--

CREATE TABLE `pet` (
  `petID` int NOT NULL,
  `petName` varchar(45) NOT NULL,
  `species` varchar(45) NOT NULL,
  `breed` varchar(45) NOT NULL,
  `age` int NOT NULL,
  `gender` varchar(45) NOT NULL,
  `weight` varchar(45) NOT NULL,
  `color` varchar(45) NOT NULL,
  `dateofbirth` date NOT NULL,
  `description` longtext,
  `features` json NOT NULL,
  `availabilityStatus` ENUM('Available', 'Adopted', 'Owned') NOT NULL,
  `vaccinationRecord` longblob,
  `shelter_shelterID` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `pet`
--

INSERT INTO `pet` (`petID`, `petName`, `species`, `breed`, `age`, `gender`, `weight`, `color`, `dateofbirth`, `description`, `features`, `availabilityStatus`, `vaccinationRecord`, `shelter_shelterID`) VALUES
(101, 'Max', 'Dog', 'Labrador', 3, 'Male', 25, 'Black', '2020-05-12', 'Friendly and playful', '{"feature1": false, "feature2": true, "feature3": true, "feature4": false, "feature5": true, "feature6": false, "feature7": false, "feature8": true, "feature9": true, "feature10": false}', 'Available', NULL, 501),
(102, 'Bella', 'Cat', 'Siamese', 2, 'Female', 4, 'White', '2021-01-05', 'Shy but affectionate', '{"feature1": true, "feature2": false, "feature3": false, "feature4": true, "feature5": false, "feature6": true, "feature7": false, "feature8": false, "feature9": false, "feature10": false}', 'Adopted', NULL, 502),
(103, 'Rocky', 'Dog', 'German Shep', 4, 'Male', 30, 'Brown', '2019-10-20', 'Energetic and loyal', '{"feature1": false, "feature2": false, "feature3": true, "feature4": false, "feature5": true, "feature6": true, "feature7": false, "feature8": true, "feature9": false, "feature10": false}', 'Available', NULL, 503),
(104, 'Buddy', 'Dog', 'Labrador', 3, 'Male', 25, 'Golden', '2020-03-15', 'Friendly and playful', '{"feature1": true, "feature2": true, "feature3": true, "feature4": false, "feature5": true, "feature6": true, "feature7": true, "feature8": false, "feature9": true, "feature10": false}', 'Available', NULL, 501),
(105, 'Whiskers', 'Cat', 'Siamese', 2, 'Female', 8, 'White', '2021-01-10', 'Shy but affectionate', '{"feature1": false, "feature2": true, "feature3": true, "feature4": false, "feature5": false, "feature6": true, "feature7": false, "feature8": false, "feature9": true, "feature10": false}', 'Owned', NULL, NULL),
(106, 'NooMax', 'Dog', 'German Shep', 4, 'Male', 30, 'Black', '2019-12-05', 'Active and loves outdoor play', '{"feature1": false, "feature2": true, "feature3": true, "feature4": false, "feature5": false, "feature6": false, "feature7": false, "feature8": true, "feature9": true, "feature10": false}', 'Available', NULL, 502);

-- --------------------------------------------------------

--
-- Table structure for table `petImages`
--

CREATE TABLE `petImages` (
  `imageID` int NOT NULL,
  `pet_petID` int NOT NULL,
  `petImage` longblob NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `petOwnership`
--

CREATE TABLE `petOwnership` (
  `ownershipID` int NOT NULL,
  `pet_petID` int NOT NULL,
  `user_userID` int NOT NULL,
  `adoptionDate` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `petOwnership`
--

INSERT INTO `petOwnership` (`ownershipID`, `pet_petID`, `user_userID`, `adoptionDate`) VALUES
(1, 102, 201, '2023-07-15'),
(2, 105, 202, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `petVaccinations`
--

CREATE TABLE `petVaccinations` (
  `vaccinationID` int NOT NULL,
  `pet_petID` int NOT NULL,
  `vaccinationName` varchar(45) NOT NULL,
  `vaccinationDate` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `petVaccinations`
--

INSERT INTO `petVaccinations` (`vaccinationID`, `pet_petID`, `vaccinationName`, `vaccinationDate`) VALUES
(1, 101, 'Rabies', '2023-06-15'),
(2, 102, 'Feline Distemper', '2023-06-20'),
(3, 103, 'Canine Parvo', '2023-05-10'),
(4, 104, 'Lyme Disease', '2023-02-05'),
(5, 102, 'Parvovirus', '2023-08-12'),
(6, 106, 'Heartworm', '2022-01-02');

-- --------------------------------------------------------

--
-- Table structure for table `shelter`
--

CREATE TABLE `shelter` (
  `shelterID` int NOT NULL,
  `shelterName` varchar(45) NOT NULL,
  `shelterAddress` longtext NOT NULL,
  `sheltercontactInfo` varchar(255) NOT NULL,
  `shelterphoneNumber` varchar(16) NOT NULL,
  `shelterImage` longblob
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `shelter`
--

INSERT INTO `shelter` (`shelterID`, `shelterName`, `shelterAddress`, `sheltercontactInfo`, `shelterphoneNumber`, `shelterImage`) VALUES
(501, 'Happy Paws', '123 Main St, City', 'info@happypaws.com', '0823456789', NULL),
(502, 'Kitty Haven', '456 Park Ave, Town', 'info@kittyhaven.com', '0987654321', NULL),
(503, 'Doggie Sanctuary', '789 Oak Rd, Village', 'info@doggiesanct.com', '0934567890', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `userID` int NOT NULL,
  `username` varchar(16) NOT NULL,
  `password` longtext NOT NULL,
  `firstName` varchar(32) NOT NULL,
  `lastName` varchar(32) NOT NULL,
  `userphoneNumber` varchar(16) NOT NULL,
  `userAddress` longtext NOT NULL,
  `userRole` ENUM('User', 'ShelterStaff') NOT NULL,
  `userImage` longblob,
  `shelter_shelterID` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`userID`, `username`, `password`, `firstName`, `lastName`, `userphoneNumber`, `userAddress`, `userRole`, `userImage`, `shelter_shelterID`) VALUES
(201, 'NONGNOON', '$2b$12$os3yFWCLdKljq/4ThhROVODo/xQJNv/PYOicDTQRahwg5IoGyjLHG', 'Nong', 'Noon', '0812233445', '123 Elm St, City', 'User', NULL, NULL),
(202, 'NONGFOAM', '$2b$12$pJpHOUQbwvga.Cd/mWI4VOeIp9cbTTKJjDWyrXnfTNpVK2haCldRO', 'Nong', 'Foam', '0998877665', '456 Maple Ave, Town', 'User', NULL, NULL),
(203, 'staff_1', '$2b$12$fZQ.D7Y3HBUxXwn/Tz5oNuhipwyITCMyn2qI.EQKWTdf2cmqPoy82', 'Shelter', '501', '0943531230', '123 Main St, City', 'ShelterStaff', NULL, 501),
(204, 'staff_2', '$2b$12$7OeavEt7df8ZhbISBd3L7uReGWyHie7SQo59r0RZ1f2bxST3aCSeK', 'Shelter', '503', '0865432189', '789 Oakwood Dr, Village', 'ShelterStaff', NULL, 503);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `adoptionApplication`
--
ALTER TABLE `adoptionApplication`
  ADD PRIMARY KEY (`applicationID`),
  ADD KEY `fk_adoptionRequest_pet1_idx` (`pet_petID`),
  ADD KEY `fk_adoptionRequest_user1_idx` (`user_userID`);

--
-- Indexes for table `pet`
--
ALTER TABLE `pet`
  ADD PRIMARY KEY (`petID`),
  ADD KEY `fk_pet_shelters1_idx` (`shelter_shelterID`);

--
-- Indexes for table `petImages`
--
ALTER TABLE `petImages`
  ADD PRIMARY KEY (`imageID`),
  ADD KEY `fk_petImages_pet1_idx` (`pet_petID`);

--
-- Indexes for table `petOwnership`
--
ALTER TABLE `petOwnership`
  ADD PRIMARY KEY (`ownershipID`),
  ADD KEY `fk_petOwnership_user1_idx` (`user_userID`),
  ADD KEY `fk_petOwnership_pet1_idx` (`pet_petID`);

--
-- Indexes for table `petVaccinations`
--
ALTER TABLE `petVaccinations`
  ADD PRIMARY KEY (`vaccinationID`),
  ADD KEY `fk_petVaccinations_pet1_idx` (`pet_petID`);

--
-- Indexes for table `shelter`
--
ALTER TABLE `shelter`
  ADD PRIMARY KEY (`shelterID`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`userID`),
  ADD KEY `fk_user_shelter1_idx` (`shelter_shelterID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `adoptionApplication`
--
ALTER TABLE `adoptionApplication`
  MODIFY `applicationID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `pet`
--
ALTER TABLE `pet`
  MODIFY `petID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=107;

--
-- AUTO_INCREMENT for table `petImages`
--
ALTER TABLE `petImages`
  MODIFY `imageID` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `petOwnership`
--
ALTER TABLE `petOwnership`
  MODIFY `ownershipID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `petVaccinations`
--
ALTER TABLE `petVaccinations`
  MODIFY `vaccinationID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `shelter`
--
ALTER TABLE `shelter`
  MODIFY `shelterID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=504;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `userID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=205;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `adoptionApplication`
--
ALTER TABLE `adoptionApplication`
  ADD CONSTRAINT `fk_adoptionRequest_pet1` FOREIGN KEY (`pet_petID`) REFERENCES `pet` (`petID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_adoptionRequest_user1` FOREIGN KEY (`user_userID`) REFERENCES `user` (`userID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `pet`
--
ALTER TABLE `pet`
  ADD CONSTRAINT `fk_pet_shelters1` FOREIGN KEY (`shelter_shelterID`) REFERENCES `shelter` (`shelterID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `petImages`
--
ALTER TABLE `petImages`
  ADD CONSTRAINT `fk_petImages_pet1` FOREIGN KEY (`pet_petID`) REFERENCES `pet` (`petID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `petOwnership`
--
ALTER TABLE `petOwnership`
  ADD CONSTRAINT `fk_petOwnership_pet1` FOREIGN KEY (`pet_petID`) REFERENCES `pet` (`petID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_petOwnership_user1` FOREIGN KEY (`user_userID`) REFERENCES `user` (`userID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `petVaccinations`
--
ALTER TABLE `petVaccinations`
  ADD CONSTRAINT `fk_petVaccinations_pet1` FOREIGN KEY (`pet_petID`) REFERENCES `pet` (`petID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `fk_user_shelter1` FOREIGN KEY (`shelter_shelterID`) REFERENCES `shelter` (`shelterID`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;