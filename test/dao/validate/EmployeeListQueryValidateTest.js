/*
 Copyright(c) 2009-2019 by GGoons.
*/
'use strict';

const assert = require('assert');
//const q = require('q');
const sinon = require('sinon');

const EmployeeListQueryValidator = require('../../../dao/validate/EmployeeListQueryValidator');
const ArrayUtils = require('../../../utils/array.utils');
const DateUtils = require('../../../utils/date.utils');
const MapUtils = require('../../../utils/map.utils');
const StringUtils = require('../../../utils/string.utils');

describe('EmployeeListQueryValidateTest...', () => {
    it('query key name and data should be converted', () => {
        let req = {params: {}};
        let params = req.params;

        params["lastName"] = "1";
        params["reportsTo ="] = 1;
        params["officeCode ="] = "1";

        let result = EmployeeListQueryValidator.validate(req).params;
        let value;

        assert.ok(!result.hasOwnProperty("lastName"),
            "expect that key 'lastName' not exists in result of validate BUT it is");
        assert.ok(result.hasOwnProperty("employees.lastName like"),
            "expect that key 'employees.lastName like' exists in result of validate BUT not");
        value = result["employees.lastName like"];
        assert.ok(typeof value === "string",
            "expect that datatype of the query key 'employees.lastName like' should be string BUT "+typeof value);
        assert.ok(!result.hasOwnProperty("reportsTo ="),
            "expect that key 'reportsTo =' not exists in result of validate BUT it is");
        assert.ok(result.hasOwnProperty("employees.reportsTo ="),
            "expect that key 'employees.reportsTo =' exists in result of validate BUT not");
        value = result["employees.reportsTo ="];
        assert.ok(typeof value === "number",
            "expect that datatype of the query key 'employees.reportsTo =' should be number BUT "+typeof value);
        assert.ok(!result.hasOwnProperty("officeCode ="),
            "expect that key 'officeCode =' not exists in result of validate BUT it is");
        assert.ok(result.hasOwnProperty("employees.officeCode ="),
            "expect that key 'employees.officeCode =' exists in result of validate BUT not");
        value = result["employees.officeCode ="];
        assert.ok(typeof value === "string",
            "expect that datatype of the query key 'employees.officeCode =' should be string BUT "+typeof value);
    });

});
