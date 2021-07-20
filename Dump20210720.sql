-- MySQL dump 10.13  Distrib 5.6.17, for Win32 (x86)
--
-- Host: localhost    Database: bdd
-- ------------------------------------------------------
-- Server version	5.5.40-log

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
-- Table structure for table `candidat`
--

DROP TABLE IF EXISTS `candidat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `candidat` (
  `NUM_INS` varchar(20) NOT NULL,
  `DATE_INS` date NOT NULL,
  `NOM_CANDIDAT` char(50) NOT NULL,
  `PRENOM_CANDIDAT` char(50) NOT NULL,
  `PRENOM_PERE` varchar(50) NOT NULL,
  `DATE_NAIS_CANDIDAT` date NOT NULL,
  `LIEU_NAIS_CANDIDAT` varchar(20) NOT NULL,
  `NIVEAU_SCOL_CANDIDAT` varchar(50) DEFAULT NULL,
  `ADRESSE_CANDIDAT` varchar(100) DEFAULT NULL,
  `SEX_CONDIDAT` char(10) DEFAULT NULL,
  `TYPE_CANDIDAT` varchar(20) DEFAULT NULL,
  `NUM_PERMIS` varchar(45) NOT NULL,
  `DATE_LIV_PERMIS` date DEFAULT NULL,
  `DATE_EXP_PERMIS` date DEFAULT NULL,
  `TYPE_PERMIS` varchar(50) DEFAULT NULL,
  `CATEGORIE_PERMIS` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`NUM_INS`,`DATE_INS`,`NUM_PERMIS`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `candidat`
--

LOCK TABLES `candidat` WRITE;
/*!40000 ALTER TABLE `candidat` DISABLE KEYS */;
INSERT INTO `candidat` VALUES ('00002','2021-07-19','حاج هني','كريم','محمد','1991-07-19','الشلف','متوسط','56 شارع ي البقعة','ذكر','متعاقد','61696947','2021-07-19','2030-10-26','بيومتري','A1,C1,C1E'),('0001','2021-07-19','بوجلطية','محمد','احمد','1992-07-19','الشلف','متوسط','الشطية','ذكر','حر','0055569','2019-07-19','2029-07-19','القديم','A2,B');
/*!40000 ALTER TABLE `candidat` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `centre`
--

DROP TABLE IF EXISTS `centre`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `centre` (
  `NUMERO_AGREMENT` varchar(50) NOT NULL,
  `NOM_CENTRE` varchar(50) DEFAULT NULL,
  `SIEGE` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`NUMERO_AGREMENT`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `centre`
--

LOCK TABLES `centre` WRITE;
/*!40000 ALTER TABLE `centre` DISABLE KEYS */;
INSERT INTO `centre` VALUES ('2','عاصم','الشطية');
/*!40000 ALTER TABLE `centre` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `formation`
--

DROP TABLE IF EXISTS `formation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `formation` (
  `NUMERO_FORMATION` int(11) NOT NULL,
  `GROUPE` int(11) NOT NULL,
  `NUMERO_AGREMENT` int(11) NOT NULL,
  `TYPE_FORMATION` varchar(50) DEFAULT NULL,
  `DEBUT` date DEFAULT NULL,
  `FIN` date DEFAULT NULL,
  PRIMARY KEY (`NUMERO_FORMATION`,`GROUPE`,`NUMERO_AGREMENT`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `formation`
--

LOCK TABLES `formation` WRITE;
/*!40000 ALTER TABLE `formation` DISABLE KEYS */;
INSERT INTO `formation` VALUES (1,1,2,'نقل البضائع','2021-07-15','2021-09-15'),(1,2,2,'نقل المسافرين','2021-07-15','2021-08-15'),(1,3,2,'نفل المواد الخطيرة','2021-07-16','2021-09-16'),(2,1,2,'نقل البضائع','2021-07-16','2021-09-16'),(2,2,2,'نقل المسافرين','2021-07-16','2021-10-16');
/*!40000 ALTER TABLE `formation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ligne`
--

DROP TABLE IF EXISTS `ligne`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ligne` (
  `NUM_INS` varchar(20) NOT NULL,
  `DATE_INS` date NOT NULL,
  `NUM_PERMIS` varchar(45) NOT NULL,
  `MATRECULE` varchar(10) NOT NULL,
  `NUM_LIGNE` varchar(100) NOT NULL,
  `TYPE_LIGNE` varchar(50) DEFAULT NULL,
  `DATE_LIV_LIGNE` date DEFAULT NULL,
  `DATE_EXP_LIGNE` date DEFAULT NULL,
  PRIMARY KEY (`NUM_INS`,`DATE_INS`,`NUM_PERMIS`,`MATRECULE`,`NUM_LIGNE`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ligne`
--

LOCK TABLES `ligne` WRITE;
/*!40000 ALTER TABLE `ligne` DISABLE KEYS */;
/*!40000 ALTER TABLE `ligne` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `operateur`
--

DROP TABLE IF EXISTS `operateur`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `operateur` (
  `NOM_OP` char(50) NOT NULL,
  `SIEGE_OP` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`NOM_OP`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `operateur`
--

LOCK TABLES `operateur` WRITE;
/*!40000 ALTER TABLE `operateur` DISABLE KEYS */;
/*!40000 ALTER TABLE `operateur` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `passe`
--

DROP TABLE IF EXISTS `passe`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `passe` (
  `NUM_INS` varchar(20) NOT NULL,
  `DATE_INS` date NOT NULL,
  `NUM_PERMIS` varchar(45) NOT NULL,
  `NUMERO_FORMATION` int(11) NOT NULL,
  `GROUPE` int(11) NOT NULL,
  `NUMERO_AGREMENT` varchar(50) NOT NULL,
  `NOTE` int(11) DEFAULT NULL,
  `REMARQUE` varchar(50) DEFAULT NULL,
  `BREVET` varchar(45) DEFAULT NULL,
  `LIV_BREVET` date DEFAULT NULL,
  `EXP_BREVET` date DEFAULT NULL,
  PRIMARY KEY (`NUM_INS`,`DATE_INS`,`NUM_PERMIS`,`NUMERO_FORMATION`,`GROUPE`,`NUMERO_AGREMENT`),
  KEY `FK_PASSE` (`NUMERO_FORMATION`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `passe`
--

LOCK TABLES `passe` WRITE;
/*!40000 ALTER TABLE `passe` DISABLE KEYS */;
INSERT INTO `passe` VALUES ('00002','2021-07-19','61696947',1,1,'2',12,'ناجح','26518922','2021-07-19','2030-07-19'),('0001','2021-07-19','0055569',1,1,'2',13,'ناجح','000000','2021-07-19','2026-07-19');
/*!40000 ALTER TABLE `passe` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `per_circule`
--

DROP TABLE IF EXISTS `per_circule`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `per_circule` (
  `NUM_INS` varchar(20) NOT NULL,
  `DATE_INS` date NOT NULL,
  `NUM_PERMIS` varchar(45) NOT NULL,
  `MATRECULE` varchar(10) NOT NULL,
  `NUM_PER` varchar(40) NOT NULL,
  `DATE_LIV_PER` date DEFAULT NULL,
  `DATE_EXP_PER` date DEFAULT NULL,
  PRIMARY KEY (`NUM_INS`,`DATE_INS`,`NUM_PERMIS`,`MATRECULE`,`NUM_PER`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `per_circule`
--

LOCK TABLES `per_circule` WRITE;
/*!40000 ALTER TABLE `per_circule` DISABLE KEYS */;
/*!40000 ALTER TABLE `per_circule` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `travail`
--

DROP TABLE IF EXISTS `travail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `travail` (
  `NUM_INS` varchar(20) NOT NULL,
  `DATE_INS` date NOT NULL,
  `NUM_PERMIS` varchar(45) NOT NULL,
  `NOM_OP` char(50) NOT NULL,
  `DATE_RECRUT` date NOT NULL,
  `DATE_FIN` date DEFAULT NULL,
  `ETAT` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`NUM_INS`,`DATE_INS`,`NUM_PERMIS`,`NOM_OP`),
  KEY `FK_TRAVAIL` (`NOM_OP`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `travail`
--

LOCK TABLES `travail` WRITE;
/*!40000 ALTER TABLE `travail` DISABLE KEYS */;
/*!40000 ALTER TABLE `travail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `USERNAME` varchar(50) NOT NULL,
  `PASSWORD` varchar(50) NOT NULL,
  `ADMIN` varchar(10) NOT NULL,
  `NUMERO_AGREMENT` varchar(50) NOT NULL,
  PRIMARY KEY (`USERNAME`,`PASSWORD`,`ADMIN`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('assim','assim','admin','2');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vehicule`
--

DROP TABLE IF EXISTS `vehicule`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `vehicule` (
  `MATRECULE` varchar(10) NOT NULL,
  `NOM_OP` char(50) NOT NULL,
  `GENRE` varchar(20) DEFAULT NULL,
  `MARQUE` varchar(20) DEFAULT NULL,
  `PTC` decimal(10,3) DEFAULT NULL,
  `PTAC` decimal(10,3) DEFAULT NULL,
  `CU` decimal(10,3) DEFAULT NULL,
  `NOMBRE_PLACE` int(11) DEFAULT NULL,
  PRIMARY KEY (`MATRECULE`),
  KEY `FK_APPARTIENT` (`NOM_OP`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vehicule`
--

LOCK TABLES `vehicule` WRITE;
/*!40000 ALTER TABLE `vehicule` DISABLE KEYS */;
/*!40000 ALTER TABLE `vehicule` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-07-20 23:55:17
