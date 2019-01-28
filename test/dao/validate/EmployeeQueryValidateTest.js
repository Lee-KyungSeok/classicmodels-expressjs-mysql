/*
 Copyright(c) 2009-2019 by GGoons.
*/
'use strict';

const assert = require('assert');
//const q = require('q');
const sinon = require('sinon');

const EmployeeQueryValidator = require('../../../dao/validate/EmployeeQueryValidator');
const ArrayUtils = require('../../../utils/array.utils');
const DateUtils = require('../../../utils/date.utils');
const MapUtils = require('../../../utils/map.utils');
const StringUtils = require('../../../utils/string.utils');

describe('EmployeeQueryValidateTest...', () => {
    it('query key name and data should be converted', () => {
        let req = {params: {}};
        let params = req.params;
        params["lastName"] = "1";
        params["firstName"] = "1";
        params["extension"] = "1";
        params["email"] = "1";
        params["jobTitle"] = "1";
        params["reportsTo"] = 1;
        params["officeCode"] = "1";

        let result = EmployeeQueryValidator.validate(req).params;
        let value;

        assert.ok(!result.hasOwnProperty("lastName"), 
            "expect that key 'lastName' not exists in result of validate BUT it is");
        assert.ok(result.hasOwnProperty("employees.lastName"), 
            "expect that key 'employees.lastName' exists in result of validate BUT not");
        value = result["employees.lastName"];
        assert.ok(typeof value === "string",
            "expect that datatype of the query key employees.lastName should be string BUT "+typeof value);
        assert.ok(!result.hasOwnProperty("firstName"), 
            "expect that key 'firstName' not exists in result of validate BUT it is");
        assert.ok(result.hasOwnProperty("employees.firstName"), 
            "expect that key 'employees.firstName' exists in result of validate BUT not");
        value = result["employees.firstName"];
        assert.ok(typeof value === "string",
            "expect that datatype of the query key employees.firstName should be string BUT "+typeof value);
        assert.ok(!result.hasOwnProperty("extension"), 
            "expect that key 'extension' not exists in result of validate BUT it is");
        assert.ok(result.hasOwnProperty("employees.extension"), 
            "expect that key 'employees.extension' exists in result of validate BUT not");
        value = result["employees.extension"];
        assert.ok(typeof value === "string",
            "expect that datatype of the query key employees.extension should be string BUT "+typeof value);
        assert.ok(!result.hasOwnProperty("email"), 
            "expect that key 'email' not exists in result of validate BUT it is");
        assert.ok(result.hasOwnProperty("employees.email"), 
            "expect that key 'employees.email' exists in result of validate BUT not");
        value = result["employees.email"];
        assert.ok(typeof value === "string",
            "expect that datatype of the query key employees.email should be string BUT "+typeof value);
        assert.ok(!result.hasOwnProperty("jobTitle"), 
            "expect that key 'jobTitle' not exists in result of validate BUT it is");
        assert.ok(result.hasOwnProperty("employees.jobTitle"), 
            "expect that key 'employees.jobTitle' exists in result of validate BUT not");
        value = result["employees.jobTitle"];
        assert.ok(typeof value === "string",
            "expect that datatype of the query key employees.jobTitle should be string BUT "+typeof value);
        assert.ok(!result.hasOwnProperty("reportsTo"), 
            "expect that key 'reportsTo' not exists in result of validate BUT it is");
        assert.ok(result.hasOwnProperty("employees.reportsTo"), 
            "expect that key 'employees.reportsTo' exists in result of validate BUT not");
        value = result["employees.reportsTo"];
        assert.ok(typeof value === "number",
            "expect that datatype of the query key employees.reportsTo should be number BUT "+typeof value);
        assert.ok(!result.hasOwnProperty("officeCode"), 
            "expect that key 'officeCode' not exists in result of validate BUT it is");
        assert.ok(result.hasOwnProperty("employees.officeCode"), 
            "expect that key 'employees.officeCode' exists in result of validate BUT not");
        value = result["employees.officeCode"];
        assert.ok(typeof value === "string",
            "expect that datatype of the query key employees.officeCode should be string BUT "+typeof value);
    });
});

