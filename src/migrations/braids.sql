-- MariaDB dump 10.19  Distrib 10.4.27-MariaDB, for Linux (x86_64)
--
-- Host: localhost    Database: braids
-- ------------------------------------------------------
-- Server version	10.4.27-MariaDB-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `braids`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `braids` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;

USE `braids`;

--
-- Table structure for table `Admin`
--

DROP TABLE IF EXISTS `Admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Admin` (
  `adminID` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `phone` varchar(50) NOT NULL,
  `token` text DEFAULT NULL,
  `password` varchar(100) NOT NULL,
  `accountType` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`adminID`),
  UNIQUE KEY `uk_email` (`email`),
  UNIQUE KEY `uk_phone` (`phone`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Admin`
--

LOCK TABLES `Admin` WRITE;
/*!40000 ALTER TABLE `Admin` DISABLE KEYS */;
INSERT INTO `Admin` VALUES (1,'test1','test1@gmail.com','1111111','','$2b$09$KIQs3ldfeTNXiYNLGhuIIO8i0HPflhAAEVF/UY.6ifkpLZ1ayAc1m','ADMIN');
/*!40000 ALTER TABLE `Admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Booking`
--

DROP TABLE IF EXISTS `Booking`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Booking` (
  `bookID` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `phone` varchar(100) NOT NULL,
  `date` datetime DEFAULT NULL,
  `designID` int(11) DEFAULT NULL,
  `done` tinyint(4) DEFAULT 0,
  PRIMARY KEY (`bookID`),
  UNIQUE KEY `date_ukey` (`date`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Booking`
--

LOCK TABLES `Booking` WRITE;
/*!40000 ALTER TABLE `Booking` DISABLE KEYS */;
INSERT INTO `Booking` VALUES (16,'testing','6 11 11 11 11','2024-03-06 08:00:00',1,NULL),(17,'testing','6 11 11 11 11','2024-03-06 09:00:00',1,1),(18,'','','1970-01-01 00:00:00',8,NULL),(19,'test1','122333443','2024-03-11 18:00:00',1,NULL);
/*!40000 ALTER TABLE `Booking` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Design`
--

DROP TABLE IF EXISTS `Design`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Design` (
  `designID` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `description` text DEFAULT NULL,
  `price` float NOT NULL,
  `duration` int(11) NOT NULL,
  `catagory` enum('MEN','WOMEN') DEFAULT NULL,
  `images` text DEFAULT NULL,
  PRIMARY KEY (`designID`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Design`
--

LOCK TABLES `Design` WRITE;
/*!40000 ALTER TABLE `Design` DISABLE KEYS */;
INSERT INTO `Design` VALUES (1,'Install Wigs','Are you looking to achieve a flawless and effortless hairstyle? Our wig installation service is here to fulfill your needs! Our qualified hair experts are dedicated to providing an exceptional wig installation experience, helping you achieve the desired look you\'ve always wanted.',120,90,'WOMEN','2.jpg,1.jpg'),(2,'Boho Braids',' Transform your hairstyle with elegant and timeless Boho Braids. Our team of experienced hairstylists creates unique bohemian braids that will instantly give you a boho-chic look.',220,90,'WOMEN','1.jpg,bohoo.jpg'),(3,'Knotless Braids','Elevate your style with flawless knotless braids. Our skilled braiders create seamless, natural-looking braids that enhance your beauty and protect your hair. Experience the difference today!',200,90,'WOMEN','2.jpg,1.jpg'),(4,'Cornrows','Get runway-ready with our expertly crafted cornrows. Our talented stylists meticulously weave intricate patterns, delivering sleek and stylish cornrow designs that won\'t disappoint. Book now for a trendy transformation!',180,90,'WOMEN','1.jpg,2.jpg,corn row.jpg,cornrow.jpg'),(5,'Box Braids','Embrace the beauty and versatility of box braids. Our skilled braiders meticulously create stunning braided patterns that not only look amazing but also protect and enhance your natural hair. Book today and slay effortlessly!',180,90,'WOMEN','2.jpg,9.jpeg'),(6,'Two Strands twist','Elevate your hair game with stylish two-strand braids. Our talented stylists intricately weave twin braids, delivering a chic and sophisticated look that\'s perfect for any occasion. Book now for a fabulous hair transformation!',120,90,'MEN','2.jpg,Tt.jpg'),(7,'Crochet braids','Get an amazing hair transformation with crochet braids. Our experts use hair extensions to create unique and versatile hairstyles that make you shine. Book now for an unforgettable hair experience!',160,90,'WOMEN','1.jpg'),(8,'Passion twists','Experience the beauty of passion twists, a trendy and elegant hairstyle. Our talented professionals create flawless twists for a glamorous and effortless look. Book now for your dream hairstyle!',200,60,'WOMEN','1.jpg,passio twist.jpg,passion.jpg'),(9,'Twist','Experience the best of twists for a unique and modern style. Our experts create flawless twists that enhance your personality and beauty. Book now for an exceptional hair transformation!',120,50,'MEN','3.jpg,12.jpg,twist1.jpg'),(10,'Senegalese twist','Get beautifully crafted Senegalese twists for a trendy and protective look. Our talented professionals will provide you with an authentic and elegant style. Book now for an exceptional hair transformation!',220,120,'WOMEN','IMG-20240131-WA0439.jpg,Sn.jpg,sene.jpg');
/*!40000 ALTER TABLE `Design` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-03-01 20:56:14
