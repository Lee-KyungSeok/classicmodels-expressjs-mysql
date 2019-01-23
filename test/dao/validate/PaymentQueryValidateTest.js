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

    });
});

