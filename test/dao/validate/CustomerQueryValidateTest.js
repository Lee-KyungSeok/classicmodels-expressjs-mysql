/*
 Copyright(c) 2009-2019 by GGoons.
*/
'use strict';

const assert = require('assert');
//const q = require('q');
const sinon = require('sinon');

const CustomerQueryValidator = require('../../../dao/validate/CustomerQueryValidator');
const ArrayUtils = require('../../../utils/array.utils');
const DateUtils = require('../../../utils/date.utils');
const MapUtils = require('../../../utils/map.utils');
const StringUtils = require('../../../utils/string.utils');

describe('CustomerQueryValidateTest...', () => {
    it('query key name and data should be converted', () => {
        let req = {params: {}};
        let params = req.params;
        params["customerName"] = "1";
        params["contactLastName"] = "1";
        params["contactFirstName"] = "1";
        params["phone"] = "1";
        params["addressLine1"] = "1";
        params["addressLine2"] = "1";
        params["city"] = "1";
        params["state"] = "1";
        params["postalCode"] = "1";
        params["country"] = "1";
        params["salesRepEmployeeNumber"] = 1;

        let result = CustomerQueryValidator.validate(req).params;
        let value;

        assert.ok(!result.hasOwnProperty("customerName"), 
            "expect that key 'customerName' not exists in result of validate BUT it is");
        assert.ok(result.hasOwnProperty("customers.customerName"), 
            "expect that key 'customers.customerName' exists in result of validate BUT not");
        value = result["customers.customerName"];
        assert.ok(typeof value === "string",
            "expect that datatype of the query key customers.customerName should be string BUT "+typeof value);
        assert.ok(!result.hasOwnProperty("contactLastName"), 
            "expect that key 'contactLastName' not exists in result of validate BUT it is");
        assert.ok(result.hasOwnProperty("customers.contactLastName"), 
            "expect that key 'customers.contactLastName' exists in result of validate BUT not");
        value = result["customers.contactLastName"];
        assert.ok(typeof value === "string",
            "expect that datatype of the query key customers.contactLastName should be string BUT "+typeof value);
        assert.ok(!result.hasOwnProperty("contactFirstName"), 
            "expect that key 'contactFirstName' not exists in result of validate BUT it is");
        assert.ok(result.hasOwnProperty("customers.contactFirstName"), 
            "expect that key 'customers.contactFirstName' exists in result of validate BUT not");
        value = result["customers.contactFirstName"];
        assert.ok(typeof value === "string",
            "expect that datatype of the query key customers.contactFirstName should be string BUT "+typeof value);
        assert.ok(!result.hasOwnProperty("phone"), 
            "expect that key 'phone' not exists in result of validate BUT it is");
        assert.ok(result.hasOwnProperty("customers.phone"), 
            "expect that key 'customers.phone' exists in result of validate BUT not");
        value = result["customers.phone"];
        assert.ok(typeof value === "string",
            "expect that datatype of the query key customers.phone should be string BUT "+typeof value);
        assert.ok(!result.hasOwnProperty("addressLine1"), 
            "expect that key 'addressLine1' not exists in result of validate BUT it is");
        assert.ok(result.hasOwnProperty("customers.addressLine1"), 
            "expect that key 'customers.addressLine1' exists in result of validate BUT not");
        value = result["customers.addressLine1"];
        assert.ok(typeof value === "string",
            "expect that datatype of the query key customers.addressLine1 should be string BUT "+typeof value);
        assert.ok(!result.hasOwnProperty("addressLine2"), 
            "expect that key 'addressLine2' not exists in result of validate BUT it is");
        assert.ok(result.hasOwnProperty("customers.addressLine2"), 
            "expect that key 'customers.addressLine2' exists in result of validate BUT not");
        value = result["customers.addressLine2"];
        assert.ok(typeof value === "string",
            "expect that datatype of the query key customers.addressLine2 should be string BUT "+typeof value);
        assert.ok(!result.hasOwnProperty("city"), 
            "expect that key 'city' not exists in result of validate BUT it is");
        assert.ok(result.hasOwnProperty("customers.city"), 
            "expect that key 'customers.city' exists in result of validate BUT not");
        value = result["customers.city"];
        assert.ok(typeof value === "string",
            "expect that datatype of the query key customers.city should be string BUT "+typeof value);
        assert.ok(!result.hasOwnProperty("state"), 
            "expect that key 'state' not exists in result of validate BUT it is");
        assert.ok(result.hasOwnProperty("customers.state"), 
            "expect that key 'customers.state' exists in result of validate BUT not");
        value = result["customers.state"];
        assert.ok(typeof value === "string",
            "expect that datatype of the query key customers.state should be string BUT "+typeof value);
        assert.ok(!result.hasOwnProperty("postalCode"), 
            "expect that key 'postalCode' not exists in result of validate BUT it is");
        assert.ok(result.hasOwnProperty("customers.postalCode"), 
            "expect that key 'customers.postalCode' exists in result of validate BUT not");
        value = result["customers.postalCode"];
        assert.ok(typeof value === "string",
            "expect that datatype of the query key customers.postalCode should be string BUT "+typeof value);
        assert.ok(!result.hasOwnProperty("country"), 
            "expect that key 'country' not exists in result of validate BUT it is");
        assert.ok(result.hasOwnProperty("customers.country"), 
            "expect that key 'customers.country' exists in result of validate BUT not");
        value = result["customers.country"];
        assert.ok(typeof value === "string",
            "expect that datatype of the query key customers.country should be string BUT "+typeof value);
        assert.ok(!result.hasOwnProperty("salesRepEmployeeNumber"), 
            "expect that key 'salesRepEmployeeNumber' not exists in result of validate BUT it is");
        assert.ok(result.hasOwnProperty("customers.salesRepEmployeeNumber"), 
            "expect that key 'customers.salesRepEmployeeNumber' exists in result of validate BUT not");
        value = result["customers.salesRepEmployeeNumber"];
        assert.ok(typeof value === "number",
            "expect that datatype of the query key customers.salesRepEmployeeNumber should be number BUT "+typeof value);
    });
});

