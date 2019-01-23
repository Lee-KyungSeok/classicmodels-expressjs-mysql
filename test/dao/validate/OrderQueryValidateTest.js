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

    });
});

