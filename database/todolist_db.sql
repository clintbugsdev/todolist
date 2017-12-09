-- --------------------------------------------------------
-- Host:                         localhost
-- Server version:               10.1.21-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win32
-- HeidiSQL Version:             9.4.0.5125
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Dumping database structure for todolist_db
CREATE DATABASE IF NOT EXISTS `todolist_db` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci */;
USE `todolist_db`;

-- Dumping structure for table todolist_db.todolist
CREATE TABLE IF NOT EXISTS `todolist` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `item` varchar(250) COLLATE utf8_unicode_ci DEFAULT NULL,
  `done` tinyint(1) DEFAULT '0',
  `date_created` datetime DEFAULT NULL,
  `date_updated` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- Dumping data for table todolist_db.todolist: ~1 rows (approximately)
DELETE FROM `todolist`;
/*!40000 ALTER TABLE `todolist` DISABLE KEYS */;
INSERT INTO `todolist` (`id`, `item`, `done`, `date_created`, `date_updated`) VALUES
	(2, 'sdfasd asdfasd', 1, '2017-12-09 16:11:51', '2017-12-09 22:07:58'),
	(3, 'yes', 0, '0000-00-00 00:00:00', '2017-12-09 16:13:24'),
	(4, 'yes', 0, '2017-12-09 09:14:48', '2017-12-09 16:14:48'),
	(5, 'yess', 1, '2017-12-09 09:15:23', '2017-12-09 22:08:02'),
	(6, 'yes', 0, '2017-12-09 16:16:34', '2017-12-09 16:16:34');
/*!40000 ALTER TABLE `todolist` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
