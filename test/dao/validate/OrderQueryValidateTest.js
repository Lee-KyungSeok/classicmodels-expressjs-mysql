/*
 Copyright(c) 2009-2019 by GGoons.
*/
'use strict';

const assert = require('assert');
//const q = require('q');
const sinon = require('sinon');

const OrderQueryValidator = require('../../../dao/validate/OrderQueryValidator');
const ArrayUtils = require('../../../utils/array.utils');
const DateUtils = require('../../../utils/date.utils');
const MapUtils = require('../../../utils/map.utils');
const StringUtils = require('../../../utils/string.utils');

describe('OrderQueryValidateTest...', () => {
    it('query key name and data should be converted', () => {
        let req = {params: {}};
        let params = req.params;
        params["orderDate"] = "2017-12-25";
        params["requiredDate"] = "2017-12-25";
        params["shippedDate"] = "2017-12-25";
        params["status"] = "1";
        params["customerNumber"] = 1;

        let result = OrderQueryValidator.validate(req).params;
        let value;

        assert.ok(!result.hasOwnProperty("orderDate"), 
            "expect that key 'orderDate' not exists in result of validate BUT it is");
        assert.ok(result.hasOwnProperty("orders.orderDate"), 
            "expect that key 'orders.orderDate' exists in result of validate BUT not");
        value = result["orders.orderDate"];
        assert.ok(value instanceof Date,
            "expect that datatype of the query key orders.orderDate should be Date BUT "+typeof value);
        assert.ok(!result.hasOwnProperty("requiredDate"), 
            "expect that key 'requiredDate' not exists in result of validate BUT it is");
        assert.ok(result.hasOwnProperty("orders.requiredDate"), 
            "expect that key 'orders.requiredDate' exists in result of validate BUT not");
        value = result["orders.requiredDate"];
        assert.ok(value instanceof Date,
            "expect that datatype of the query key orders.requiredDate should be Date BUT "+typeof value);
        assert.ok(!result.hasOwnProperty("shippedDate"), 
            "expect that key 'shippedDate' not exists in result of validate BUT it is");
        assert.ok(result.hasOwnProperty("orders.shippedDate"), 
            "expect that key 'orders.shippedDate' exists in result of validate BUT not");
        value = result["orders.shippedDate"];
        assert.ok(value instanceof Date,
            "expect that datatype of the query key orders.shippedDate should be Date BUT "+typeof value);
        assert.ok(!result.hasOwnProperty("status"), 
            "expect that key 'status' not exists in result of validate BUT it is");
        assert.ok(result.hasOwnProperty("orders.status"), 
            "expect that key 'orders.status' exists in result of validate BUT not");
        value = result["orders.status"];
        assert.ok(typeof value === "string",
            "expect that datatype of the query key orders.status should be string BUT "+typeof value);
        assert.ok(!result.hasOwnProperty("customerNumber"), 
            "expect that key 'customerNumber' not exists in result of validate BUT it is");
        assert.ok(result.hasOwnProperty("orders.customerNumber"), 
            "expect that key 'orders.customerNumber' exists in result of validate BUT not");
        value = result["orders.customerNumber"];
        assert.ok(typeof value === "number",
            "expect that datatype of the query key orders.customerNumber should be number BUT "+typeof value);
    });
});

