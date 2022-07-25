-- MariaDB dump 10.19  Distrib 10.4.21-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: zonagamer_db
-- ------------------------------------------------------
-- Server version	10.4.21-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `products` (
  `ID_products` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `description` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `warranty` int(2) NOT NULL,
  `price` decimal(10,0) NOT NULL,
  `discount` int(3) NOT NULL,
  `date` date NOT NULL,
  `estado_ID_estado` int(10) NOT NULL,
  `category_ID_category` int(11) NOT NULL,
  PRIMARY KEY (`ID_products`),
  UNIQUE KEY `ID_usuario_UNIQUE` (`ID_products`),
  KEY `fk_products_estado1_idx` (`estado_ID_estado`),
  KEY `fk_products_category1_idx` (`category_ID_category`),
  CONSTRAINT `fk_products_category1` FOREIGN KEY (`category_ID_category`) REFERENCES `category` (`ID_category`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_products_estado1` FOREIGN KEY (`estado_ID_estado`) REFERENCES `estado` (`ID_estado`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=187 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (24,'Monitor','Samsung 21\"','1656252641907_img.jpg',12,35000,20,'2022-06-25',2,6),(25,'Monitor','RCA 23\"','1656252641907_img.jpg',12,38000,10,'2022-06-25',1,6),(26,'Gabinete','Raidmax Pro','1656221184668_img.jpg',6,11000,5,'2022-06-25',2,4),(27,'Gabinete','Thermaltake','1656221184668_img.jpg',6,7000,20,'2022-06-25',1,4),(28,'Gabinete','Gamemax','1653186366964_img.jpg',6,8000,15,'2022-06-25',2,4),(29,'Gabinete','Gaming Pro','1653186366965_img.jpg',6,10000,5,'2022-06-25',1,4),(30,'Gabinete','Air Cool SX','1656221204898_img.jpg',6,9000,10,'2022-06-25',2,4),(31,'Placa Video','GeForce RTX','1653186366967_img.jpg',3,200000,15,'2022-06-25',1,9),(32,'Placa Video','MSI N210','1653186366968_img.jpg',3,150000,25,'2022-06-25',2,9),(33,'Placa Video','GeForce G730','1653186366969_img.jpg',3,220000,10,'2022-06-25',1,9),(34,'Placa Video','Raedon RX550','1653186366970_img.jpg',3,180000,20,'2022-06-25',2,9),(35,'Placa Video','Raedon RX6600','1653186366971_img.jpg',3,210000,40,'2022-06-25',1,9),(36,'Placa Video','Gigabyte AMD','1653186366972_img.jpg',3,175000,50,'2022-06-25',2,9),(37,'Monitor','Sony 21\"','1653186366973_img.jpg',12,32000,10,'2022-06-25',1,6),(38,'Gabinete','Thermaltek Pro','1653186366974_img.jpg',6,10500,5,'2022-06-25',2,4),(39,'Placa Video','MSI N550','1653186366975_img.jpg',3,170000,35,'2022-06-25',1,9),(102,'Monitor ','Sony 17\"','1656220909828_img.jpg',6,25000,10,'2022-06-26',1,6),(103,'Monitor','Sanyo 26\"','1656220988644_img.jpg',12,35000,15,'2022-06-26',2,6),(104,'Gabinete','Raimax Ulta Gamer','1656221287920_img.jpg',3,12000,10,'2022-06-26',1,4),(106,'Auricular Gamer','HP Dhe - 8011um','1657848748106_img.png',12,20000,10,'2022-07-14',2,1),(107,'Auricular Gamer','B-3510','1657848918807_img.png',6,18000,5,'2022-07-14',1,1),(108,'Auricular Logitech','G-435 Bluetooth','1657849039510_img.png',18,23000,10,'2022-07-14',2,1),(109,'Auriculares In - Ear','QCY T1C Inalambricos','1657849133133_img.png',6,21500,15,'2022-07-14',1,1),(110,'Auricular Cat','Gatito Rosa','1657849238820_img.png',6,12000,5,'2022-07-14',2,1),(111,'Auriculares Energy','Bluetooth System','1657849355872_img.png',12,26000,20,'2022-07-14',1,1),(112,'Coolers Para CPU','Combo x 3 - RGB','1657850519335_img.png',4,25000,0,'2022-07-14',2,2),(113,'Cooler CPU','Scythe Version 2022','1657850630625_img.png',12,18000,10,'2022-07-14',1,2),(114,'Coller Gabinete','Coolermaster MF-120','1657850719208_img.png',6,5999,5,'2022-07-14',2,2),(115,'Cooler CPU','Hyper 212','1657851140462_img.png',6,17500,10,'2022-07-14',1,2),(116,'Coller CPU','Abkoncore T404','1657851252391_img.png',12,18500,5,'2022-07-14',2,2),(117,'Cooler CPU','SE-914-XT','1657851327701_img.png',6,21200,10,'2022-07-14',1,2),(118,'Disco Duro Interno','Western Digital W10 - 1TB','1658085439588_img.png',6,10498,5,'2022-07-14',2,3),(119,'Disco Duro Interno','WD Purple - 500GB','1658085638854_img.png',6,13299,5,'2022-07-14',1,3),(120,'Disco Duro Externo','WD Elements Portable','1658085696925_img.png',6,12419,5,'2022-07-14',2,3),(121,'Disco Duro Interno','WD Red - 10TB','1658085664729_img.png',6,21000,5,'2022-07-14',1,3),(122,'Disco Duro Interno','WD Gold Oro - 10TB','1658085681532_img.png',12,75299,10,'2022-07-14',2,3),(123,'Disco Duro Interno','Seagate Barracuda - 2TB','1658085724803_img.png',6,16600,10,'2022-07-14',1,3),(124,'Memoria RAM','TridentZ - 3400Mhz - 8GB','1658083951776_img.png',12,16499,0,'0022-07-17',2,5),(125,'Memoria RAM','Kingston - DDR3 - 1800Mhz ','1658084192936_img.png',6,14910,0,'2022-07-17',1,5),(126,'Memoria RAM','Kingston DDR4 - 3200Mhz','1658084555065_img.png',12,19999,5,'2022-07-17',2,5),(127,'Memoria RAM','Kingston - Fury Beast - DDR4','1658084693286_img.png',6,13590,0,'2022-07-17',1,5),(128,'Memoria RAM','Corsair - DDR4 - 3200Mhz','1658084786976_img.png',6,18940,5,'2022-07-17',2,5),(129,'Memoria RAM','Corsair C40 - DDR5 -  5200Mhz','1658084876332_img.png',12,43720,10,'2022-07-17',1,5),(130,'Motherboard','MSI - A520 Pro - VH Full HD','1658086784882_img.png',6,14670,5,'2022-07-18',2,7),(131,'Motherboard','ASUS Prime - H570M - Plus','1658086700626_img.png',12,26292,10,'2022-07-18',1,7),(132,'Motherboard','MSI A320M - 5ta Generación','1658086892627_img.png',6,9840,0,'2022-07-18',2,7),(133,'Motherboard','ASROCK H510/AC - Pro Gramer','1658086950322_img.png',6,17510,5,'2022-07-18',1,7),(134,'Motherboard','ECS Elite Group - A320 AM4','1658087021345_img.png',6,7509,0,'2022-07-18',2,7),(135,'Motherboard','GIGABYTE - H410M - V3 Pro','1658087082308_img.png',6,13070,5,'2022-07-18',1,7),(136,'Mouse Gamer','Genius GX Gaming - Skorpion','1658089708829_img.png',6,1291,0,'2022-07-19',2,8),(137,'Mouse Gamer','Logitech G502 - Wireless','1658089825604_img.png',12,14790,10,'2022-07-19',1,8),(138,'Mouse de Escritorio','Logitech Pop Black Yellow','1658089924435_img.png',6,4333,0,'2022-07-19',2,8),(139,'Mouse de Escritorio','Logitech M280 - Wireless','1658090027249_img.png',6,1779,0,'2022-07-19',1,8),(140,'Mouse Gamer','Genius GX200 - Black USB','1658090103499_img.png',6,1950,0,'2022-07-19',2,8),(141,'Mouse Gamer','Logitech G300S - Gaming','1658090176911_img.png',6,3496,0,'2022-07-19',1,8),(142,'Mouse de Escritorio','TRUST Jungle - GTX101C','1658090296776_img.png',6,1747,0,'2022-07-19',2,8),(143,'Mouse de Escritorio','Logitech G203 - LightSync Blue','1658090370915_img.png',6,3496,0,'2022-07-19',1,8),(165,'Teclado','CORSAIR K55 + Harpoon GB','1658583847497_img.png',6,8943,5,'2022-07-23',1,12),(166,'Teclado','Logitech Pro LOL2 - Mecánico','1658583939210_img.png',12,23207,10,'2022-07-23',1,12),(167,'Teclado','RAZER Huntsman - Gamer','1658584012192_img.png',6,23720,10,'2022-07-23',1,12),(168,'Teclado','Logitech MK295 - Wireless','1658584102689_img.png',6,5365,0,'2022-07-23',2,12),(169,'Teclado','Logitech G513 - Gamer RGB','1658584191390_img.png',12,23926,15,'2022-07-23',2,12),(170,'Teclado','Logitech Mini - Wireless 920','1658584251415_img.png',6,14863,10,'2022-07-23',2,12);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-07-25  0:39:01
