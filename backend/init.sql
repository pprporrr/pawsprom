-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: mysql
-- Generation Time: Aug 09, 2023 at 09:49 AM
-- Server version: 8.0.34
-- PHP Version: 8.2.8

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
-- Table structure for table `adoptionDecision`
--

CREATE TABLE `adoptionDecision` (
  `decisionID` int NOT NULL,
  `adoptionRequest_requestID` int NOT NULL,
  `decisionDate` date NOT NULL,
  `decisionStatus` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Table structure for table `adoptionRequest`
--

CREATE TABLE `adoptionRequest` (
  `requestID` int NOT NULL,
  `pet_petID` int NOT NULL,
  `user_userID` int NOT NULL,
  `requestStatus` varchar(45) NOT NULL,
  `requestDate` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

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
  `description` varchar(512) DEFAULT NULL,
  `features` json DEFAULT NULL,
  `availabilityStatus` varchar(45) NOT NULL,
  `shelters_shelterID` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Table structure for table `petImages`
--

CREATE TABLE `petImages` (
  `imageID` int NOT NULL,
  `pet_petID` int NOT NULL,
  `imageURL` varchar(512) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Table structure for table `petOwnership`
--

CREATE TABLE `petOwnership` (
  `ownershipID` int NOT NULL,
  `pet_petID` int NOT NULL,
  `user_userID` int NOT NULL,
  `adoptionDate` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Table structure for table `petVaccinations`
--

CREATE TABLE `petVaccinations` (
  `vaccinationID` int NOT NULL,
  `pet_petID` int NOT NULL,
  `vaccinationName` varchar(45) NOT NULL,
  `vaccinationDate` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Table structure for table `shelter`
--

CREATE TABLE `shelter` (
  `shelterID` int NOT NULL,
  `shelterName` varchar(45) NOT NULL,
  `shelterAddress` varchar(512) NOT NULL,
  `contactInfo` varchar(512) NOT NULL,
  `phoneNumber` varchar(16) NOT NULL,
  `imageURL` varchar(512) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `userID` int NOT NULL,
  `username` varchar(16) NOT NULL,
  `password` varchar(512) NOT NULL,
  `firstName` varchar(32) NOT NULL,
  `lastName` varchar(32) NOT NULL,
  `phoneNumber` varchar(16) NOT NULL,
  `address` varchar(512) NOT NULL,
  `role` varchar(16) NOT NULL,
  `imageURL` varchar(512) DEFAULT NULL,
  `shelter_shelterID` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `adoptionDecision`
--
ALTER TABLE `adoptionDecision`
  ADD PRIMARY KEY (`decisionID`),
  ADD KEY `fk_adoptionDecision_adoptionRequest1_idx` (`adoptionRequest_requestID`);

--
-- Indexes for table `adoptionRequest`
--
ALTER TABLE `adoptionRequest`
  ADD PRIMARY KEY (`requestID`),
  ADD KEY `fk_adoptionRequest_pet1_idx` (`pet_petID`),
  ADD KEY `fk_adoptionRequest_user1_idx` (`user_userID`);

--
-- Indexes for table `pet`
--
ALTER TABLE `pet`
  ADD PRIMARY KEY (`petID`),
  ADD KEY `fk_pet_shelters1_idx` (`shelters_shelterID`);

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
-- AUTO_INCREMENT for table `adoptionDecision`
--
ALTER TABLE `adoptionDecision`
  MODIFY `decisionID` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `adoptionRequest`
--
ALTER TABLE `adoptionRequest`
  MODIFY `requestID` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pet`
--
ALTER TABLE `pet`
  MODIFY `petID` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `petImages`
--
ALTER TABLE `petImages`
  MODIFY `imageID` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `petOwnership`
--
ALTER TABLE `petOwnership`
  MODIFY `ownershipID` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `petVaccinations`
--
ALTER TABLE `petVaccinations`
  MODIFY `vaccinationID` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `shelter`
--
ALTER TABLE `shelter`
  MODIFY `shelterID` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `userID` int NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `adoptionDecision`
--
ALTER TABLE `adoptionDecision`
  ADD CONSTRAINT `fk_adoptionDecision_adoptionRequest1` FOREIGN KEY (`adoptionRequest_requestID`) REFERENCES `adoptionRequest` (`requestID`);

--
-- Constraints for table `adoptionRequest`
--
ALTER TABLE `adoptionRequest`
  ADD CONSTRAINT `fk_adoptionRequest_pet1` FOREIGN KEY (`pet_petID`) REFERENCES `pet` (`petID`),
  ADD CONSTRAINT `fk_adoptionRequest_user1` FOREIGN KEY (`user_userID`) REFERENCES `user` (`userID`);

--
-- Constraints for table `pet`
--
ALTER TABLE `pet`
  ADD CONSTRAINT `fk_pet_shelters1` FOREIGN KEY (`shelters_shelterID`) REFERENCES `shelter` (`shelterID`);

--
-- Constraints for table `petImages`
--
ALTER TABLE `petImages`
  ADD CONSTRAINT `fk_petImages_pet1` FOREIGN KEY (`pet_petID`) REFERENCES `pet` (`petID`);

--
-- Constraints for table `petOwnership`
--
ALTER TABLE `petOwnership`
  ADD CONSTRAINT `fk_petOwnership_pet1` FOREIGN KEY (`pet_petID`) REFERENCES `pet` (`petID`),
  ADD CONSTRAINT `fk_petOwnership_user1` FOREIGN KEY (`user_userID`) REFERENCES `user` (`userID`);

--
-- Constraints for table `petVaccinations`
--
ALTER TABLE `petVaccinations`
  ADD CONSTRAINT `fk_petVaccinations_pet1` FOREIGN KEY (`pet_petID`) REFERENCES `pet` (`petID`);

--
-- Constraints for table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `fk_user_shelter1` FOREIGN KEY (`shelter_shelterID`) REFERENCES `shelter` (`shelterID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;