/*
 Copyright(c) 2009-2019 by GGoons.
*/
'use strict';

const assert = require('assert');
//const q = require('q');
const sinon = require('sinon');

const CustomerListQueryValidator = require('../../../dao/validate/CustomerListQueryValidator');
const ArrayUtils = require('../../../utils/array.utils');
const DateUtils = require('../../../utils/date.utils');
const MapUtils = require('../../../utils/map.utils');
const StringUtils = require('../../../utils/string.utils');

describe('CustomerListQueryValidateTest...', () => {
    it('query key name and data should be converted', () => {
        let req = {params: {}};
        let params = req.params;

        params["city"] = "1";
        params["state"] = "1";
        params["salesRepEmployeeNumber ="] = 1;

        let result = CustomerListQueryValidator.validate(req).params;
        let value;

        assert.ok(!result.hasOwnProperty("city"),
            "expect that key 'city' not exists in result of validate BUT it is");
        assert.ok(result.hasOwnProperty("customers.city like"),
            "expect that key 'customers.city like' exists in result of validate BUT not");
        value = result["customers.city like"];
        assert.ok(typeof value === "string",
            "expect that datatype of the query key 'customers.city like' should be string BUT "+typeof value);
        assert.ok(!result.hasOwnProperty("state"),
            "expect that key 'state' not exists in result of validate BUT it is");
        assert.ok(result.hasOwnProperty("customers.state like"),
            "expect that key 'customers.state like' exists in result of validate BUT not");
        value = result["customers.state like"];
        assert.ok(typeof value === "string",
            "expect that datatype of the query key 'customers.state like' should be string BUT "+typeof value);
        assert.ok(!result.hasOwnProperty("salesRepEmployeeNumber ="),
            "expect that key 'salesRepEmployeeNumber =' not exists in result of validate BUT it is");
        assert.ok(result.hasOwnProperty("customers.salesRepEmployeeNumber ="),
            "expect that key 'customers.salesRepEmployeeNumber =' exists in result of validate BUT not");
        value = result["customers.salesRepEmployeeNumber ="];
        assert.ok(typeof value === "number",
            "expect that datatype of the query key 'customers.salesRepEmployeeNumber =' should be number BUT "+typeof value);
    });

});
