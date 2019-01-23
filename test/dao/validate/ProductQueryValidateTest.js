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

    });
});
