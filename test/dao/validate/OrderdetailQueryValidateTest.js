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

    });
});

