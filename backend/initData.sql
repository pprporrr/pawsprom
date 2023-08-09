-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: mysql
-- Generation Time: Aug 09, 2023 at 10:11 AM
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

--
-- Dumping data for table `adoptionDecision`
--

INSERT INTO `adoptionDecision` (`decisionID`, `adoptionRequest_requestID`, `decisionDate`, `decisionStatus`) VALUES
(1, 1, '2023-07-15', 'Approved'),
(2, 2, '2023-07-20', 'Rejected');

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

--
-- Dumping data for table `adoptionRequest`
--

INSERT INTO `adoptionRequest` (`requestID`, `pet_petID`, `user_userID`, `requestStatus`, `requestDate`) VALUES
(1, 101, 201, 'Approved', '2023-07-10'),
(2, 102, 202, 'Rejected', '2023-07-18'),
(3, 103, 203, 'Pending', '2023-07-22');

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

--
-- Dumping data for table `pet`
--

INSERT INTO `pet` (`petID`, `petName`, `species`, `breed`, `age`, `gender`, `weight`, `color`, `dateofbirth`, `description`, `features`, `availabilityStatus`, `shelters_shelterID`) VALUES
(101, 'Max', 'Dog', 'Labrador', 3, 'Male', '25 kg', 'Black', '2020-05-12', 'Friendly and playful', '[\"Can live with children of any age\", \"Can live with other dogs\"]', 'Available', 501),
(102, 'Bella', 'Cat', 'Siamese', 2, 'Female', '4 kg', 'White', '2021-01-05', 'Shy but affectionate', NULL, 'Adopted', 502),
(103, 'Rocky', 'Dog', 'German Shep', 4, 'Male', '30 kg', 'Brown', '2019-10-20', 'Energetic and loyal', '[\"Microchipped\"]', 'Available', 503),
(104, 'Buddy', 'Dog', 'Labrador', 3, 'Male', '25 lbs', 'Golden', '2020-03-15', 'Friendly and playful', NULL, 'Available', 501),
(105, 'Whiskers', 'Cat', 'Siamese', 2, 'Female', '8 lbs', 'White', '2021-01-10', 'Shy but affectionate', '[\"Microchipped\", \"Purebred\", \"Behavioral Issues\"]', 'Owned', NULL),
(106, 'NooMax', 'Dog', 'German Shep', 4, 'Male', '30 lbs', 'Black', '2019-12-05', 'Active and loves outdoor play', NULL, 'Available', 502);

-- --------------------------------------------------------

--
-- Table structure for table `petImages`
--

CREATE TABLE `petImages` (
  `imageID` int NOT NULL,
  `pet_petID` int NOT NULL,
  `imageURL` varchar(512) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `petImages`
--

INSERT INTO `petImages` (`imageID`, `pet_petID`, `imageURL`) VALUES
(1, 101, 'https://cdn.britannica.com/82/232782-050-8062ACFA/Black-labrador-retriever-dog.jpg'),
(2, 101, 'https://www.petfinder.com/static/a71810ac65cbcac54a326e68ac309e6e/3f509/Labrador-600x260-sm.jpg'),
(3, 102, 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Siam_lilacpoint.jpg/640px-Siam_lilacpoint.jpg'),
(4, 103, 'https://cdn.britannica.com/79/232779-050-6B0411D7/German-Shepherd-dog-Alsatian.jpg'),
(5, 104, 'https://labradorlovingsouls.com/wp-content/uploads/2019/06/dog-1210559_1280-1-1-1-1-1.jpg'),
(6, 101, 'https://canem.dk/cache/2/1/6/9/6/3/2/labrador-retriever-fit-2000x2000x80.webp'),
(7, 105, 'https://catastic.b-cdn.net/wp-content/uploads/2023/03/siamese-cat-price.jpg'),
(8, 106, 'https://germanshepherdshop.com/cdn/shop/articles/everything-you-need-to-know-about-the-black-german-shepherd-476400.jpg?v=1621276651');

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

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
  `shelterAddress` varchar(512) NOT NULL,
  `contactInfo` varchar(512) NOT NULL,
  `phoneNumber` varchar(16) NOT NULL,
  `imageURL` varchar(512) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `shelter`
--

INSERT INTO `shelter` (`shelterID`, `shelterName`, `shelterAddress`, `contactInfo`, `phoneNumber`, `imageURL`) VALUES
(501, 'Happy Paws', '123 Main St, City', 'info@happypaws.com', '+123456789', 'https://www.usatoday.com/gcdn/presto/2020/03/26/PWES/b54dc23e-34f6-460e-8931-26ccc2f8677f-sh032620coronapets005.JPG?crop=6213,3495,x0,y389&width=3200&height=1801&format=pjpg&auto=webp'),
(502, 'Kitty Haven', '456 Park Ave, Town', 'info@kittyhaven.com', '+987654321', NULL),
(503, 'Doggie Sanctuary', '789 Oak Rd, Village', 'info@doggiesanct.com', '+234567890', 'https://www.sa.gov/files/assets/main/acs/images/stop-animal-cruelty.jpg?w=1200');

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
-- Dumping data for table `user`
--

INSERT INTO `user` (`userID`, `username`, `password`, `firstName`, `lastName`, `phoneNumber`, `address`, `role`, `imageURL`, `shelter_shelterID`) VALUES
(201, 'NONGNOON', '$2b$12$os3yFWCLdKljq/4ThhROVODo/xQJNv/PYOicDTQRahwg5IoGyjLHG', 'Nong', 'Noon', '+1122334455', '123 Elm St, City', 'User', NULL, NULL),
(202, 'NONGFOAM', '$2b$12$pJpHOUQbwvga.Cd/mWI4VOeIp9cbTTKJjDWyrXnfTNpVK2haCldRO', 'Nong', 'Foam', '+9988776655', '456 Maple Ave, Town', 'User', 'https://img.freepik.com/premium-vector/cute-dog-cat-friend-cartoon-vector-icon-illustration-animal-nature-icon-concept-isolated-flat_138676-4548.jpg', NULL),
(203, 'staff_1', '$2b$12$fZQ.D7Y3HBUxXwn/Tz5oNuhipwyITCMyn2qI.EQKWTdf2cmqPoy82', 'Shelter', '501', '+7435312302', '123 Main St, City', 'ShelterStaff', 'https://static.vecteezy.com/system/resources/previews/000/290/610/original/administration-vector-icon.jpg', 501),
(204, 'staff_2', '$2b$12$7OeavEt7df8ZhbISBd3L7uReGWyHie7SQo59r0RZ1f2bxST3aCSeK', 'Shelter', '503', '+7654321890', '789 Oakwood Dr, Village', 'ShelterStaff', 'https://static.vecteezy.com/system/resources/previews/000/290/610/original/administration-vector-icon.jpg', 503);

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
  MODIFY `decisionID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `adoptionRequest`
--
ALTER TABLE `adoptionRequest`
  MODIFY `requestID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `pet`
--
ALTER TABLE `pet`
  MODIFY `petID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=107;

--
-- AUTO_INCREMENT for table `petImages`
--
ALTER TABLE `petImages`
  MODIFY `imageID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

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
