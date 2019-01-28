/*
 Copyright(c) 2009-2019 by GGoons.
*/
'use strict';

const assert = require('assert');
//const q = require('q');
const sinon = require('sinon');

const OrderdetailQueryValidator = require('../../../dao/validate/OrderdetailQueryValidator');
const ArrayUtils = require('../../../utils/array.utils');
const DateUtils = require('../../../utils/date.utils');
const MapUtils = require('../../../utils/map.utils');
const StringUtils = require('../../../utils/string.utils');

describe('OrderdetailQueryValidateTest...', () => {
    it('query key name and data should be converted', () => {
        let req = {params: {}};
        let params = req.params;
        params["quantityOrdered"] = 1;
        params["orderLineNumber"] = 1;
        params["orderNumber"] = 1;
        params["productCode"] = "1";

        let result = OrderdetailQueryValidator.validate(req).params;
        let value;

        assert.ok(!result.hasOwnProperty("quantityOrdered"), 
            "expect that key 'quantityOrdered' not exists in result of validate BUT it is");
        assert.ok(result.hasOwnProperty("orderdetails.quantityOrdered"), 
            "expect that key 'orderdetails.quantityOrdered' exists in result of validate BUT not");
        value = result["orderdetails.quantityOrdered"];
        assert.ok(typeof value === "number",
            "expect that datatype of the query key orderdetails.quantityOrdered should be number BUT "+typeof value);
        assert.ok(!result.hasOwnProperty("orderLineNumber"), 
            "expect that key 'orderLineNumber' not exists in result of validate BUT it is");
        assert.ok(result.hasOwnProperty("orderdetails.orderLineNumber"), 
            "expect that key 'orderdetails.orderLineNumber' exists in result of validate BUT not");
        value = result["orderdetails.orderLineNumber"];
        assert.ok(typeof value === "number",
            "expect that datatype of the query key orderdetails.orderLineNumber should be number BUT "+typeof value);
        assert.ok(!result.hasOwnProperty("orderNumber"), 
            "expect that key 'orderNumber' not exists in result of validate BUT it is");
        assert.ok(result.hasOwnProperty("orderdetails.orderNumber"), 
            "expect that key 'orderdetails.orderNumber' exists in result of validate BUT not");
        value = result["orderdetails.orderNumber"];
        assert.ok(typeof value === "number",
            "expect that datatype of the query key orderdetails.orderNumber should be number BUT "+typeof value);
        assert.ok(!result.hasOwnProperty("productCode"), 
            "expect that key 'productCode' not exists in result of validate BUT it is");
        assert.ok(result.hasOwnProperty("orderdetails.productCode"), 
            "expect that key 'orderdetails.productCode' exists in result of validate BUT not");
        value = result["orderdetails.productCode"];
        assert.ok(typeof value === "string",
            "expect that datatype of the query key orderdetails.productCode should be string BUT "+typeof value);
    });
});

