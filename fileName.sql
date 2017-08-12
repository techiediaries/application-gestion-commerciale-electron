-- MySQL dump 10.13  Distrib 5.6.30, for debian-linux-gnu (i686)
--
-- Host: localhost    Database: fakedb
-- ------------------------------------------------------
-- Server version	5.6.30-0ubuntu0.15.10.1

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
-- Table structure for table `Accounts`
--

DROP TABLE IF EXISTS `Accounts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Accounts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `reference` varchar(255) DEFAULT NULL,
  `code` varchar(255) DEFAULT NULL,
  `libelle` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `debutPeriod` datetime DEFAULT NULL,
  `finPeriod` datetime DEFAULT NULL,
  `anneeFiscale` int(11) DEFAULT NULL,
  `balance` float DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `SocieteId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`),
  UNIQUE KEY `Accounts_code_unique` (`code`),
  KEY `SocieteId` (`SocieteId`),
  CONSTRAINT `Accounts_ibfk_1` FOREIGN KEY (`SocieteId`) REFERENCES `Societes` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Accounts`
--

LOCK TABLES `Accounts` WRITE;
/*!40000 ALTER TABLE `Accounts` DISABLE KEYS */;
/*!40000 ALTER TABLE `Accounts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Articles`
--

DROP TABLE IF EXISTS `Articles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Articles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `reference` varchar(255) DEFAULT NULL,
  `designation` varchar(255) DEFAULT '',
  `qReel` float DEFAULT NULL,
  `qTheorique` float DEFAULT NULL,
  `qPerime` float DEFAULT NULL,
  `qMin` float DEFAULT '0',
  `taxe` float DEFAULT '0.2',
  `prixAchat` float DEFAULT '0',
  `prixUnitaire` float DEFAULT '0',
  `unite` enum('unité','m','m2','m3','l','g','kg','ton') DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `FamilleReference` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `reference` (`reference`),
  UNIQUE KEY `Articles_reference_unique` (`reference`),
  KEY `FamilleReference` (`FamilleReference`),
  CONSTRAINT `Articles_ibfk_1` FOREIGN KEY (`FamilleReference`) REFERENCES `Familles` (`reference`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Articles`
--

LOCK TABLES `Articles` WRITE;
/*!40000 ALTER TABLE `Articles` DISABLE KEYS */;
INSERT INTO `Articles` VALUES (1,'A001','ARTICLE 001',13457,-12,0,0,0.2,500,120,'unité','2017-05-21 12:53:42','2017-06-18 15:29:27','FM001');
/*!40000 ALTER TABLE `Articles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Banques`
--

DROP TABLE IF EXISTS `Banques`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Banques` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `reference` varchar(255) DEFAULT NULL,
  `nom` varchar(255) DEFAULT NULL,
  `swift` varchar(255) DEFAULT NULL,
  `telephone` varchar(255) DEFAULT NULL,
  `addresse` varchar(255) DEFAULT NULL,
  `fax` varchar(255) DEFAULT NULL,
  `representant` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `SocieteId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `SocieteId` (`SocieteId`),
  CONSTRAINT `Banques_ibfk_1` FOREIGN KEY (`SocieteId`) REFERENCES `Societes` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Banques`
--

LOCK TABLES `Banques` WRITE;
/*!40000 ALTER TABLE `Banques` DISABLE KEYS */;
/*!40000 ALTER TABLE `Banques` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Caisses`
--

DROP TABLE IF EXISTS `Caisses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Caisses` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `libelle` varchar(255) DEFAULT NULL,
  `debit` float DEFAULT NULL,
  `credit` float DEFAULT NULL,
  `balance` float DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Caisses`
--

LOCK TABLES `Caisses` WRITE;
/*!40000 ALTER TABLE `Caisses` DISABLE KEYS */;
INSERT INTO `Caisses` VALUES (1,'<a style=\'color:white;\' ui-sref=\"pmgmt.reglement({id:\'1\'})\">Réglement effectué avec référence RA1 [espéces]</a>',10000,0,-10000,'2017-05-20 23:00:00','2017-05-21 22:51:26','2017-05-21 22:51:26'),(2,'<a style=\'color:white;\' ui-sref=\"pmgmt.reglement({id:\'2\'})\">Réglement effectué avec référence RA2 [chéques]</a>',1000000,0,-1010000,'2017-05-20 23:00:00','2017-05-21 22:52:24','2017-05-21 22:52:24'),(3,'<a style=\'color:white;\' ui-sref=\"pmgmt.reglement({id:\'5\'})\">Réglement effectué avec référence RA5 [chéques]</a>',0,0,-1010000,'2017-05-20 23:00:00','2017-05-22 00:16:13','2017-05-22 00:16:13'),(4,'<a style=\'color:white;\' ui-sref=\"smgmt.reglement({id:\'6\'})\">Réglement effectué avec référence RE6 [espéces]</a>',0,120,-1009880,'2017-05-23 00:00:00','2017-05-23 21:59:44','2017-05-23 21:59:44'),(5,'<a style=\'color:white;\' ui-sref=\"pmgmt.reglement({id:\'7\'})\">Réglement effectué avec référence RA7 [chéques]</a>',1000,0,-1010880,'2017-06-14 00:00:00','2017-06-14 23:14:12','2017-06-14 23:14:12');
/*!40000 ALTER TABLE `Caisses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `CategorieCharges`
--

DROP TABLE IF EXISTS `CategorieCharges`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `CategorieCharges` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `CategorieCharges`
--

LOCK TABLES `CategorieCharges` WRITE;
/*!40000 ALTER TABLE `CategorieCharges` DISABLE KEYS */;
/*!40000 ALTER TABLE `CategorieCharges` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Charges`
--

DROP TABLE IF EXISTS `Charges`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Charges` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(255) DEFAULT NULL,
  `montant` float DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `paiement` varchar(255) DEFAULT NULL,
  `chequeno` varchar(255) DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `CategorieChargeId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `CategorieChargeId` (`CategorieChargeId`),
  CONSTRAINT `Charges_ibfk_1` FOREIGN KEY (`CategorieChargeId`) REFERENCES `CategorieCharges` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Charges`
--

LOCK TABLES `Charges` WRITE;
/*!40000 ALTER TABLE `Charges` DISABLE KEYS */;
/*!40000 ALTER TABLE `Charges` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Clients`
--

DROP TABLE IF EXISTS `Clients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Clients` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `reference` varchar(255) DEFAULT NULL,
  `nom` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `tel` varchar(255) DEFAULT NULL,
  `fax` varchar(255) DEFAULT NULL,
  `representant` varchar(255) DEFAULT NULL,
  `solde` float DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `reference` (`reference`),
  UNIQUE KEY `Clients_reference_unique` (`reference`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Clients`
--

LOCK TABLES `Clients` WRITE;
/*!40000 ALTER TABLE `Clients` DISABLE KEYS */;
INSERT INTO `Clients` VALUES (1,'CL001','CL 001',NULL,NULL,NULL,NULL,NULL,'2017-05-23 21:49:10','2017-05-23 21:49:10'),(2,'CL002','CL002',NULL,NULL,NULL,NULL,NULL,'2017-06-18 15:28:54','2017-06-18 15:28:54');
/*!40000 ALTER TABLE `Clients` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `CommandeAchats`
--

DROP TABLE IF EXISTS `CommandeAchats`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `CommandeAchats` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `reference` varchar(255) DEFAULT NULL,
  `notes` varchar(255) DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `etat` varchar(255) DEFAULT NULL,
  `facturee` tinyint(1) DEFAULT NULL,
  `livree` tinyint(1) DEFAULT NULL,
  `payee` tinyint(1) DEFAULT NULL,
  `somme` float DEFAULT NULL,
  `paiement` varchar(255) DEFAULT NULL,
  `chequeno` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `FournisseurId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `reference` (`reference`),
  UNIQUE KEY `CommandeAchats_reference_unique` (`reference`),
  KEY `FournisseurId` (`FournisseurId`),
  CONSTRAINT `CommandeAchats_ibfk_1` FOREIGN KEY (`FournisseurId`) REFERENCES `Fournisseurs` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `CommandeAchats`
--

LOCK TABLES `CommandeAchats` WRITE;
/*!40000 ALTER TABLE `CommandeAchats` DISABLE KEYS */;
INSERT INTO `CommandeAchats` VALUES (1,'CA1',NULL,'2017-05-20 23:00:00','en stock',0,1,NULL,100000,NULL,NULL,'2017-05-21 12:59:00','2017-05-21 13:34:33',1),(2,'CA2',NULL,'2017-05-20 23:00:00','en stock',0,1,NULL,10000,NULL,NULL,'2017-05-21 13:09:22','2017-05-21 13:33:47',1),(3,'CA3',NULL,'2017-05-20 23:00:00','en stock',0,1,NULL,20000,NULL,NULL,'2017-05-21 13:10:32','2017-05-21 13:32:40',2),(4,'CA4',NULL,'2017-05-20 23:00:00','en stock',0,1,NULL,200000,NULL,NULL,'2017-05-21 13:20:36','2017-05-21 13:21:03',1),(5,'CA5',NULL,'2017-05-20 23:00:00','en stock',1,1,NULL,3000000,NULL,NULL,'2017-05-21 13:38:21','2017-05-21 22:19:54',NULL),(6,'CA6',NULL,'2017-05-20 23:00:00','en stock',1,1,NULL,50000,NULL,NULL,'2017-05-21 13:39:12','2017-05-21 14:22:53',2),(7,'CA7',NULL,'2017-05-20 23:00:00','en stock',1,1,NULL,250000,NULL,NULL,'2017-05-21 19:47:29','2017-05-21 22:10:41',2),(8,'CA8',NULL,'2017-05-20 23:00:00','en stock',1,1,NULL,500,NULL,NULL,'2017-05-21 19:50:12','2017-05-21 19:58:46',2),(9,'CA9',NULL,'2017-05-20 23:00:00','en stock',1,1,NULL,500,NULL,NULL,'2017-05-21 20:55:07','2017-05-21 22:03:51',2),(10,'CA10',NULL,'2017-04-30 23:00:00','en stock',1,1,NULL,5000,NULL,NULL,'2017-05-21 23:02:46','2017-05-21 23:35:20',2),(11,'CA11',NULL,'2017-06-14 00:00:00','en stock',0,1,NULL,500,NULL,NULL,'2017-06-14 21:12:04','2017-06-14 21:37:02',2),(12,'CA12',NULL,'2017-06-14 00:00:00','en stock',0,1,NULL,500,NULL,NULL,'2017-06-14 21:34:15','2017-06-14 21:35:35',1),(13,'CA13',NULL,'2017-06-15 00:00:00','en stock',0,1,NULL,2000,NULL,NULL,'2017-06-14 21:38:17','2017-06-14 21:40:01',2);
/*!40000 ALTER TABLE `CommandeAchats` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `CommandeFabrications`
--

DROP TABLE IF EXISTS `CommandeFabrications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `CommandeFabrications` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `reference` varchar(255) DEFAULT NULL,
  `notes` varchar(255) DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `quantite` int(11) DEFAULT NULL,
  `etat` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `ArticleId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `reference` (`reference`),
  UNIQUE KEY `CommandeFabrications_reference_unique` (`reference`),
  KEY `ArticleId` (`ArticleId`),
  CONSTRAINT `CommandeFabrications_ibfk_1` FOREIGN KEY (`ArticleId`) REFERENCES `Articles` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `CommandeFabrications`
--

LOCK TABLES `CommandeFabrications` WRITE;
/*!40000 ALTER TABLE `CommandeFabrications` DISABLE KEYS */;
/*!40000 ALTER TABLE `CommandeFabrications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `CommandeVentes`
--

DROP TABLE IF EXISTS `CommandeVentes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `CommandeVentes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `reference` varchar(255) DEFAULT NULL,
  `referenceExt` varchar(255) DEFAULT NULL,
  `signature` tinyint(1) DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `sommeHT` float DEFAULT NULL,
  `tva` float DEFAULT NULL,
  `somme` float DEFAULT NULL,
  `taxe` float DEFAULT NULL,
  `avance` float DEFAULT '0',
  `acceptee` tinyint(1) DEFAULT NULL,
  `paiement` varchar(255) DEFAULT NULL,
  `chequeno` varchar(255) DEFAULT NULL,
  `notes` varchar(255) DEFAULT NULL,
  `livree` tinyint(1) DEFAULT NULL,
  `facturee` tinyint(1) DEFAULT NULL,
  `dateLivree` datetime DEFAULT NULL,
  `dateFacturee` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `ClientId` int(11) DEFAULT NULL,
  `FactureId` int(11) DEFAULT NULL,
  `LivraisonVenteId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `ClientId` (`ClientId`),
  KEY `FactureId` (`FactureId`),
  KEY `LivraisonVenteId` (`LivraisonVenteId`),
  CONSTRAINT `CommandeVentes_ibfk_1` FOREIGN KEY (`ClientId`) REFERENCES `Clients` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `CommandeVentes_ibfk_2` FOREIGN KEY (`FactureId`) REFERENCES `Factures` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `CommandeVentes_ibfk_3` FOREIGN KEY (`LivraisonVenteId`) REFERENCES `LivraisonVentes` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `CommandeVentes`
--

LOCK TABLES `CommandeVentes` WRITE;
/*!40000 ALTER TABLE `CommandeVentes` DISABLE KEYS */;
INSERT INTO `CommandeVentes` VALUES (1,'CV1','cv11',NULL,'2017-05-23 00:00:00',100,20,120,0.2,0,1,'espéces','0','',1,1,NULL,NULL,'2017-05-23 21:51:17','2017-05-23 21:57:08',1,1,1);
/*!40000 ALTER TABLE `CommandeVentes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Devis`
--

DROP TABLE IF EXISTS `Devis`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Devis` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `reference` varchar(255) DEFAULT NULL,
  `signature` tinyint(1) DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `sommeHT` float DEFAULT NULL,
  `tva` float DEFAULT NULL,
  `somme` float DEFAULT NULL,
  `taxe` float DEFAULT NULL,
  `avance` float DEFAULT '0',
  `acceptee` tinyint(1) DEFAULT NULL,
  `paiement` varchar(255) DEFAULT NULL,
  `chequeno` varchar(255) DEFAULT NULL,
  `notes` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `ClientId` int(11) DEFAULT NULL,
  `CommandeVenteId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `ClientId` (`ClientId`),
  KEY `CommandeVenteId` (`CommandeVenteId`),
  CONSTRAINT `Devis_ibfk_1` FOREIGN KEY (`ClientId`) REFERENCES `Clients` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `Devis_ibfk_2` FOREIGN KEY (`CommandeVenteId`) REFERENCES `CommandeVentes` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Devis`
--

LOCK TABLES `Devis` WRITE;
/*!40000 ALTER TABLE `Devis` DISABLE KEYS */;
INSERT INTO `Devis` VALUES (1,'DV1',NULL,'2017-05-23 00:00:00',100,20,120,0.2,0,1,'espéces','','','2017-05-23 21:50:07','2017-05-23 21:51:17',1,1);
/*!40000 ALTER TABLE `Devis` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Exercices`
--

DROP TABLE IF EXISTS `Exercices`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Exercices` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `reference` varchar(255) DEFAULT NULL,
  `libelle` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `debutPeriod` datetime DEFAULT NULL,
  `finPeriod` datetime DEFAULT NULL,
  `anneeFiscale` int(11) DEFAULT NULL,
  `balance` float DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `SocieteId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `SocieteId` (`SocieteId`),
  CONSTRAINT `Exercices_ibfk_1` FOREIGN KEY (`SocieteId`) REFERENCES `Societes` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Exercices`
--

LOCK TABLES `Exercices` WRITE;
/*!40000 ALTER TABLE `Exercices` DISABLE KEYS */;
/*!40000 ALTER TABLE `Exercices` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `FactureAchats`
--

DROP TABLE IF EXISTS `FactureAchats`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `FactureAchats` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `reference` varchar(255) DEFAULT NULL,
  `notes` varchar(255) DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `payee` tinyint(1) DEFAULT NULL,
  `signature` tinyint(1) DEFAULT NULL,
  `sommeHT` float DEFAULT NULL,
  `tva` float DEFAULT NULL,
  `somme` float DEFAULT NULL,
  `avance` float DEFAULT '0',
  `taxe` float DEFAULT NULL,
  `paiement` varchar(255) DEFAULT NULL,
  `chequeno` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `FournisseurId` int(11) DEFAULT NULL,
  `CommandeAchatId` int(11) DEFAULT NULL,
  `ReglementId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `reference` (`reference`),
  UNIQUE KEY `FactureAchats_reference_unique` (`reference`),
  KEY `FournisseurId` (`FournisseurId`),
  KEY `CommandeAchatId` (`CommandeAchatId`),
  KEY `ReglementId` (`ReglementId`),
  CONSTRAINT `FactureAchats_ibfk_1` FOREIGN KEY (`FournisseurId`) REFERENCES `Fournisseurs` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `FactureAchats_ibfk_2` FOREIGN KEY (`CommandeAchatId`) REFERENCES `CommandeAchats` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `FactureAchats_ibfk_3` FOREIGN KEY (`ReglementId`) REFERENCES `Reglements` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `FactureAchats`
--

LOCK TABLES `FactureAchats` WRITE;
/*!40000 ALTER TABLE `FactureAchats` DISABLE KEYS */;
INSERT INTO `FactureAchats` VALUES (1,'FA1',NULL,'2017-05-20 23:00:00',NULL,NULL,NULL,NULL,500000,0,0.2,'espéces',NULL,'2017-05-21 14:22:53','2017-05-21 14:22:53',2,6,NULL),(2,'FA2',NULL,'2017-05-20 23:00:00',NULL,NULL,NULL,NULL,500,0,NULL,'chéques','1212121','2017-05-21 14:25:38','2017-05-21 14:25:38',2,NULL,NULL),(3,'FA3',NULL,'2017-05-20 23:00:00',NULL,NULL,NULL,NULL,500,0,0.2,'espéces',NULL,'2017-05-21 14:27:47','2017-05-21 14:27:47',2,NULL,NULL),(4,'FA4',NULL,'2017-05-20 23:00:00',NULL,NULL,NULL,NULL,500,0,NULL,'espéces',NULL,'2017-05-21 19:58:14','2017-05-21 19:58:14',2,NULL,NULL),(5,'FA5',NULL,'2017-05-20 23:00:00',NULL,NULL,NULL,NULL,500,0,0.2,'espéces',NULL,'2017-05-21 19:58:45','2017-05-21 19:58:45',2,8,NULL),(6,'FA6',NULL,'2017-05-20 23:00:00',NULL,NULL,NULL,NULL,500,0,0.2,'espéces',NULL,'2017-05-21 20:03:44','2017-05-21 20:03:44',2,NULL,NULL),(7,'FA7',NULL,'2017-05-20 23:00:00',NULL,NULL,NULL,NULL,500,0,0.2,'espéces',NULL,'2017-05-21 20:08:06','2017-05-21 20:08:06',2,NULL,NULL),(8,'FA8',NULL,'2017-05-20 23:00:00',NULL,NULL,NULL,NULL,500,0,NULL,'chéques','1201210120120120012012','2017-05-21 20:29:39','2017-05-21 20:29:39',2,NULL,NULL),(9,'FA9',NULL,'2017-05-20 23:00:00',0,NULL,NULL,NULL,250000,0,NULL,NULL,NULL,'2017-05-21 20:43:00','2017-05-21 20:43:00',2,7,NULL),(10,'FA10',NULL,'2017-05-20 23:00:00',0,NULL,NULL,NULL,500,0,NULL,NULL,NULL,'2017-05-21 20:50:33','2017-05-21 20:50:33',2,8,NULL),(11,'FA11',NULL,'2017-05-20 23:00:00',0,NULL,NULL,NULL,250000,0,NULL,NULL,NULL,'2017-05-21 20:51:19','2017-05-21 20:51:19',2,7,NULL),(12,'FA12',NULL,'2017-05-20 23:00:00',0,NULL,NULL,NULL,500,0,NULL,NULL,NULL,'2017-05-21 22:00:06','2017-05-21 22:00:06',2,9,NULL),(13,'FA13',NULL,'2017-05-20 23:00:00',0,NULL,NULL,NULL,500,0,NULL,NULL,NULL,'2017-05-21 22:03:51','2017-05-21 22:03:51',2,9,NULL),(14,'FA14',NULL,'2017-05-20 23:00:00',0,NULL,NULL,NULL,250000,0,NULL,NULL,NULL,'2017-05-21 22:10:01','2017-05-21 22:10:01',2,7,NULL),(15,'FA15',NULL,'2017-05-20 23:00:00',0,NULL,NULL,NULL,250000,0,NULL,NULL,NULL,'2017-05-21 22:10:41','2017-05-21 22:10:41',2,7,NULL),(16,'FA16',NULL,'2017-05-20 23:00:00',0,NULL,NULL,NULL,3000000,0,NULL,NULL,NULL,'2017-05-21 22:19:54','2017-05-21 22:19:54',NULL,5,NULL),(17,'FA17',NULL,'2017-04-30 23:00:00',0,NULL,NULL,NULL,5000,0,NULL,NULL,NULL,'2017-05-21 23:35:20','2017-05-21 23:35:20',2,10,NULL);
/*!40000 ALTER TABLE `FactureAchats` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Factures`
--

DROP TABLE IF EXISTS `Factures`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Factures` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `reference` varchar(255) DEFAULT NULL,
  `payee` tinyint(1) DEFAULT NULL,
  `signature` tinyint(1) DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `sommeHT` float DEFAULT NULL,
  `tva` float DEFAULT NULL,
  `somme` float DEFAULT NULL,
  `avance` float DEFAULT '0',
  `taxe` float DEFAULT NULL,
  `acceptee` tinyint(1) DEFAULT NULL,
  `paiement` varchar(255) DEFAULT NULL,
  `chequeno` varchar(255) DEFAULT NULL,
  `notes` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `ClientId` int(11) DEFAULT NULL,
  `ReglementId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `ClientId` (`ClientId`),
  KEY `ReglementId` (`ReglementId`),
  CONSTRAINT `Factures_ibfk_1` FOREIGN KEY (`ClientId`) REFERENCES `Clients` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `Factures_ibfk_2` FOREIGN KEY (`ReglementId`) REFERENCES `Reglements` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Factures`
--

LOCK TABLES `Factures` WRITE;
/*!40000 ALTER TABLE `Factures` DISABLE KEYS */;
INSERT INTO `Factures` VALUES (1,'FA1',1,NULL,'2017-05-23 00:00:00',100,20,120,0,0.2,1,'espéces',NULL,'Facture 1','2017-05-23 21:57:08','2017-05-23 21:59:44',1,6);
/*!40000 ALTER TABLE `Factures` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Familles`
--

DROP TABLE IF EXISTS `Familles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Familles` (
  `reference` varchar(255) NOT NULL DEFAULT '',
  `designation` varchar(255) DEFAULT '',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`reference`),
  UNIQUE KEY `reference` (`reference`),
  UNIQUE KEY `Familles_reference_unique` (`reference`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Familles`
--

LOCK TABLES `Familles` WRITE;
/*!40000 ALTER TABLE `Familles` DISABLE KEYS */;
INSERT INTO `Familles` VALUES ('FM001','FAMILLE 001','2017-05-21 12:52:42','2017-05-21 12:52:42');
/*!40000 ALTER TABLE `Familles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Fournisseurs`
--

DROP TABLE IF EXISTS `Fournisseurs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Fournisseurs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `reference` varchar(255) DEFAULT NULL,
  `nom` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `tel` varchar(255) DEFAULT NULL,
  `fax` varchar(255) DEFAULT NULL,
  `representant` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `reference` (`reference`),
  UNIQUE KEY `Fournisseurs_reference_unique` (`reference`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Fournisseurs`
--

LOCK TABLES `Fournisseurs` WRITE;
/*!40000 ALTER TABLE `Fournisseurs` DISABLE KEYS */;
INSERT INTO `Fournisseurs` VALUES (1,'FR001','Company X','a@g.com','0528838379','0528838379','Ahmed','2017-05-21 12:56:08','2017-05-21 12:56:08'),(2,'FR002','Company Y1','','','','ahmed','2017-05-21 13:10:01','2017-06-14 23:24:27');
/*!40000 ALTER TABLE `Fournisseurs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `LigneCommandes`
--

DROP TABLE IF EXISTS `LigneCommandes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `LigneCommandes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `description` varchar(255) DEFAULT NULL,
  `quantite` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `CommandeAchatId` int(11) DEFAULT NULL,
  `FactureAchatId` int(11) DEFAULT NULL,
  `ArticleId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `CommandeAchatId` (`CommandeAchatId`),
  KEY `FactureAchatId` (`FactureAchatId`),
  KEY `ArticleId` (`ArticleId`),
  CONSTRAINT `LigneCommandes_ibfk_1` FOREIGN KEY (`CommandeAchatId`) REFERENCES `CommandeAchats` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `LigneCommandes_ibfk_2` FOREIGN KEY (`FactureAchatId`) REFERENCES `FactureAchats` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `LigneCommandes_ibfk_3` FOREIGN KEY (`ArticleId`) REFERENCES `Articles` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `LigneCommandes`
--

LOCK TABLES `LigneCommandes` WRITE;
/*!40000 ALTER TABLE `LigneCommandes` DISABLE KEYS */;
INSERT INTO `LigneCommandes` VALUES (1,'----','1000','2017-05-21 12:59:00','2017-05-21 13:34:33',1,NULL,1),(2,'----','100','2017-05-21 13:09:22','2017-05-21 13:33:47',2,NULL,1),(3,'----','200','2017-05-21 13:10:32','2017-05-21 13:32:40',3,NULL,1),(4,'----','1000','2017-05-21 13:20:36','2017-05-21 13:21:03',4,NULL,1),(5,'----','6000','2017-05-21 13:38:21','2017-05-21 13:38:29',5,NULL,1),(6,'----','100','2017-05-21 13:39:12','2017-05-21 13:39:28',6,NULL,1),(7,'----','1','2017-05-21 14:25:39','2017-05-21 14:25:39',NULL,2,1),(8,'----','1','2017-05-21 14:27:47','2017-05-21 14:27:47',NULL,3,1),(9,'----','500','2017-05-21 19:47:29','2017-05-21 19:47:29',7,NULL,1),(10,'----','1','2017-05-21 19:50:12','2017-05-21 19:50:12',8,NULL,1),(11,'----','1','2017-05-21 19:58:14','2017-05-21 19:58:14',NULL,4,1),(12,'----','1','2017-05-21 20:03:44','2017-05-21 20:03:44',NULL,6,1),(13,'----','1','2017-05-21 20:08:06','2017-05-21 20:08:06',NULL,7,1),(14,'----','1','2017-05-21 20:29:39','2017-05-21 20:29:39',NULL,8,1),(15,'----','1','2017-05-21 20:55:07','2017-05-21 20:55:07',9,NULL,1),(16,'----','1','2017-05-21 22:03:51','2017-05-21 22:03:51',NULL,13,1),(17,'----','500','2017-05-21 22:10:01','2017-05-21 22:10:01',NULL,14,1),(18,'----','500','2017-05-21 22:10:41','2017-05-21 22:10:41',NULL,15,1),(19,'----','6000','2017-05-21 22:19:54','2017-05-21 22:19:54',NULL,16,1),(21,'coool-','10','2017-05-21 23:21:03','2017-05-21 23:21:03',10,NULL,1),(22,'coool-','10','2017-05-21 23:35:20','2017-05-21 23:35:20',NULL,17,1),(23,'----','1','2017-06-14 21:36:54','2017-06-14 21:36:54',11,NULL,1),(24,'----','1','2017-06-14 21:34:15','2017-06-14 21:34:15',12,NULL,1),(25,'----','4','2017-06-14 21:39:39','2017-06-14 21:39:39',13,NULL,1);
/*!40000 ALTER TABLE `LigneCommandes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `LigneFabrications`
--

DROP TABLE IF EXISTS `LigneFabrications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `LigneFabrications` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `description` varchar(255) DEFAULT NULL,
  `quantite` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `CommandeFabricationId` int(11) DEFAULT NULL,
  `ArticleId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `CommandeFabricationId` (`CommandeFabricationId`),
  KEY `ArticleId` (`ArticleId`),
  CONSTRAINT `LigneFabrications_ibfk_1` FOREIGN KEY (`CommandeFabricationId`) REFERENCES `CommandeFabrications` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `LigneFabrications_ibfk_2` FOREIGN KEY (`ArticleId`) REFERENCES `Articles` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `LigneFabrications`
--

LOCK TABLES `LigneFabrications` WRITE;
/*!40000 ALTER TABLE `LigneFabrications` DISABLE KEYS */;
/*!40000 ALTER TABLE `LigneFabrications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `LigneJournalAchats`
--

DROP TABLE IF EXISTS `LigneJournalAchats`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `LigneJournalAchats` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `libelle` varchar(255) DEFAULT NULL,
  `debit` float DEFAULT NULL,
  `credit` float DEFAULT NULL,
  `balance` float DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `ExerciceId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `ExerciceId` (`ExerciceId`),
  CONSTRAINT `LigneJournalAchats_ibfk_1` FOREIGN KEY (`ExerciceId`) REFERENCES `Exercices` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `LigneJournalAchats`
--

LOCK TABLES `LigneJournalAchats` WRITE;
/*!40000 ALTER TABLE `LigneJournalAchats` DISABLE KEYS */;
INSERT INTO `LigneJournalAchats` VALUES (1,'<a style=\'color:white;\' ui-sref=\"pmgmt.delivery({id:\'1\'})\">Bon Achat avec référence BL1</a>',200000,0,200000,'2017-05-20 23:00:00','2017-05-21 13:15:38','2017-05-21 13:15:38',NULL),(2,'<a style=\'color:white;\' ui-sref=\"pmgmt.delivery({id:\'2\'})\">Bon Achat avec référence BL2</a>',200000,0,400000,'2017-05-20 23:00:00','2017-05-21 13:21:03','2017-05-21 13:21:03',NULL),(3,'<a style=\'color:white;\' ui-sref=\"pmgmt.delivery({id:\'3\'})\">Bon Achat avec référence BL3</a>',525000,0,925000,'2017-05-20 23:00:00','2017-05-21 13:26:03','2017-05-21 13:26:03',NULL),(4,'<a style=\'color:white;\' ui-sref=\"pmgmt.delivery({id:\'4\'})\">Bon Achat avec référence BL4</a>',100000,0,1025000,'2017-05-20 23:00:00','2017-05-21 13:32:40','2017-05-21 13:32:40',NULL),(5,'<a style=\'color:white;\' ui-sref=\"pmgmt.delivery({id:\'5\'})\">Bon Achat avec référence BL5</a>',50000,0,1075000,'2017-05-20 23:00:00','2017-05-21 13:33:47','2017-05-21 13:33:47',NULL),(6,'<a style=\'color:white;\' ui-sref=\"pmgmt.delivery({id:\'6\'})\">Bon Achat avec référence BL6</a>',500000,0,1575000,'2017-05-20 23:00:00','2017-05-21 13:34:26','2017-05-21 13:34:26',NULL),(7,'<a style=\'color:white;\' ui-sref=\"pmgmt.delivery({id:\'7\'})\">Bon Achat avec référence BL7</a>',500000,0,2075000,'2017-05-20 23:00:00','2017-05-21 13:34:33','2017-05-21 13:34:33',NULL),(8,'<a style=\'color:white;\' ui-sref=\"pmgmt.delivery({id:\'8\'})\">Bon Achat avec référence BL8</a>',3000000,0,5075000,'2017-05-20 23:00:00','2017-05-21 13:38:29','2017-05-21 13:38:29',NULL),(9,'<a style=\'color:white;\' ui-sref=\"pmgmt.delivery({id:\'9\'})\">Bon Achat avec référence BL9</a>',50000,0,5125000,'2017-05-20 23:00:00','2017-05-21 13:39:28','2017-05-21 13:39:28',NULL),(10,'<a style=\'color:white;\' ui-sref=\"pmgmt.delivery({id:\'10\'})\">Bon Achat avec référence BL10</a>',250000,0,5375000,'2017-05-20 23:00:00','2017-05-21 19:47:46','2017-05-21 19:47:46',NULL),(11,'<a style=\'color:white;\' ui-sref=\"pmgmt.delivery({id:\'11\'})\">Bon Achat avec référence BL11</a>',500,0,5375500,'2017-05-20 23:00:00','2017-05-21 19:50:17','2017-05-21 19:50:17',NULL),(12,'<a style=\'color:white;\' ui-sref=\"pmgmt.delivery({id:\'12\'})\">Bon Achat avec référence BL12</a>',500,0,5376000,'2017-05-20 23:00:00','2017-05-21 21:59:57','2017-05-21 21:59:57',NULL),(13,'<a style=\'color:white;\' ui-sref=\"pmgmt.delivery({id:\'13\'})\">Bon Achat avec référence BL13</a>',250000,0,5626000,'2017-05-20 23:00:00','2017-05-21 22:10:36','2017-05-21 22:10:36',NULL),(14,'<a style=\'color:white;\' ui-sref=\"pmgmt.reglement({id:\'1\'})\">Réglement effectué avec référence RA1 [espéces]</a>',0,10000,5616000,'2017-05-20 23:00:00','2017-05-21 22:51:26','2017-05-21 22:51:26',NULL),(15,'<a style=\'color:white;\' ui-sref=\"pmgmt.reglement({id:\'2\'})\">Réglement effectué avec référence RA2 [chéques]</a>',0,1000000,4616000,'2017-05-20 23:00:00','2017-05-21 22:52:24','2017-05-21 22:52:24',NULL),(16,'<a style=\'color:white;\' ui-sref=\"pmgmt.delivery({id:\'14\'})\">Bon Achat avec référence BL14</a>',5000,0,4621000,'2017-04-30 23:00:00','2017-05-21 23:32:39','2017-05-21 23:32:39',NULL),(17,'<a style=\'color:white;\' ui-sref=\"pmgmt.delivery({id:\'15\'})\">Bon Achat avec référence BL15</a>',500,0,4621500,'2017-05-20 23:00:00','2017-05-21 23:42:38','2017-05-21 23:42:38',NULL),(18,'<a style=\'color:white;\' ui-sref=\"pmgmt.reglement({id:\'5\'})\">Réglement effectué avec référence RA5 [chéques]</a>',0,0,4621500,'2017-05-20 23:00:00','2017-05-22 00:16:13','2017-05-22 00:16:14',NULL),(19,'<a style=\'color:white;\' ui-sref=\"pmgmt.delivery({id:\'16\'})\">Bon Achat avec référence BL16</a>',500,0,4622000,'2017-06-14 00:00:00','2017-06-14 21:35:35','2017-06-14 21:35:35',NULL),(20,'<a style=\'color:white;\' ui-sref=\"pmgmt.delivery({id:\'17\'})\">Bon Achat avec référence BL17</a>',500,0,4622500,'2017-06-14 00:00:00','2017-06-14 21:37:02','2017-06-14 21:37:02',NULL),(21,'<a style=\'color:white;\' ui-sref=\"pmgmt.delivery({id:\'18\'})\">Bon Achat avec référence BL18</a>',2000,0,4624500,'2017-06-15 00:00:00','2017-06-14 21:40:01','2017-06-14 21:40:01',NULL),(22,'<a style=\'color:white;\' ui-sref=\"pmgmt.reglement({id:\'7\'})\">Réglement effectué avec référence RA7 [chéques]</a>',0,1000,4623500,'2017-06-14 00:00:00','2017-06-14 23:14:12','2017-06-14 23:14:12',NULL);
/*!40000 ALTER TABLE `LigneJournalAchats` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `LigneJournalClients`
--

DROP TABLE IF EXISTS `LigneJournalClients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `LigneJournalClients` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `libelle` varchar(255) DEFAULT NULL,
  `debit` float DEFAULT NULL,
  `credit` float DEFAULT NULL,
  `balance` float DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `ExerciceId` int(11) DEFAULT NULL,
  `ClientId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `ExerciceId` (`ExerciceId`),
  KEY `ClientId` (`ClientId`),
  CONSTRAINT `LigneJournalClients_ibfk_1` FOREIGN KEY (`ExerciceId`) REFERENCES `Exercices` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `LigneJournalClients_ibfk_2` FOREIGN KEY (`ClientId`) REFERENCES `Clients` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `LigneJournalClients`
--

LOCK TABLES `LigneJournalClients` WRITE;
/*!40000 ALTER TABLE `LigneJournalClients` DISABLE KEYS */;
INSERT INTO `LigneJournalClients` VALUES (1,'<a ui-sref=\"smgmt.delivery({id:\'1\'})\">Bon de livraison envoyé BL1</a>',120,0,-120,'2017-05-23 00:00:00','2017-05-23 21:55:46','2017-05-23 21:55:46',NULL,1),(2,'<a style=\'color:white;\' ui-sref=\"smgmt.reglement({id:\'6\'})\">Réglement effectué avec référence RE6 [espéces]</a>',0,120,0,'2017-05-23 00:00:00','2017-05-23 21:59:44','2017-05-23 21:59:44',NULL,1),(3,'<a ui-sref=\"smgmt.delivery({id:\'2\'})\">Bon de livraison envoyé BL2</a>',1200,0,-1200,'2017-06-14 00:00:00','2017-06-14 22:59:53','2017-06-14 22:59:53',NULL,1),(4,'<a ui-sref=\"smgmt.delivery({id:\'3\'})\">Bon de livraison envoyé BL3</a>',120,0,-120,'2017-06-18 00:00:00','2017-06-18 15:29:27','2017-06-18 15:29:27',NULL,2);
/*!40000 ALTER TABLE `LigneJournalClients` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `LigneJournalFournisseurs`
--

DROP TABLE IF EXISTS `LigneJournalFournisseurs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `LigneJournalFournisseurs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `libelle` varchar(255) DEFAULT NULL,
  `debit` float DEFAULT NULL,
  `credit` float DEFAULT NULL,
  `balance` float DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `ExerciceId` int(11) DEFAULT NULL,
  `FournisseurId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `ExerciceId` (`ExerciceId`),
  KEY `FournisseurId` (`FournisseurId`),
  CONSTRAINT `LigneJournalFournisseurs_ibfk_1` FOREIGN KEY (`ExerciceId`) REFERENCES `Exercices` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `LigneJournalFournisseurs_ibfk_2` FOREIGN KEY (`FournisseurId`) REFERENCES `Fournisseurs` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `LigneJournalFournisseurs`
--

LOCK TABLES `LigneJournalFournisseurs` WRITE;
/*!40000 ALTER TABLE `LigneJournalFournisseurs` DISABLE KEYS */;
INSERT INTO `LigneJournalFournisseurs` VALUES (1,'<a style=\'color:white;\' ui-sref=\"pmgmt.delivery({id:\'1\'})\">Bon Achat avec référence BL1</a>',200000,0,200000,'2017-05-20 23:00:00','2017-05-21 13:15:38','2017-05-21 13:15:38',NULL,2),(2,'<a style=\'color:white;\' ui-sref=\"pmgmt.delivery({id:\'2\'})\">Bon Achat avec référence BL2</a>',200000,0,200000,'2017-05-20 23:00:00','2017-05-21 13:21:03','2017-05-21 13:21:03',NULL,1),(3,'<a style=\'color:white;\' ui-sref=\"pmgmt.delivery({id:\'3\'})\">Bon Achat avec référence BL3</a>',525000,0,725000,'2017-05-20 23:00:00','2017-05-21 13:26:03','2017-05-21 13:26:03',NULL,2),(4,'<a style=\'color:white;\' ui-sref=\"pmgmt.delivery({id:\'4\'})\">Bon Achat avec référence BL4</a>',100000,0,825000,'2017-05-20 23:00:00','2017-05-21 13:32:40','2017-05-21 13:32:40',NULL,2),(5,'<a style=\'color:white;\' ui-sref=\"pmgmt.delivery({id:\'5\'})\">Bon Achat avec référence BL5</a>',50000,0,250000,'2017-05-20 23:00:00','2017-05-21 13:33:47','2017-05-21 13:33:47',NULL,1),(6,'<a style=\'color:white;\' ui-sref=\"pmgmt.delivery({id:\'6\'})\">Bon Achat avec référence BL6</a>',500000,0,750000,'2017-05-20 23:00:00','2017-05-21 13:34:26','2017-05-21 13:34:26',NULL,1),(7,'<a style=\'color:white;\' ui-sref=\"pmgmt.delivery({id:\'7\'})\">Bon Achat avec référence BL7</a>',500000,0,1250000,'2017-05-20 23:00:00','2017-05-21 13:34:33','2017-05-21 13:34:33',NULL,1),(8,'<a style=\'color:white;\' ui-sref=\"pmgmt.delivery({id:\'9\'})\">Bon Achat avec référence BL9</a>',50000,0,875000,'2017-05-20 23:00:00','2017-05-21 13:39:28','2017-05-21 13:39:28',NULL,2),(9,'<a style=\'color:white;\' ui-sref=\"pmgmt.delivery({id:\'10\'})\">Bon Achat avec référence BL10</a>',250000,0,1125000,'2017-05-20 23:00:00','2017-05-21 19:47:46','2017-05-21 19:47:46',NULL,2),(10,'<a style=\'color:white;\' ui-sref=\"pmgmt.delivery({id:\'11\'})\">Bon Achat avec référence BL11</a>',500,0,1125500,'2017-05-20 23:00:00','2017-05-21 19:50:17','2017-05-21 19:50:17',NULL,2),(11,'<a style=\'color:white;\' ui-sref=\"pmgmt.delivery({id:\'12\'})\">Bon Achat avec référence BL12</a>',500,0,1126000,'2017-05-20 23:00:00','2017-05-21 21:59:57','2017-05-21 21:59:57',NULL,2),(12,'<a style=\'color:white;\' ui-sref=\"pmgmt.delivery({id:\'13\'})\">Bon Achat avec référence BL13</a>',250000,0,1376000,'2017-05-20 23:00:00','2017-05-21 22:10:36','2017-05-21 22:10:36',NULL,2),(13,'<a style=\'color:white;\' ui-sref=\"pmgmt.reglement({id:\'1\'})\">Réglement effectué avec référence RA1 [espéces]</a>',0,10000,1366000,'2017-05-20 23:00:00','2017-05-21 22:51:26','2017-05-21 22:51:26',NULL,2),(14,'<a style=\'color:white;\' ui-sref=\"pmgmt.reglement({id:\'2\'})\">Réglement effectué avec référence RA2 [chéques]</a>',0,1000000,366000,'2017-05-20 23:00:00','2017-05-21 22:52:24','2017-05-21 22:52:24',NULL,2),(15,'<a style=\'color:white;\' ui-sref=\"pmgmt.delivery({id:\'14\'})\">Bon Achat avec référence BL14</a>',5000,0,371000,'2017-04-30 23:00:00','2017-05-21 23:32:39','2017-05-21 23:32:39',NULL,2),(16,'<a style=\'color:white;\' ui-sref=\"pmgmt.delivery({id:\'15\'})\">Bon Achat avec référence BL15</a>',500,0,371500,'2017-05-20 23:00:00','2017-05-21 23:42:38','2017-05-21 23:42:38',NULL,2),(17,'<a ui-sref=\"smgmt.reglement({id:\'3\'})\">Réglement effectué avec référence RA3 [chéques]</a>',0,500,371000,NULL,'2017-05-22 00:09:29','2017-05-22 00:09:29',NULL,2),(18,'<a ui-sref=\"smgmt.reglement({id:\'4\'})\">Réglement effectué avec référence RA4 [chéques]</a>',0,5000,366000,'2017-04-30 23:00:00','2017-05-22 00:12:40','2017-05-22 00:12:40',NULL,2),(19,'<a style=\'color:white;\' ui-sref=\"pmgmt.reglement({id:\'5\'})\">Réglement effectué avec référence RA5 [chéques]</a>',0,0,366000,'2017-05-20 23:00:00','2017-05-22 00:16:13','2017-05-22 00:16:13',NULL,2),(20,'<a style=\'color:white;\' ui-sref=\"pmgmt.delivery({id:\'16\'})\">Bon Achat avec référence BL16</a>',500,0,1250500,'2017-06-14 00:00:00','2017-06-14 21:35:35','2017-06-14 21:35:35',NULL,1),(21,'<a style=\'color:white;\' ui-sref=\"pmgmt.delivery({id:\'17\'})\">Bon Achat avec référence BL17</a>',500,0,366500,'2017-06-14 00:00:00','2017-06-14 21:37:02','2017-06-14 21:37:02',NULL,2),(22,'<a style=\'color:white;\' ui-sref=\"pmgmt.delivery({id:\'18\'})\">Bon Achat avec référence BL18</a>',2000,0,368500,'2017-06-15 00:00:00','2017-06-14 21:40:01','2017-06-14 21:40:02',NULL,2),(23,'<a style=\'color:white;\' ui-sref=\"pmgmt.reglement({id:\'7\'})\">Réglement effectué avec référence RA7 [chéques]</a>',0,1000,367500,'2017-06-14 00:00:00','2017-06-14 23:14:12','2017-06-14 23:14:12',NULL,2);
/*!40000 ALTER TABLE `LigneJournalFournisseurs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `LigneJournalVentes`
--

DROP TABLE IF EXISTS `LigneJournalVentes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `LigneJournalVentes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `libelle` varchar(255) DEFAULT NULL,
  `debit` float DEFAULT NULL,
  `credit` float DEFAULT NULL,
  `balance` float DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `ExerciceId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `ExerciceId` (`ExerciceId`),
  CONSTRAINT `LigneJournalVentes_ibfk_1` FOREIGN KEY (`ExerciceId`) REFERENCES `Exercices` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `LigneJournalVentes`
--

LOCK TABLES `LigneJournalVentes` WRITE;
/*!40000 ALTER TABLE `LigneJournalVentes` DISABLE KEYS */;
INSERT INTO `LigneJournalVentes` VALUES (1,'<a ui-sref=\"smgmt.delivery({id:\'1\'})\">Bon de livraison envoyé BL1</a>',120,0,-120,'2017-05-23 00:00:00','2017-05-23 21:55:46','2017-05-23 21:55:46',NULL),(2,'<a style=\'color:white;\' ui-sref=\"smgmt.reglement({id:\'6\'})\">Réglement effectué avec référence RE6 [espéces]</a>',0,120,0,'2017-05-23 00:00:00','2017-05-23 21:59:44','2017-05-23 21:59:45',NULL),(3,'<a ui-sref=\"smgmt.delivery({id:\'2\'})\">Bon de livraison envoyé BL2</a>',1200,0,-1200,'2017-06-14 00:00:00','2017-06-14 22:59:53','2017-06-14 22:59:53',NULL),(4,'<a ui-sref=\"smgmt.delivery({id:\'3\'})\">Bon de livraison envoyé BL3</a>',120,0,-1320,'2017-06-18 00:00:00','2017-06-18 15:29:27','2017-06-18 15:29:27',NULL);
/*!40000 ALTER TABLE `LigneJournalVentes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `LigneLivraisonAchats`
--

DROP TABLE IF EXISTS `LigneLivraisonAchats`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `LigneLivraisonAchats` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `description` varchar(255) DEFAULT NULL,
  `quantite` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `ArticleId` int(11) DEFAULT NULL,
  `LivraisonAchatId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `ArticleId` (`ArticleId`),
  KEY `LivraisonAchatId` (`LivraisonAchatId`),
  CONSTRAINT `LigneLivraisonAchats_ibfk_1` FOREIGN KEY (`ArticleId`) REFERENCES `Articles` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `LigneLivraisonAchats_ibfk_2` FOREIGN KEY (`LivraisonAchatId`) REFERENCES `LivraisonAchats` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `LigneLivraisonAchats`
--

LOCK TABLES `LigneLivraisonAchats` WRITE;
/*!40000 ALTER TABLE `LigneLivraisonAchats` DISABLE KEYS */;
INSERT INTO `LigneLivraisonAchats` VALUES (1,'----','1000','2017-05-21 13:15:38','2017-05-21 13:15:38',1,1),(2,'----','1050','2017-05-21 13:26:03','2017-05-21 13:26:03',1,3),(9,'----','500','2017-05-21 19:47:46','2017-05-21 19:47:46',1,10),(10,'----','1','2017-05-21 19:50:17','2017-05-21 19:50:17',1,11),(15,'----','1','2017-05-21 21:59:57','2017-05-21 21:59:57',1,12),(21,'coool-','10','2017-05-21 23:32:39','2017-05-21 23:32:39',1,14),(22,'----','1','2017-05-21 23:42:38','2017-05-21 23:42:38',1,15),(23,'----','1','2017-06-14 21:37:02','2017-06-14 21:37:02',1,17),(24,'----','1','2017-06-14 21:35:35','2017-06-14 21:35:35',1,16),(25,'----','4','2017-06-14 21:40:01','2017-06-14 21:40:01',1,18);
/*!40000 ALTER TABLE `LigneLivraisonAchats` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `LigneVentes`
--

DROP TABLE IF EXISTS `LigneVentes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `LigneVentes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `quantite` float DEFAULT NULL,
  `prixUnitaire` float DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `CommandeVenteId` int(11) DEFAULT NULL,
  `DeviId` int(11) DEFAULT NULL,
  `FactureId` int(11) DEFAULT NULL,
  `ArticleId` int(11) DEFAULT NULL,
  `LivraisonVenteId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `CommandeVenteId` (`CommandeVenteId`),
  KEY `DeviId` (`DeviId`),
  KEY `FactureId` (`FactureId`),
  KEY `ArticleId` (`ArticleId`),
  KEY `LivraisonVenteId` (`LivraisonVenteId`),
  CONSTRAINT `LigneVentes_ibfk_1` FOREIGN KEY (`CommandeVenteId`) REFERENCES `CommandeVentes` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `LigneVentes_ibfk_2` FOREIGN KEY (`DeviId`) REFERENCES `Devis` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `LigneVentes_ibfk_3` FOREIGN KEY (`FactureId`) REFERENCES `Factures` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `LigneVentes_ibfk_4` FOREIGN KEY (`ArticleId`) REFERENCES `Articles` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `LigneVentes_ibfk_5` FOREIGN KEY (`LivraisonVenteId`) REFERENCES `LivraisonVentes` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `LigneVentes`
--

LOCK TABLES `LigneVentes` WRITE;
/*!40000 ALTER TABLE `LigneVentes` DISABLE KEYS */;
INSERT INTO `LigneVentes` VALUES (1,1,120,'2017-05-23 21:50:07','2017-05-23 21:50:07',NULL,1,NULL,1,NULL),(2,1,120,'2017-05-23 21:54:43','2017-05-23 21:54:43',1,NULL,NULL,1,NULL),(3,1,120,'2017-05-23 21:55:47','2017-05-23 21:55:47',NULL,NULL,NULL,1,1),(4,1,120,'2017-05-23 21:57:08','2017-05-23 21:57:08',NULL,NULL,1,1,NULL),(5,10,120,'2017-06-14 22:59:53','2017-06-14 22:59:53',NULL,NULL,NULL,1,2),(6,1,120,'2017-06-18 15:29:27','2017-06-18 15:29:27',NULL,NULL,NULL,1,3);
/*!40000 ALTER TABLE `LigneVentes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `LivraisonAchats`
--

DROP TABLE IF EXISTS `LivraisonAchats`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `LivraisonAchats` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `reference` varchar(255) DEFAULT NULL,
  `notes` varchar(255) DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `signature` tinyint(1) DEFAULT NULL,
  `sommeHT` float DEFAULT NULL,
  `tva` float DEFAULT NULL,
  `somme` float DEFAULT NULL,
  `taxe` float DEFAULT NULL,
  `avance` float DEFAULT '0',
  `payee` tinyint(1) DEFAULT NULL,
  `datePayee` datetime DEFAULT NULL,
  `paiement` varchar(255) DEFAULT NULL,
  `chequeno` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `FournisseurId` int(11) DEFAULT NULL,
  `CommandeAchatId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `reference` (`reference`),
  UNIQUE KEY `LivraisonAchats_reference_unique` (`reference`),
  KEY `FournisseurId` (`FournisseurId`),
  KEY `CommandeAchatId` (`CommandeAchatId`),
  CONSTRAINT `LivraisonAchats_ibfk_1` FOREIGN KEY (`FournisseurId`) REFERENCES `Fournisseurs` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `LivraisonAchats_ibfk_2` FOREIGN KEY (`CommandeAchatId`) REFERENCES `CommandeAchats` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `LivraisonAchats`
--

LOCK TABLES `LivraisonAchats` WRITE;
/*!40000 ALTER TABLE `LivraisonAchats` DISABLE KEYS */;
INSERT INTO `LivraisonAchats` VALUES (1,'BL1',NULL,'2017-05-20 23:00:00',NULL,NULL,NULL,200000,0.2,0,0,NULL,NULL,NULL,'2017-05-21 13:15:38','2017-05-21 13:15:38',2,NULL),(2,'BL2',NULL,'2017-05-20 23:00:00',NULL,NULL,NULL,200000,NULL,0,NULL,NULL,NULL,NULL,'2017-05-21 13:21:03','2017-05-21 13:21:03',1,4),(3,'BL3',NULL,'2017-05-20 23:00:00',NULL,NULL,NULL,525000,0.2,0,0,NULL,NULL,NULL,'2017-05-21 13:26:03','2017-05-21 13:26:03',2,NULL),(4,'BL4',NULL,'2017-05-20 23:00:00',NULL,NULL,NULL,100000,NULL,0,0,NULL,NULL,NULL,'2017-05-21 13:32:40','2017-05-21 13:32:40',2,3),(5,'BL5',NULL,'2017-05-20 23:00:00',NULL,NULL,NULL,50000,NULL,0,0,NULL,NULL,NULL,'2017-05-21 13:33:46','2017-05-21 13:33:46',1,2),(6,'BL6',NULL,'2017-05-20 23:00:00',NULL,NULL,NULL,500000,NULL,0,0,NULL,NULL,NULL,'2017-05-21 13:34:26','2017-05-21 13:34:26',1,1),(7,'BL7',NULL,'2017-05-20 23:00:00',NULL,NULL,NULL,500000,NULL,0,0,NULL,NULL,NULL,'2017-05-21 13:34:33','2017-05-21 13:34:33',1,1),(8,'BL8',NULL,'2017-05-20 23:00:00',NULL,NULL,NULL,3000000,NULL,0,0,NULL,NULL,NULL,'2017-05-21 13:38:29','2017-05-21 13:38:29',NULL,5),(9,'BL9',NULL,'2017-05-20 23:00:00',NULL,NULL,NULL,50000,NULL,0,0,NULL,NULL,NULL,'2017-05-21 13:39:28','2017-05-21 13:39:28',2,6),(10,'BL10',NULL,'2017-05-20 23:00:00',NULL,NULL,NULL,250000,NULL,0,0,NULL,NULL,NULL,'2017-05-21 19:47:46','2017-05-21 19:47:46',2,7),(11,'BL11',NULL,'2017-05-20 23:00:00',NULL,NULL,NULL,500,NULL,0,0,NULL,NULL,NULL,'2017-05-21 19:50:17','2017-05-21 19:50:17',2,8),(12,'BL12',NULL,'2017-05-20 23:00:00',NULL,NULL,NULL,500,NULL,0,0,NULL,NULL,NULL,'2017-05-21 21:59:57','2017-05-21 21:59:57',2,9),(13,'BL13',NULL,'2017-05-20 23:00:00',NULL,NULL,NULL,250000,NULL,0,1,NULL,NULL,NULL,'2017-05-21 22:10:36','2017-05-22 00:16:13',2,7),(14,'BL14',NULL,'2017-04-30 23:00:00',NULL,NULL,NULL,5000,NULL,0,1,NULL,NULL,NULL,'2017-05-21 23:32:39','2017-05-22 00:12:40',2,10),(15,'BL15',NULL,'2017-05-20 23:00:00',NULL,NULL,NULL,500,NULL,0,1,NULL,NULL,NULL,'2017-05-21 23:42:38','2017-05-22 00:09:29',2,NULL),(16,'BL16',NULL,'2017-06-14 00:00:00',NULL,NULL,NULL,500,NULL,0,0,NULL,NULL,NULL,'2017-06-14 21:35:35','2017-06-14 21:35:35',1,12),(17,'BL17',NULL,'2017-06-14 00:00:00',NULL,NULL,NULL,500,NULL,0,0,NULL,NULL,NULL,'2017-06-14 21:37:02','2017-06-14 21:37:02',2,11),(18,'BL18',NULL,'2017-06-15 00:00:00',NULL,NULL,NULL,2000,NULL,0,0,NULL,NULL,NULL,'2017-06-14 21:40:01','2017-06-14 21:40:01',2,13);
/*!40000 ALTER TABLE `LivraisonAchats` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `LivraisonVentes`
--

DROP TABLE IF EXISTS `LivraisonVentes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `LivraisonVentes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `reference` varchar(255) DEFAULT NULL,
  `signature` tinyint(1) DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `sommeHT` float DEFAULT NULL,
  `tva` float DEFAULT NULL,
  `somme` float DEFAULT NULL,
  `taxe` float DEFAULT NULL,
  `avance` float DEFAULT '0',
  `acceptee` tinyint(1) DEFAULT NULL,
  `payee` tinyint(1) DEFAULT NULL,
  `datePayee` datetime DEFAULT NULL,
  `paiement` varchar(255) DEFAULT NULL,
  `chequeno` varchar(255) DEFAULT NULL,
  `notes` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `ClientId` int(11) DEFAULT NULL,
  `ReglementId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `ClientId` (`ClientId`),
  KEY `ReglementId` (`ReglementId`),
  CONSTRAINT `LivraisonVentes_ibfk_1` FOREIGN KEY (`ClientId`) REFERENCES `Clients` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `LivraisonVentes_ibfk_2` FOREIGN KEY (`ReglementId`) REFERENCES `Reglements` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `LivraisonVentes`
--

LOCK TABLES `LivraisonVentes` WRITE;
/*!40000 ALTER TABLE `LivraisonVentes` DISABLE KEYS */;
INSERT INTO `LivraisonVentes` VALUES (1,'BL1',NULL,'2017-05-23 00:00:00',100,20,120,0.2,0,1,NULL,NULL,'espéces',NULL,'','2017-05-23 21:55:46','2017-05-23 21:55:46',1,NULL),(2,'BL2',NULL,'2017-06-14 00:00:00',1000,200,1200,0.2,0,NULL,0,NULL,'espéces','','','2017-06-14 22:59:53','2017-06-14 22:59:53',1,NULL),(3,'BL3',NULL,'2017-06-18 00:00:00',100,20,120,0.2,0,NULL,0,NULL,'espéces','','','2017-06-18 15:29:27','2017-06-18 15:29:27',2,NULL);
/*!40000 ALTER TABLE `LivraisonVentes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Movements`
--

DROP TABLE IF EXISTS `Movements`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Movements` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `reference` varchar(255) DEFAULT NULL,
  `type` enum('entrée','sortie') DEFAULT NULL,
  `quantite` float DEFAULT '0',
  `prixAchat` float DEFAULT '0',
  `libelle` varchar(255) DEFAULT '',
  `cause` enum('autre','périmé','vente','achat') DEFAULT NULL,
  `prixUnitaire` float DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `ArticleId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `ArticleId` (`ArticleId`),
  CONSTRAINT `Movements_ibfk_1` FOREIGN KEY (`ArticleId`) REFERENCES `Articles` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Movements`
--

LOCK TABLES `Movements` WRITE;
/*!40000 ALTER TABLE `Movements` DISABLE KEYS */;
INSERT INTO `Movements` VALUES (1,'','entrée',1000,100,'Achat','achat',120,'2017-05-21 12:54:30','2017-05-21 12:54:30',1),(2,NULL,'entrée',1000,200,'',NULL,0,'2017-05-21 13:15:39','2017-05-21 13:15:39',1),(3,NULL,'entrée',1000,200,'',NULL,0,'2017-05-21 13:21:03','2017-05-21 13:21:03',1),(4,NULL,'entrée',1050,500,'',NULL,0,'2017-05-21 13:26:03','2017-05-21 13:26:03',1),(5,NULL,'entrée',200,500,'',NULL,0,'2017-05-21 13:32:40','2017-05-21 13:32:40',1),(6,NULL,'entrée',100,500,'',NULL,0,'2017-05-21 13:33:47','2017-05-21 13:33:47',1),(7,NULL,'entrée',1000,500,'',NULL,0,'2017-05-21 13:34:26','2017-05-21 13:34:26',1),(8,NULL,'entrée',1000,500,'',NULL,0,'2017-05-21 13:34:33','2017-05-21 13:34:33',1),(9,NULL,'entrée',6000,500,'',NULL,0,'2017-05-21 13:38:29','2017-05-21 13:38:29',1),(10,NULL,'entrée',100,500,'',NULL,0,'2017-05-21 13:39:28','2017-05-21 13:39:28',1),(11,NULL,'entrée',500,500,'',NULL,0,'2017-05-21 19:47:46','2017-05-21 19:47:46',1),(12,NULL,'entrée',1,500,'',NULL,0,'2017-05-21 19:50:17','2017-05-21 19:50:17',1),(13,NULL,'entrée',1,500,'',NULL,0,'2017-05-21 21:59:57','2017-05-21 21:59:57',1),(14,NULL,'entrée',500,500,'',NULL,0,'2017-05-21 22:10:36','2017-05-21 22:10:36',1),(15,NULL,'entrée',10,500,'',NULL,0,'2017-05-21 23:32:39','2017-05-21 23:32:39',1),(16,NULL,'entrée',1,500,'',NULL,0,'2017-05-21 23:42:38','2017-05-21 23:42:38',1),(17,NULL,'sortie',1,0,'',NULL,0,'2017-05-23 21:55:47','2017-05-23 21:55:47',1),(18,NULL,'entrée',1,500,'',NULL,0,'2017-06-14 21:35:35','2017-06-14 21:35:35',1),(19,NULL,'entrée',1,500,'',NULL,0,'2017-06-14 21:37:02','2017-06-14 21:37:02',1),(20,NULL,'entrée',4,500,'',NULL,0,'2017-06-14 21:40:01','2017-06-14 21:40:01',1),(21,NULL,'sortie',10,0,'',NULL,0,'2017-06-14 22:59:53','2017-06-14 22:59:53',1),(22,NULL,'sortie',1,0,'',NULL,0,'2017-06-18 15:29:27','2017-06-18 15:29:27',1);
/*!40000 ALTER TABLE `Movements` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Reglements`
--

DROP TABLE IF EXISTS `Reglements`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Reglements` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `reference` varchar(255) DEFAULT NULL,
  `signature` tinyint(1) DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `sommeHT` float DEFAULT NULL,
  `tva` float DEFAULT NULL,
  `somme` float DEFAULT NULL,
  `taxe` float DEFAULT NULL,
  `avance` float DEFAULT '0',
  `acceptee` tinyint(1) DEFAULT NULL,
  `paiement` varchar(255) DEFAULT NULL,
  `chequeno` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `notes` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `CaisseId` int(11) DEFAULT NULL,
  `LigneJournalAchatId` int(11) DEFAULT NULL,
  `LigneJournalClientId` int(11) DEFAULT NULL,
  `LigneJournalFournisseurId` int(11) DEFAULT NULL,
  `LigneJournalVenteId` int(11) DEFAULT NULL,
  `ClientId` int(11) DEFAULT NULL,
  `FournisseurId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `CaisseId` (`CaisseId`),
  KEY `LigneJournalAchatId` (`LigneJournalAchatId`),
  KEY `LigneJournalClientId` (`LigneJournalClientId`),
  KEY `LigneJournalFournisseurId` (`LigneJournalFournisseurId`),
  KEY `LigneJournalVenteId` (`LigneJournalVenteId`),
  KEY `ClientId` (`ClientId`),
  KEY `FournisseurId` (`FournisseurId`),
  CONSTRAINT `Reglements_ibfk_1` FOREIGN KEY (`CaisseId`) REFERENCES `Caisses` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `Reglements_ibfk_2` FOREIGN KEY (`LigneJournalAchatId`) REFERENCES `LigneJournalAchats` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `Reglements_ibfk_3` FOREIGN KEY (`LigneJournalClientId`) REFERENCES `LigneJournalClients` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `Reglements_ibfk_4` FOREIGN KEY (`LigneJournalFournisseurId`) REFERENCES `LigneJournalFournisseurs` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `Reglements_ibfk_5` FOREIGN KEY (`LigneJournalVenteId`) REFERENCES `LigneJournalVentes` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `Reglements_ibfk_6` FOREIGN KEY (`ClientId`) REFERENCES `Clients` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `Reglements_ibfk_7` FOREIGN KEY (`FournisseurId`) REFERENCES `Fournisseurs` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Reglements`
--

LOCK TABLES `Reglements` WRITE;
/*!40000 ALTER TABLE `Reglements` DISABLE KEYS */;
INSERT INTO `Reglements` VALUES (1,'RA1',NULL,'2017-05-20 23:00:00',NULL,NULL,10000,NULL,0,NULL,'espéces',NULL,'achat',NULL,'2017-05-21 22:51:26','2017-05-21 22:51:26',NULL,NULL,NULL,NULL,NULL,NULL,2),(2,'RA2',NULL,'2017-05-20 23:00:00',NULL,NULL,1000000,NULL,0,NULL,'chéques','12121212121212','achat','sdsd','2017-05-21 22:52:24','2017-05-21 22:52:24',NULL,NULL,NULL,NULL,NULL,NULL,2),(3,'RA3',NULL,NULL,NULL,NULL,500,NULL,0,NULL,'chéques','010101010100101010',NULL,NULL,'2017-05-22 00:09:29','2017-05-22 00:09:29',NULL,NULL,NULL,NULL,NULL,NULL,2),(4,'RA4',NULL,'2017-04-30 23:00:00',NULL,NULL,5000,NULL,0,NULL,'chéques','101010101010',NULL,NULL,'2017-05-22 00:12:40','2017-05-22 00:12:40',NULL,NULL,NULL,NULL,NULL,NULL,2),(5,'RA5',NULL,'2017-05-20 23:00:00',NULL,NULL,0,NULL,0,NULL,'chéques','121212121','achat',NULL,'2017-05-22 00:16:13','2017-05-22 00:16:13',NULL,NULL,NULL,NULL,NULL,NULL,2),(6,'RE6',NULL,'2017-05-23 00:00:00',100,20,120,0.2,0,1,'espéces',NULL,'vente','','2017-05-23 21:59:44','2017-05-23 21:59:44',NULL,NULL,NULL,NULL,NULL,1,NULL),(7,'RA7',NULL,'2017-06-14 00:00:00',NULL,NULL,1000,0.2,0,NULL,'chéques','12121211111111100','achat',NULL,'2017-06-14 23:14:12','2017-06-14 23:14:12',NULL,NULL,NULL,NULL,NULL,NULL,2);
/*!40000 ALTER TABLE `Reglements` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Societes`
--

DROP TABLE IF EXISTS `Societes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Societes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `reference` varchar(255) DEFAULT NULL,
  `raisonSociale` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `monnaie` varchar(255) DEFAULT NULL,
  `addresse` varchar(255) DEFAULT NULL,
  `codePostal` varchar(255) DEFAULT NULL,
  `ville` varchar(255) DEFAULT NULL,
  `pays` varchar(255) DEFAULT NULL,
  `capital` float DEFAULT NULL,
  `siret` varchar(255) DEFAULT NULL,
  `taxe` float DEFAULT NULL,
  `logo` text,
  `rc` varchar(255) DEFAULT NULL,
  `patente` varchar(255) DEFAULT NULL,
  `codeBanque` varchar(255) DEFAULT NULL,
  `identiteFiscale` varchar(255) DEFAULT NULL,
  `cnss` varchar(255) DEFAULT NULL,
  `ice` varchar(255) DEFAULT NULL,
  `tel1` varchar(255) DEFAULT NULL,
  `tel2` varchar(255) DEFAULT NULL,
  `tel3` varchar(255) DEFAULT NULL,
  `email1` varchar(255) DEFAULT NULL,
  `email2` varchar(255) DEFAULT NULL,
  `footer` text,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Societes`
--

LOCK TABLES `Societes` WRITE;
/*!40000 ALTER TABLE `Societes` DISABLE KEYS */;
INSERT INTO `Societes` VALUES (1,NULL,'FakeCompany',NULL,'dh','Addresse 001','01010','agadir','maroc',1010,'00010100',0.2,'data:image/png;base64,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','101110','111001','1110101111001','0011','0011','001437356000021','0525252258','22522','22222','a@g.com','b@g.com','Sté FakeCompany, Addresse 001<br>R.C : 101110-Patente111001-CNSS : 0011I.F : 0011 - C.B : 1110101111001ICE : 001437356000021<br>Tél undefined/undefined/NaN<br> Email undefined','2017-05-21 12:52:15','2017-05-21 12:52:15');
/*!40000 ALTER TABLE `Societes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `firstName` varchar(255) DEFAULT NULL,
  `lastName` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `isAdmin` tinyint(1) NOT NULL,
  `salt` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `Users_username_unique` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
INSERT INTO `Users` VALUES (1,'admin',NULL,NULL,NULL,'admin',1,NULL,'2017-05-21 12:50:07','2017-05-21 12:50:07');
/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-06-18 19:45:06
