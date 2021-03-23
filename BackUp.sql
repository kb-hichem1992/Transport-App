-- MySQL dump 10.13  Distrib 5.6.17, for Win32 (x86)
--
-- Host: localhost    Database: transport
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
  `NUMERO_CANDIDAT` int(11) NOT NULL,
  `NUMERO_OPERATEUR` int(11) NOT NULL,
  `NOM_CANDIDAT` char(50) NOT NULL,
  `PRENOM_CANDIDAT` char(50) NOT NULL,
  `DATE_NAIS_CANDIDAT` date NOT NULL,
  `LIEU_NAIS_CANDIDAT` varchar(20) NOT NULL,
  `NIVEAU_SCOL_CANDIDAT` varchar(50) DEFAULT NULL,
  `ADRESSE_CANDIDAT` varchar(100) DEFAULT NULL,
  `PRENOM_PERE` varchar(50) NOT NULL,
  PRIMARY KEY (`NUMERO_CANDIDAT`),
  KEY `FK_TRAVAIL` (`NUMERO_OPERATEUR`),
  CONSTRAINT `FK_TRAVAIL` FOREIGN KEY (`NUMERO_OPERATEUR`) REFERENCES `operateur` (`NUMERO_OPERATEUR`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `candidat`
--

LOCK TABLES `candidat` WRITE;
/*!40000 ALTER TABLE `candidat` DISABLE KEYS */;
INSERT INTO `candidat` VALUES (1,1,'أheus','houssem','1993-10-31','Chlef','Master','Chara-CHlef','Faycel'),(2,1,'kouadri','hicham','1992-10-26','chlef','master','Chettia','Ahmed');
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
INSERT INTO `centre` VALUES ('13665','Centre 02 ','Chettia'),('23615','Centre 01','Ouled Fares'),('26516','Centre 03','Chorfa');
/*!40000 ALTER TABLE `centre` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `conduire`
--

DROP TABLE IF EXISTS `conduire`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `conduire` (
  `NUMERO_CANDIDAT` int(11) NOT NULL,
  `IMMATRECULATION` varchar(11) NOT NULL,
  PRIMARY KEY (`NUMERO_CANDIDAT`,`IMMATRECULATION`),
  KEY `FK_CONDUIRE` (`IMMATRECULATION`),
  CONSTRAINT `FK_CONDUIRE` FOREIGN KEY (`IMMATRECULATION`) REFERENCES `vehicule` (`IMMATRECULATION`),
  CONSTRAINT `FK_CONDUIRE2` FOREIGN KEY (`NUMERO_CANDIDAT`) REFERENCES `candidat` (`NUMERO_CANDIDAT`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `conduire`
--

LOCK TABLES `conduire` WRITE;
/*!40000 ALTER TABLE `conduire` DISABLE KEYS */;
INSERT INTO `conduire` VALUES (2,'1111-102-02'),(1,'2222-222-22');
/*!40000 ALTER TABLE `conduire` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `formation`
--

DROP TABLE IF EXISTS `formation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `formation` (
  `NUMERO_FORMATION` int(11) NOT NULL,
  `TYPE_FORMATION` varchar(50) DEFAULT NULL,
  `DEBUT` date DEFAULT NULL,
  `FIN` date DEFAULT NULL,
  PRIMARY KEY (`NUMERO_FORMATION`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `formation`
--

LOCK TABLES `formation` WRITE;
/*!40000 ALTER TABLE `formation` DISABLE KEYS */;
INSERT INTO `formation` VALUES (1,'نقل البضائع','2021-10-01','2021-10-29'),(2,'نقل المسافرين','2021-11-11','2021-11-30'),(3,'نقل المواد الخطيرة','2020-01-01','2020-01-31');
/*!40000 ALTER TABLE `formation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ligne`
--

DROP TABLE IF EXISTS `ligne`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ligne` (
  `NUMERO_PERMIS2` varchar(100) NOT NULL,
  `NUMERO_OPERATEUR` int(11) NOT NULL,
  `DATE_LIVRAI` date DEFAULT NULL,
  `DATE_EXP` date DEFAULT NULL,
  `TYPE_LIGNE` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`NUMERO_PERMIS2`),
  KEY `FK_AVOIR2` (`NUMERO_OPERATEUR`),
  CONSTRAINT `FK_AVOIR2` FOREIGN KEY (`NUMERO_OPERATEUR`) REFERENCES `operateur` (`NUMERO_OPERATEUR`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ligne`
--

LOCK TABLES `ligne` WRITE;
/*!40000 ALTER TABLE `ligne` DISABLE KEYS */;
INSERT INTO `ligne` VALUES ('0025',1,'2012-10-01','2013-10-01','PLUS 600');
/*!40000 ALTER TABLE `ligne` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `offre`
--

DROP TABLE IF EXISTS `offre`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `offre` (
  `NUMERO_FORMATION` int(11) NOT NULL,
  `NUMERO_AGREMENT` varchar(50) NOT NULL,
  PRIMARY KEY (`NUMERO_FORMATION`,`NUMERO_AGREMENT`),
  KEY `FK_OFFRE` (`NUMERO_AGREMENT`),
  CONSTRAINT `FK_OFFRE` FOREIGN KEY (`NUMERO_AGREMENT`) REFERENCES `centre` (`NUMERO_AGREMENT`),
  CONSTRAINT `FK_OFFRE2` FOREIGN KEY (`NUMERO_FORMATION`) REFERENCES `formation` (`NUMERO_FORMATION`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `offre`
--

LOCK TABLES `offre` WRITE;
/*!40000 ALTER TABLE `offre` DISABLE KEYS */;
INSERT INTO `offre` VALUES (1,'13665'),(2,'13665'),(3,'13665'),(2,'23615'),(3,'26516');
/*!40000 ALTER TABLE `offre` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `operateur`
--

DROP TABLE IF EXISTS `operateur`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `operateur` (
  `NUMERO_OPERATEUR` int(11) NOT NULL,
  `NOM_OPERATEUR` char(50) NOT NULL,
  `PRENOM_OPERATEUR` char(50) NOT NULL,
  `TYPE_OPERATEUR` varchar(50) NOT NULL,
  `SOCIETE` varchar(50) DEFAULT NULL,
  `SIEGE_SOCIALE` varchar(100) DEFAULT NULL,
  `ADRESSE_OPERATEUR` varchar(100) DEFAULT NULL,
  `DATE_NAIS_OPERATEUR` date NOT NULL,
  `LIEU_NAIS_OPERATEUR` varchar(50) NOT NULL,
  `NIVEAU_SCOL_OPERATEUR` varchar(50) DEFAULT NULL,
  `PRENOM_PERE` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`NUMERO_OPERATEUR`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `operateur`
--

LOCK TABLES `operateur` WRITE;
/*!40000 ALTER TABLE `operateur` DISABLE KEYS */;
INSERT INTO `operateur` VALUES (1,'kouadri','hicham','phisique',NULL,NULL,'chettia','1992-10-26','chlef','master','ahmed'),(2,'boudjelthia','nourddine','morale','Boudjelthia cars','Hay Es Salam','Chettia','1980-01-02','Chlef','Licence','Djilali');
/*!40000 ALTER TABLE `operateur` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `passe`
--

DROP TABLE IF EXISTS `passe`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `passe` (
  `NUMERO_CANDIDAT` int(11) NOT NULL,
  `NUMERO_FORMATION` int(11) NOT NULL,
  `REMARQUE` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`NUMERO_CANDIDAT`,`NUMERO_FORMATION`),
  KEY `FK_PASSE` (`NUMERO_FORMATION`),
  CONSTRAINT `FK_PASSE` FOREIGN KEY (`NUMERO_FORMATION`) REFERENCES `formation` (`NUMERO_FORMATION`),
  CONSTRAINT `FK_PASSE2` FOREIGN KEY (`NUMERO_CANDIDAT`) REFERENCES `candidat` (`NUMERO_CANDIDAT`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `passe`
--

LOCK TABLES `passe` WRITE;
/*!40000 ALTER TABLE `passe` DISABLE KEYS */;
INSERT INTO `passe` VALUES (1,1,'bien'),(2,3,'pas bien');
/*!40000 ALTER TABLE `passe` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permis_circuler`
--

DROP TABLE IF EXISTS `permis_circuler`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `permis_circuler` (
  `NUMERO_PERMIS` varchar(100) NOT NULL,
  `NUMERO_OPERATEUR` int(11) NOT NULL,
  `DATE_LIVRAI` date DEFAULT NULL,
  `DATE_EXP` date DEFAULT NULL,
  PRIMARY KEY (`NUMERO_PERMIS`),
  KEY `FK_AVOIR_PERMIS` (`NUMERO_OPERATEUR`),
  CONSTRAINT `FK_AVOIR_PERMIS` FOREIGN KEY (`NUMERO_OPERATEUR`) REFERENCES `operateur` (`NUMERO_OPERATEUR`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permis_circuler`
--

LOCK TABLES `permis_circuler` WRITE;
/*!40000 ALTER TABLE `permis_circuler` DISABLE KEYS */;
INSERT INTO `permis_circuler` VALUES ('1032',1,'2020-01-01','2020-12-01'),('258',2,'2021-03-03','2022-12-05');
/*!40000 ALTER TABLE `permis_circuler` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vehicule`
--

DROP TABLE IF EXISTS `vehicule`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `vehicule` (
  `IMMATRECULATION` varchar(11) NOT NULL,
  `NUMERO_OPERATEUR` int(11) NOT NULL,
  `GENRE` varchar(20) DEFAULT NULL,
  `MARQUE` varchar(20) DEFAULT NULL,
  `PTC` decimal(10,3) DEFAULT NULL,
  `PTAC` decimal(10,3) DEFAULT NULL,
  `CU` decimal(10,3) DEFAULT NULL,
  `NOMBRE_PLACE` int(11) DEFAULT NULL,
  PRIMARY KEY (`IMMATRECULATION`),
  KEY `FK_APPARTIENT` (`NUMERO_OPERATEUR`),
  CONSTRAINT `FK_APPARTIENT` FOREIGN KEY (`NUMERO_OPERATEUR`) REFERENCES `operateur` (`NUMERO_OPERATEUR`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vehicule`
--

LOCK TABLES `vehicule` WRITE;
/*!40000 ALTER TABLE `vehicule` DISABLE KEYS */;
INSERT INTO `vehicule` VALUES ('1111-102-02',1,'voyageur','Hyundai',0.000,0.000,0.000,3),('2222-222-22',2,'Marchandise','Mercedes',88.000,26.000,25.000,30);
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

-- Dump completed on 2021-03-15 20:09:05
