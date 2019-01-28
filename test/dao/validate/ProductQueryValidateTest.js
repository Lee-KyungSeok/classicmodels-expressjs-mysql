/*
 Copyright(c) 2009-2019 by GGoons.
*/
'use strict';

const assert = require('assert');
//const q = require('q');
const sinon = require('sinon');

const ProductQueryValidator = require('../../../dao/validate/ProductQueryValidator');
const ArrayUtils = require('../../../utils/array.utils');
const DateUtils = require('../../../utils/date.utils');
const MapUtils = require('../../../utils/map.utils');
const StringUtils = require('../../../utils/string.utils');

describe('ProductQueryValidateTest...', () => {
    it('query key name and data should be converted', () => {
        let req = {params: {}};
        let params = req.params;
        params["productName"] = "1";
        params["productScale"] = "1";
        params["productVendor"] = "1";
        params["quantityInStock"] = 1;
        params["productLine"] = "1";

        let result = ProductQueryValidator.validate(req).params;
        let value;

        assert.ok(!result.hasOwnProperty("productName"), 
            "expect that key 'productName' not exists in result of validate BUT it is");
        assert.ok(result.hasOwnProperty("products.productName"), 
            "expect that key 'products.productName' exists in result of validate BUT not");
        value = result["products.productName"];
        assert.ok(typeof value === "string",
            "expect that datatype of the query key products.productName should be string BUT "+typeof value);
        assert.ok(!result.hasOwnProperty("productScale"), 
            "expect that key 'productScale' not exists in result of validate BUT it is");
        assert.ok(result.hasOwnProperty("products.productScale"), 
            "expect that key 'products.productScale' exists in result of validate BUT not");
        value = result["products.productScale"];
        assert.ok(typeof value === "string",
            "expect that datatype of the query key products.productScale should be string BUT "+typeof value);
        assert.ok(!result.hasOwnProperty("productVendor"), 
            "expect that key 'productVendor' not exists in result of validate BUT it is");
        assert.ok(result.hasOwnProperty("products.productVendor"), 
            "expect that key 'products.productVendor' exists in result of validate BUT not");
        value = result["products.productVendor"];
        assert.ok(typeof value === "string",
            "expect that datatype of the query key products.productVendor should be string BUT "+typeof value);
        assert.ok(!result.hasOwnProperty("quantityInStock"), 
            "expect that key 'quantityInStock' not exists in result of validate BUT it is");
        assert.ok(result.hasOwnProperty("products.quantityInStock"), 
            "expect that key 'products.quantityInStock' exists in result of validate BUT not");
        value = result["products.quantityInStock"];
        assert.ok(typeof value === "number",
            "expect that datatype of the query key products.quantityInStock should be number BUT "+typeof value);
        assert.ok(!result.hasOwnProperty("productLine"), 
            "expect that key 'productLine' not exists in result of validate BUT it is");
        assert.ok(result.hasOwnProperty("products.productLine"), 
            "expect that key 'products.productLine' exists in result of validate BUT not");
        value = result["products.productLine"];
        assert.ok(typeof value === "string",
            "expect that datatype of the query key products.productLine should be string BUT "+typeof value);
    });
});
