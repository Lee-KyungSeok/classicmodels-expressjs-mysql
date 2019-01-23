/*
 Copyright(c) 2009-2019 by GGoons.
*/
'use strict';

const assert = require('assert');
//const q = require('q');
const sinon = require('sinon');

const CustomerPaymentStatisticQueryValidator = require('../../../dao/validate/CustomerPaymentStatisticQueryValidator');
const ArrayUtils = require('../../../utils/array.utils');
const DateUtils = require('../../../utils/date.utils');
const MapUtils = require('../../../utils/map.utils');
const StringUtils = require('../../../utils/string.utils');

describe('CustomerPaymentStatisticQueryValidateTest...', () => {
    it('query key name and data should be converted', () => {
        let req = {params: {}};
        let params = req.params;

        params["customerNumber"] = [
            1,
            1,
            1
        ];
        params["paymentDateFrom"] = "2017-12-25";
        params["paymentDateTo"] = "2017-12-25";
        params["salesRepEmployeeNumber ="] = 1;

        let result = CustomerPaymentStatisticQueryValidator.validate(req).params;
        let value;

        assert.ok(!result.hasOwnProperty("customerNumber"),
            "expect that key 'customerNumber' not exists in result of validate BUT it is");
        assert.ok(result.hasOwnProperty("customers.customerNumber in"),
            "expect that key 'customers.customerNumber in' exists in result of validate BUT not");
        value = result["customers.customerNumber in"];
        assert.ok(value instanceof Array,
            "expect that datatype of the query key 'customers.customerNumber in' should be Array BUT "+typeof value);
        value.forEach(value2 => {
            assert.ok(typeof value2 === "number",
                "expect that datatype of the query key 'customers.customerNumber in' should be number BUT "+typeof value2);
        });
        assert.ok(!result.hasOwnProperty("paymentDate"),
            "expect that key 'paymentDate' not exists in result of validate BUT it is");
        assert.ok(result.hasOwnProperty("payments.paymentDate between"),
            "expect that key 'payments.paymentDate between' exists in result of validate BUT not");
        value = result["payments.paymentDate between"];
        assert.ok(value instanceof Array,
            "expect that datatype of the query key 'payments.paymentDate between' should be Array BUT "+typeof value);
        assert.ok(value.length == 2,
            "expect that length of value should be 2 BUT "+value.length);
        assert.ok(value[0] instanceof Date,
            "expect that datatype of the query key 'payments.paymentDate between' should be Date BUT "+typeof value[0]);
        assert.ok(value[1] instanceof Date,
            "expect that datatype of the query key 'payments.paymentDate between' should be Date BUT "+typeof value[1]);

        assert.ok(!result.hasOwnProperty("salesRepEmployeeNumber ="),
            "expect that key 'salesRepEmployeeNumber =' not exists in result of validate BUT it is");
        assert.ok(result.hasOwnProperty("customers.salesRepEmployeeNumber ="),
            "expect that key 'customers.salesRepEmployeeNumber =' exists in result of validate BUT not");
        value = result["customers.salesRepEmployeeNumber ="];
        assert.ok(typeof value === "number",
            "expect that datatype of the query key 'customers.salesRepEmployeeNumber =' should be number BUT "+typeof value);
    });

});
