/*
 Copyright(c) 2009-2019 by GGoons.
*/

--
-- customers
--
CREATE TABLE "customers" (
    "customerNumber" INTEGER NOT NULL,
    "customerName" VARCHAR2(50) NOT NULL,
    "contactLastName" VARCHAR2(50) NOT NULL,
    "contactFirstName" VARCHAR2(50) NOT NULL,
    "phone" VARCHAR2(50) NOT NULL,
    "addressLine1" VARCHAR2(50) NOT NULL,
    "addressLine2" VARCHAR2(50),
    "city" VARCHAR2(50) NOT NULL,
    "state" VARCHAR2(50),
    "postalCode" VARCHAR2(15),
    "country" VARCHAR2(50) NOT NULL,
    "salesRepEmployeeNumber" INTEGER,
    "creditLimit" DOUBLE,

    CONSTRAINT fk_employee
        FOREIGN KEY ("salesRepEmployeeNumber") REFERENCES "employees" ("employeeNumber"),
    CONSTRAINT customer_pk
        PRIMARY KEY ("customerNumber")
);

--
-- employees
--
CREATE TABLE "employees" (
    "employeeNumber" INTEGER NOT NULL,
    "lastName" VARCHAR2(50) NOT NULL,
    "firstName" VARCHAR2(50) NOT NULL,
    "extension" VARCHAR2(10) NOT NULL,
    "email" VARCHAR2(100) NOT NULL,
    "officeCode" VARCHAR2(10) NOT NULL,
    "reportsTo" INTEGER,
    "jobTitle" VARCHAR2(50) NOT NULL,

    CONSTRAINT fk_reportsToEmployee
        FOREIGN KEY ("reportsTo") REFERENCES "reportsTo_employees" ("employeeNumber"),
    CONSTRAINT fk_office
        FOREIGN KEY ("officeCode") REFERENCES "offices" ("officeCode"),
    CONSTRAINT employee_pk
        PRIMARY KEY ("employeeNumber")
);

--
-- offices
--
CREATE TABLE "offices" (
    "officeCode" VARCHAR2(10) NOT NULL,
    "city" VARCHAR2(50) NOT NULL,
    "phone" VARCHAR2(50) NOT NULL,
    "addressLine1" VARCHAR2(50) NOT NULL,
    "addressLine2" VARCHAR2(50),
    "state" VARCHAR2(50),
    "country" VARCHAR2(50) NOT NULL,
    "postalCode" VARCHAR2(15) NOT NULL,
    "territory" VARCHAR2(10) NOT NULL,

    CONSTRAINT office_pk
        PRIMARY KEY ("officeCode")
);

--
-- orderdetails
--
CREATE TABLE "orderdetails" (
    "orderNumber" INTEGER NOT NULL,
    "productCode" VARCHAR2(15) NOT NULL,
    "quantityOrdered" INTEGER NOT NULL,
    "priceEach" DOUBLE NOT NULL,
    "orderLineNumber" SMALLINT NOT NULL,

    CONSTRAINT fk_order
        FOREIGN KEY ("orderNumber") REFERENCES "orders" ("orderNumber"),
    CONSTRAINT fk_product
        FOREIGN KEY ("productCode") REFERENCES "products" ("productCode"),
    CONSTRAINT orderdetail_pk
        PRIMARY KEY ("orderNumber", "productCode")
);

--
-- orders
--
CREATE TABLE "orders" (
    "orderNumber" INTEGER NOT NULL,
    "orderDate" DATE NOT NULL,
    "requiredDate" DATE NOT NULL,
    "shippedDate" DATE,
    "status" VARCHAR2(15) NOT NULL,
    "comments" VARCHAR2(65535),
    "customerNumber" INTEGER NOT NULL,

    CONSTRAINT fk_customer
        FOREIGN KEY ("customerNumber") REFERENCES "customers" ("customerNumber"),
    CONSTRAINT order_pk
        PRIMARY KEY ("orderNumber")
);

--
-- payments
--
CREATE TABLE "payments" (
    "customerNumber" INTEGER NOT NULL,
    "checkNumber" VARCHAR2(50) NOT NULL,
    "paymentDate" DATE NOT NULL,
    "amount" DOUBLE NOT NULL,

    CONSTRAINT fk_customer
        FOREIGN KEY ("customerNumber") REFERENCES "customers" ("customerNumber"),
    CONSTRAINT payment_pk
        PRIMARY KEY ("customerNumber", "checkNumber")
);

--
-- productlines
--
CREATE TABLE "productlines" (
    "productLine" VARCHAR2(50) NOT NULL,
    "textDescription" VARCHAR2(4000),
    "htmlDescription" VARCHAR2(65535),
    "image" RAW,

    CONSTRAINT productline_pk
        PRIMARY KEY ("productLine")
);

--
-- products
--
CREATE TABLE "products" (
    "productCode" VARCHAR2(15) NOT NULL,
    "productName" VARCHAR2(70) NOT NULL,
    "productLine" VARCHAR2(50) NOT NULL,
    "productScale" VARCHAR2(10) NOT NULL,
    "productVendor" VARCHAR2(50) NOT NULL,
    "productDescription" VARCHAR2(65535) NOT NULL,
    "quantityInStock" SMALLINT NOT NULL,
    "buyPrice" DOUBLE NOT NULL,
    "MSRP" DOUBLE NOT NULL,

    CONSTRAINT fk_productline
        FOREIGN KEY ("productLine") REFERENCES "productlines" ("productLine"),
    CONSTRAINT product_pk
        PRIMARY KEY ("productCode")
);
