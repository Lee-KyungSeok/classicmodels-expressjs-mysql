/*
 Copyright(c) 2009-2019 by GGoons.
*
* 
*/
connect 'jdbc:derby:data/classicmodels;create=true';

drop table customers;
drop table employees;
drop table offices;
drop table orderdetails;
drop table orders;
drop table payments;
drop table productlines;
drop table products;

--
-- customers
--
create table customers (
    customerNumber INTEGER NOT NULL,
    customerName VARCHAR(50) NOT NULL,
    contactLastName VARCHAR(50) NOT NULL,
    contactFirstName VARCHAR(50) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    addressLine1 VARCHAR(50) NOT NULL,
    addressLine2 VARCHAR(50),
    city VARCHAR(50) NOT NULL,
    state VARCHAR(50),
    postalCode VARCHAR(15),
    country VARCHAR(50) NOT NULL,
    salesRepEmployeeNumber INTEGER,
    creditLimit DOUBLE,

    PRIMARY KEY (customerNumber)
);

--
-- employees
--
create table employees (
    employeeNumber INTEGER NOT NULL,
    lastName VARCHAR(50) NOT NULL,
    firstName VARCHAR(50) NOT NULL,
    extension VARCHAR(10) NOT NULL,
    email VARCHAR(100) NOT NULL,
    officeCode VARCHAR(10) NOT NULL,
    reportsTo INTEGER,
    jobTitle VARCHAR(50) NOT NULL,

    PRIMARY KEY (employeeNumber)
);

--
-- offices
--
create table offices (
    officeCode VARCHAR(10) NOT NULL,
    city VARCHAR(50) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    addressLine1 VARCHAR(50) NOT NULL,
    addressLine2 VARCHAR(50),
    state VARCHAR(50),
    country VARCHAR(50) NOT NULL,
    postalCode VARCHAR(15) NOT NULL,
    territory VARCHAR(10) NOT NULL,

    PRIMARY KEY (officeCode)
);

--
-- orderdetails
--
create table orderdetails (
    orderNumber INTEGER NOT NULL,
    productCode VARCHAR(15) NOT NULL,
    quantityOrdered INTEGER NOT NULL,
    priceEach DOUBLE NOT NULL,
    orderLineNumber SMALLINT NOT NULL,

    PRIMARY KEY (orderNumber, productCode)
);

--
-- orders
--
create table orders (
    orderNumber INTEGER NOT NULL,
    orderDate DATE NOT NULL,
    requiredDate DATE NOT NULL,
    shippedDate DATE,
    status VARCHAR(15) NOT NULL,
    comments LONG VARCHAR,
    customerNumber INTEGER NOT NULL,

    PRIMARY KEY (orderNumber)
);

--
-- payments
--
create table payments (
    customerNumber INTEGER NOT NULL,
    checkNumber VARCHAR(50) NOT NULL,
    paymentDate DATE NOT NULL,
    amount DOUBLE NOT NULL,

    PRIMARY KEY (customerNumber, checkNumber)
);

--
-- productlines
--
create table productlines (
    productLine VARCHAR(50) NOT NULL,
    textDescription LONG VARCHAR,
    htmlDescription LONG VARCHAR,
    image BLOB,

    PRIMARY KEY (productLine)
);

--
-- products
--
create table products (
    productCode VARCHAR(15) NOT NULL,
    productName VARCHAR(70) NOT NULL,
    productLine VARCHAR(50) NOT NULL,
    productScale VARCHAR(10) NOT NULL,
    productVendor VARCHAR(50) NOT NULL,
    productDescription LONG VARCHAR NOT NULL,
    quantityInStock SMALLINT NOT NULL,
    buyPrice DOUBLE NOT NULL,
    MSRP DOUBLE NOT NULL,

    PRIMARY KEY (productCode)
);

alter table customers add
    FOREIGN KEY (salesRepEmployeeNumber) REFERENCES employees(employeeNumber) ON DELETE CASCADE;
alter table employees add
    FOREIGN KEY (reportsTo) REFERENCES reportsTo_employees(employeeNumber) ON DELETE CASCADE;
alter table employees add
    FOREIGN KEY (officeCode) REFERENCES offices(officeCode) ON DELETE CASCADE;
alter table orderdetails add
    FOREIGN KEY (orderNumber) REFERENCES orders(orderNumber) ON DELETE CASCADE;
alter table orderdetails add
    FOREIGN KEY (productCode) REFERENCES products(productCode) ON DELETE CASCADE;
alter table orders add
    FOREIGN KEY (customerNumber) REFERENCES customers(customerNumber) ON DELETE CASCADE;
alter table payments add
    FOREIGN KEY (customerNumber) REFERENCES customers(customerNumber) ON DELETE CASCADE;
alter table products add
    FOREIGN KEY (productLine) REFERENCES productlines(productLine) ON DELETE CASCADE;
