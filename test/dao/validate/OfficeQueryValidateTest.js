/*
 Copyright(c) 2009-2019 by GGoons.
*/
'use strict';

const assert = require('assert');
//const q = require('q');
const sinon = require('sinon');

const OfficeQueryValidator = require('../../../dao/validate/OfficeQueryValidator');
const ArrayUtils = require('../../../utils/array.utils');
const DateUtils = require('../../../utils/date.utils');
const MapUtils = require('../../../utils/map.utils');
const StringUtils = require('../../../utils/string.utils');

describe('OfficeQueryValidateTest...', () => {
    it('query key name and data should be converted', () => {
        let req = {params: {}};
        let params = req.params;
        params["city"] = "1";
        params["phone"] = "1";
        params["addressLine1"] = "1";
        params["addressLine2"] = "1";
        params["state"] = "1";
        params["country"] = "1";
        params["postalCode"] = "1";
        params["territory"] = "1";

        let result = OfficeQueryValidator.validate(req).params;
        let value;

        assert.ok(!result.hasOwnProperty("city"), 
            "expect that key 'city' not exists in result of validate BUT it is");
        assert.ok(result.hasOwnProperty("offices.city"), 
            "expect that key 'offices.city' exists in result of validate BUT not");
        value = result["offices.city"];
        assert.ok(typeof value === "string",
            "expect that datatype of the query key offices.city should be string BUT "+typeof value);
        assert.ok(!result.hasOwnProperty("phone"), 
            "expect that key 'phone' not exists in result of validate BUT it is");
        assert.ok(result.hasOwnProperty("offices.phone"), 
            "expect that key 'offices.phone' exists in result of validate BUT not");
        value = result["offices.phone"];
        assert.ok(typeof value === "string",
            "expect that datatype of the query key offices.phone should be string BUT "+typeof value);
        assert.ok(!result.hasOwnProperty("addressLine1"), 
            "expect that key 'addressLine1' not exists in result of validate BUT it is");
        assert.ok(result.hasOwnProperty("offices.addressLine1"), 
            "expect that key 'offices.addressLine1' exists in result of validate BUT not");
        value = result["offices.addressLine1"];
        assert.ok(typeof value === "string",
            "expect that datatype of the query key offices.addressLine1 should be string BUT "+typeof value);
        assert.ok(!result.hasOwnProperty("addressLine2"), 
            "expect that key 'addressLine2' not exists in result of validate BUT it is");
        assert.ok(result.hasOwnProperty("offices.addressLine2"), 
            "expect that key 'offices.addressLine2' exists in result of validate BUT not");
        value = result["offices.addressLine2"];
        assert.ok(typeof value === "string",
            "expect that datatype of the query key offices.addressLine2 should be string BUT "+typeof value);
        assert.ok(!result.hasOwnProperty("state"), 
            "expect that key 'state' not exists in result of validate BUT it is");
        assert.ok(result.hasOwnProperty("offices.state"), 
            "expect that key 'offices.state' exists in result of validate BUT not");
        value = result["offices.state"];
        assert.ok(typeof value === "string",
            "expect that datatype of the query key offices.state should be string BUT "+typeof value);
        assert.ok(!result.hasOwnProperty("country"), 
            "expect that key 'country' not exists in result of validate BUT it is");
        assert.ok(result.hasOwnProperty("offices.country"), 
            "expect that key 'offices.country' exists in result of validate BUT not");
        value = result["offices.country"];
        assert.ok(typeof value === "string",
            "expect that datatype of the query key offices.country should be string BUT "+typeof value);
        assert.ok(!result.hasOwnProperty("postalCode"), 
            "expect that key 'postalCode' not exists in result of validate BUT it is");
        assert.ok(result.hasOwnProperty("offices.postalCode"), 
            "expect that key 'offices.postalCode' exists in result of validate BUT not");
        value = result["offices.postalCode"];
        assert.ok(typeof value === "string",
            "expect that datatype of the query key offices.postalCode should be string BUT "+typeof value);
        assert.ok(!result.hasOwnProperty("territory"), 
            "expect that key 'territory' not exists in result of validate BUT it is");
        assert.ok(result.hasOwnProperty("offices.territory"), 
            "expect that key 'offices.territory' exists in result of validate BUT not");
        value = result["offices.territory"];
        assert.ok(typeof value === "string",
            "expect that datatype of the query key offices.territory should be string BUT "+typeof value);
    });
});

