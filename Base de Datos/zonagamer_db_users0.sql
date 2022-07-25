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
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `ID_usuario` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  `apellido` varchar(45) NOT NULL,
  `correoElectronico` varchar(255) NOT NULL,
  `userName` varchar(45) NOT NULL,
  `contrasenia` varchar(255) NOT NULL,
  `imagenPerfil` varchar(255) NOT NULL,
  `rol_ID_rol` int(10) NOT NULL,
  `estado_ID_estado` int(10) NOT NULL,
  PRIMARY KEY (`correoElectronico`,`userName`),
  UNIQUE KEY `ID_usuario_UNIQUE` (`ID_usuario`),
  UNIQUE KEY `correoElectronico_UNIQUE` (`correoElectronico`),
  UNIQUE KEY `userName_UNIQUE` (`userName`),
  KEY `fk_user_rol_idx` (`rol_ID_rol`),
  KEY `fk_user_estado1_idx` (`estado_ID_estado`),
  CONSTRAINT `fk_user_estado1` FOREIGN KEY (`estado_ID_estado`) REFERENCES `estado` (`ID_estado`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_rol` FOREIGN KEY (`rol_ID_rol`) REFERENCES `rol` (`ID_rol`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (2,'Liam','Scherpa','liamscherpa@gmail.com','LiamRacing','$2a$10$SEcpEXuRlP3S1s17lV6aCuS0.J4TyYkCNGtlb1QOWcASBirMM/g0y','1655770397643_img.jpg',2,1),(1,'Pablo','Scherpa','scherpablo@gmail.com','scherpablo','$2a$10$SEcpEXuRlP3S1s17lV6aCuS0.J4TyYkCNGtlb1QOWcASBirMM/g0y','1657380095798_img.jpg',1,1);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
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
