/*
 Copyright(c) 2009-2019 by GGoons.
*/
SET FOREIGN_KEY_CHECKS=0;
DROP TABLE IF EXISTS `customers`;
DROP TABLE IF EXISTS `employees`;
DROP TABLE IF EXISTS `offices`;
DROP TABLE IF EXISTS `orderdetails`;
DROP TABLE IF EXISTS `orders`;
DROP TABLE IF EXISTS `payments`;
DROP TABLE IF EXISTS `productlines`;
DROP TABLE IF EXISTS `products`;

--
-- customers
--
CREATE TABLE `customers` (
    `customerNumber` INTEGER NOT NULL,
    `customerName` VARCHAR(50) NOT NULL,
    `contactLastName` VARCHAR(50) NOT NULL,
    `contactFirstName` VARCHAR(50) NOT NULL,
    `phone` VARCHAR(50) NOT NULL,
    `addressLine1` VARCHAR(50) NOT NULL,
    `addressLine2` VARCHAR(50),
    `city` VARCHAR(50) NOT NULL,
    `state` VARCHAR(50),
    `postalCode` VARCHAR(15),
    `country` VARCHAR(50) NOT NULL,
    `salesRepEmployeeNumber` INTEGER,
    `creditLimit` DOUBLE,

    FOREIGN KEY (`salesRepEmployeeNumber`) REFERENCES `employees` (`employeeNumber`) ON DELETE CASCADE,
    PRIMARY KEY (`customerNumber`)
) AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

--
-- employees
--
CREATE TABLE `employees` (
    `employeeNumber` INTEGER NOT NULL,
    `lastName` VARCHAR(50) NOT NULL,
    `firstName` VARCHAR(50) NOT NULL,
    `extension` VARCHAR(10) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `officeCode` VARCHAR(10) NOT NULL,
    `reportsTo` INTEGER,
    `jobTitle` VARCHAR(50) NOT NULL,

    FOREIGN KEY (`reportsTo`) REFERENCES `reportsTo_employees` (`employeeNumber`) ON DELETE CASCADE,
    FOREIGN KEY (`officeCode`) REFERENCES `offices` (`officeCode`) ON DELETE CASCADE,
    PRIMARY KEY (`employeeNumber`)
) AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

--
-- offices
--
CREATE TABLE `offices` (
    `officeCode` VARCHAR(10) NOT NULL,
    `city` VARCHAR(50) NOT NULL,
    `phone` VARCHAR(50) NOT NULL,
    `addressLine1` VARCHAR(50) NOT NULL,
    `addressLine2` VARCHAR(50),
    `state` VARCHAR(50),
    `country` VARCHAR(50) NOT NULL,
    `postalCode` VARCHAR(15) NOT NULL,
    `territory` VARCHAR(10) NOT NULL,

    PRIMARY KEY (`officeCode`)
) AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

--
-- orderdetails
--
CREATE TABLE `orderdetails` (
    `orderNumber` INTEGER NOT NULL,
    `productCode` VARCHAR(15) NOT NULL,
    `quantityOrdered` INTEGER NOT NULL,
    `priceEach` DOUBLE NOT NULL,
    `orderLineNumber` SMALLINT NOT NULL,

    FOREIGN KEY (`orderNumber`) REFERENCES `orders` (`orderNumber`) ON DELETE CASCADE,
    FOREIGN KEY (`productCode`) REFERENCES `products` (`productCode`) ON DELETE CASCADE,
    PRIMARY KEY (`orderNumber`, `productCode`)
) AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

--
-- orders
--
CREATE TABLE `orders` (
    `orderNumber` INTEGER NOT NULL,
    `orderDate` DATE NOT NULL,
    `requiredDate` DATE NOT NULL,
    `shippedDate` DATE,
    `status` VARCHAR(15) NOT NULL,
    `comments` TEXT,
    `customerNumber` INTEGER NOT NULL,

    FOREIGN KEY (`customerNumber`) REFERENCES `customers` (`customerNumber`) ON DELETE CASCADE,
    PRIMARY KEY (`orderNumber`)
) AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

--
-- payments
--
CREATE TABLE `payments` (
    `customerNumber` INTEGER NOT NULL,
    `checkNumber` VARCHAR(50) NOT NULL,
    `paymentDate` DATE NOT NULL,
    `amount` DOUBLE NOT NULL,

    FOREIGN KEY (`customerNumber`) REFERENCES `customers` (`customerNumber`) ON DELETE CASCADE,
    PRIMARY KEY (`customerNumber`, `checkNumber`)
) AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

--
-- productlines
--
CREATE TABLE `productlines` (
    `productLine` VARCHAR(50) NOT NULL,
    `textDescription` TEXT,
    `htmlDescription` TEXT,
    `image` BLOB,

    PRIMARY KEY (`productLine`)
) AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

--
-- products
--
CREATE TABLE `products` (
    `productCode` VARCHAR(15) NOT NULL,
    `productName` VARCHAR(70) NOT NULL,
    `productLine` VARCHAR(50) NOT NULL,
    `productScale` VARCHAR(10) NOT NULL,
    `productVendor` VARCHAR(50) NOT NULL,
    `productDescription` TEXT NOT NULL,
    `quantityInStock` SMALLINT NOT NULL,
    `buyPrice` DOUBLE NOT NULL,
    `MSRP` DOUBLE NOT NULL,

    FOREIGN KEY (`productLine`) REFERENCES `productlines` (`productLine`) ON DELETE CASCADE,
    PRIMARY KEY (`productCode`)
) AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

SET FOREIGN_KEY_CHECKS=1;
