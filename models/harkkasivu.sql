-- phpMyAdmin SQL Dump
-- version 4.8.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: 08.01.2020 klo 16:25
-- Palvelimen versio: 10.1.37-MariaDB
-- PHP Version: 7.3.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `harkkasivu`
--
CREATE DATABASE IF NOT EXISTS `harkkasivu` DEFAULT CHARACTER SET utf8 COLLATE utf8_swedish_ci;
USE `harkkasivu`;

-- --------------------------------------------------------

--
-- Rakenne taululle `blogi`
--

CREATE TABLE `blogi` (
  `id` int(11) NOT NULL,
  `otsikko` text COLLATE utf8_swedish_ci NOT NULL,
  `sisalto` text COLLATE utf8_swedish_ci NOT NULL,
  `pvm` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_swedish_ci;

--
-- Vedos taulusta `blogi`
--

INSERT INTO `blogi` (`id`, `otsikko`, `sisalto`, `pvm`) VALUES
(1, 'Tämä onkin testipostaus!', 'Tähän vaikka Lorem ipsumia:\r\n\r\n\r\nLorem ipsum\r\nLorem ipsum\r\nLorem ipsum\r\nLorem ipsum\r\nLorem ipsum\r\nLorem ipsum\r\nLorem ipsum\r\nLorem ipsum\r\nLorem ipsum\r\nLorem ipsum', '2020-01-04 13:39:55'),
(2, 'Tämäpä onkin toinen samanmoinen', '\r\nHiiohoi ja hopsikopsis \r\nHiiohoi ja hopsikopsis \r\nHiiohoi ja hopsikopsis ', '2020-01-07 19:35:24'),
(19, 'asffasafsfas', '<p>asafafsfasfas</p>', '2020-01-07 20:50:48'),
(22, 'Juuso lähtee nukkumaan', '<ol><li><strong>Voihan&nbsp;</strong><em>Perjantai</em></li><li><em>Tai&nbsp;</em><strong>Torstai</strong></li><li><strong><em>KESKIVIIKKO</em></strong></li></ol>', '2020-01-07 20:55:43'),
;

-- --------------------------------------------------------

--
-- Rakenne taululle `tunnukset`
--

CREATE TABLE `tunnukset` (
  `id` int(11) NOT NULL,
  `tunnus` varchar(12) COLLATE utf8_swedish_ci NOT NULL,
  `salasana` text COLLATE utf8_swedish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_swedish_ci;

--
-- Vedos taulusta `tunnukset`
--

INSERT INTO `tunnukset` (`id`, `tunnus`, `salasana`) VALUES
(2, 'testitunnus', '0b006251c563ea80622891f5ba2a4cd90d3fcb40bd9937541876a1effbc49293fb36e742e27365b21026afcf667770627082c81690da6aa486a6f0cddaebdeb7');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `blogi`
--
ALTER TABLE `blogi`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tunnukset`
--
ALTER TABLE `tunnukset`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `blogi`
--
ALTER TABLE `blogi`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `tunnukset`
--
ALTER TABLE `tunnukset`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
