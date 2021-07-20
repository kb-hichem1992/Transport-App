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
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-07-20 23:56:07
