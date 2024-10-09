SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Create `fcjresbar` database
--
CREATE DATABASE IF NOT EXISTS `fcjresbar`;
USE `fcjresbar`;

-- --------------------------------------------------------

--
-- Create and define schema of `Categories` table
--

DROP TABLE IF EXISTS `Categories`;
CREATE TABLE IF NOT EXISTS `Categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

--
-- Insert data into `Categories` table
--

INSERT INTO `Categories` (`id`, `name`, `createdAt`, `updatedAt`)
VALUES
  (1, 'CERVEZAS', '2021-08-23 05:50:50', '2021-08-23 05:50:50'),
  (2, 'GASEOSAS', '2021-08-23 05:50:50', '2021-08-23 05:50:50'),
  (3, 'PIZZAS', '2021-08-23 05:50:50', '2021-08-23 05:50:50'),
  (4, 'HAMBURGUESAS', '2021-08-23 05:50:50', '2021-08-23 05:50:50'),
  (5, 'EMPANADAS', '2021-08-23 05:50:50', '2021-08-23 05:50:50'),
  (6, 'LOMITOS', '2021-08-23 05:50:50', '2021-08-23 05:50:50');

-- --------------------------------------------------------

--
-- Create and define schema of `Clients` table
--

DROP TABLE IF EXISTS `Clients`;
CREATE TABLE IF NOT EXISTS `Clients` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL DEFAULT 'Address',
  `phone` varchar(255) NOT NULL DEFAULT '999999999',
  `email` varchar(255) NOT NULL,
  `dni` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `dni` (`dni`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

--
-- Insert data into`Clients` table
--

INSERT INTO `Clients` (`id`, `name`, `address`, `phone`, `email`, `dni`, `createdAt`, `updatedAt`)
VALUES
  (1, 'Nguyen Anh Tuan', 'Bien Hoa, Dong Nai', '0123456789', 'tuna@example.com', '999999999', '2024-10-07 05:50:51', '2024-10-07 21:34:51'),
  (2, 'Tu Nhat Phuong', 'Bien Hoa, Dong Nai', '0143486720', 'fromsunnews@example.com', '111118291', '2024-10-07 07:20:30', '2024-10-07 21:36:51'),
  (3, 'Thai Anh Duc', 'Phu My, Ba Ria', '0324125123', 'duckie@example.com', '125123145', '2024-10-07 12:21:22', '2024-10-07 21:37:12'),
  (4, 'Ly Hoang Viet', 'Nhon Trach, Dong Nai', '0293192412', 'viethoang@example.com', '090122341', '2024-10-07 15:11:09', '2024-10-07 21:40:32');

-- --------------------------------------------------------

--
-- Create and define schema of `OrderProducts` table
--

DROP TABLE IF EXISTS `OrderProducts`;
CREATE TABLE IF NOT EXISTS `OrderProducts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `quantity` int(11) DEFAULT NULL,
  `orderId` int(11) NOT NULL,
  `productId` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `orderId` (`orderId`),
  KEY `productId` (`productId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Insert data into `Orders` table
--

DROP TABLE IF EXISTS `Orders`;
CREATE TABLE IF NOT EXISTS `Orders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `total` double NOT NULL,
  `isPaid` tinyint(1) NOT NULL DEFAULT '0',
  `delivery` tinyint(1) NOT NULL DEFAULT '0',
  `note` varchar(255) DEFAULT NULL,
  `userId` int(11) NOT NULL,
  `clientId` int(11) NOT NULL,
  `tableId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `clientId` (`clientId`),
  KEY `tableId` (`tableId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Create and define schema of `Products` table
--

DROP TABLE IF EXISTS `Products`;
CREATE TABLE IF NOT EXISTS `Products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `price` double NOT NULL,
  `stock` int(11) NOT NULL,
  `categoryId` int(11) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `categoryId` (`categoryId`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

--
-- Insert data into `Products` table
--

INSERT INTO `Products` (`id`, `name`, `price`, `stock`, `categoryId`, `createdAt`, `updatedAt`)
VALUES
  (1, 'HAMBRUGUESA CHICA', 120, 50, 4, '2024-10-07 05:50:51', '2024-10-07 05:50:51'),
  (2, 'HAMBRUGUESA GRANDE', 180, 70, 4, '2024-10-07 05:50:52', '2024-10-07 05:50:55'),
  (3, 'COCA COLA 3LTS', 180, 70, 2, '2024-10-07 05:50:53', '2024-10-07 05:50:56'),
  (4, 'COCA COLA 1.5LTS', 180, 70, 2, '2024-10-07 05:50:54', '2024-10-07 05:50:57');

-- --------------------------------------------------------

--
-- Create and define schema of `SequelizeMeta` table
--

DROP TABLE IF EXISTS `SequelizeMeta`;
CREATE TABLE IF NOT EXISTS `SequelizeMeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Insert data into `SequelizeMeta` table
--

INSERT INTO `SequelizeMeta` (`name`)
VALUES
  ('20210408050330-create-table.js'),
  ('20210408051244-create-client.js'),
  ('20210408052326-create-user.js'),
  ('20210408064209-create-category.js'),
  ('20210408064602-create-product.js'),
  ('20210408070645-create-order.js'),
  ('20210408071614-create-order-product.js');

-- --------------------------------------------------------

--
-- Create and define schema of `Tables` table
--

DROP TABLE IF EXISTS `Tables`;
CREATE TABLE IF NOT EXISTS `Tables` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `occupied` tinyint(1) DEFAULT '0',
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

--
-- Insert data into `Tables`
--

INSERT INTO `Tables` (`id`, `name`, `occupied`, `createdAt`, `updatedAt`)
VALUES
  (1, 'PATIO 1', 0, '2024-10-07 05:50:50', '2024-10-07 05:50:50'),
  (2, 'PATIO 2', 0, '2024-10-07 05:50:50', '2024-10-07 05:50:50'),
  (3, 'PATIO 3', 0, '2024-10-07 05:50:50', '2024-10-07 05:50:50'),
  (4, 'INTERIOR 1', 0, '2024-10-07 05:50:50', '2024-10-07 05:50:50'),
  (5, 'INTERIOR 2', 0, '2024-10-07 05:50:50', '2024-10-07 05:50:50'),
  (6, 'BARRA 1', 0, '2024-10-07 05:50:50', '2024-10-07 05:50:50');

-- --------------------------------------------------------

--
-- Create and define schema of `Users` table
--

DROP TABLE IF EXISTS `Users`;
CREATE TABLE IF NOT EXISTS `Users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL DEFAULT '/avatar.png',
  `isAdmin` tinyint(1) NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

--
-- Insert data into `Users` table
--

INSERT INTO `Users` (`id`, `name`, `email`, `password`, `image`, `isAdmin`, `createdAt`, `updatedAt`)
VALUES
  (1, 'Admin', 'admin@example.com', '$2b$10$Ob28q7LgYBCadB0mgVnPD.u8WtBVVoWs28iZTrxFF8LWuwG7xWiuO', '/avatar.png', 1, '2024-10-05 05:50:50', '2024-10-05 05:50:50'),
  (2, 'User', 'user@example.com', '$2b$10$Ob28q7LgYBCadB0mgVnPD.u8WtBVVoWs28iZTrxFF8LWuwG7xWiuO', '/avatar.png', 0, '2024-10-05 05:50:50', '2024-10-05 05:50:50');

--
-- Add some restriction
--

--
-- Update constraint for `OrderProducts` table
--
ALTER TABLE `OrderProducts`
  ADD CONSTRAINT `orderproducts_ibfk_1` FOREIGN KEY (`orderId`) REFERENCES `Orders` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `orderproducts_ibfk_2` FOREIGN KEY (`productId`) REFERENCES `Products` (`id`) ON DELETE CASCADE;

--
-- Update constraint for `Orders` table
--
ALTER TABLE `Orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `Users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`clientId`) REFERENCES `Clients` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `orders_ibfk_3` FOREIGN KEY (`tableId`) REFERENCES `Tables` (`id`) ON DELETE CASCADE;

--
-- Update constraint for `Products` table
--
ALTER TABLE `Products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`categoryId`) REFERENCES `Categories` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;