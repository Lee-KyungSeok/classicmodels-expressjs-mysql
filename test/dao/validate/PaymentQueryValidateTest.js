/*
 Copyright(c) 2009-2019 by GGoons.
*/
'use strict';

const assert = require('assert');
//const q = require('q');
const sinon = require('sinon');

const PaymentQueryValidator = require('../../../dao/validate/PaymentQueryValidator');
const ArrayUtils = require('../../../utils/array.utils');
const DateUtils = require('../../../utils/date.utils');
const MapUtils = require('../../../utils/map.utils');
const StringUtils = require('../../../utils/string.utils');

describe('PaymentQueryValidateTest...', () => {
    it('query key name and data should be converted', () => {
        let req = {params: {}};
        let params = req.params;
        params["paymentDate"] = "2017-12-25";
        params["customerNumber"] = 1;

        let result = PaymentQueryValidator.validate(req).params;
        let value;

        assert.ok(!result.hasOwnProperty("paymentDate"), 
            "expect that key 'paymentDate' not exists in result of validate BUT it is");
        assert.ok(result.hasOwnProperty("payments.paymentDate"), 
            "expect that key 'payments.paymentDate' exists in result of validate BUT not");
        value = result["payments.paymentDate"];
        assert.ok(value instanceof Date,
            "expect that datatype of the query key payments.paymentDate should be Date BUT "+typeof value);
        assert.ok(!result.hasOwnProperty("customerNumber"), 
            "expect that key 'customerNumber' not exists in result of validate BUT it is");
        assert.ok(result.hasOwnProperty("payments.customerNumber"), 
            "expect that key 'payments.customerNumber' exists in result of validate BUT not");
        value = result["payments.customerNumber"];
        assert.ok(typeof value === "number",
            "expect that datatype of the query key payments.customerNumber should be number BUT "+typeof value);
    });
});

