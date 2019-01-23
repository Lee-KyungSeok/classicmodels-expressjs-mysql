/*
 Copyright(c) 2009-2019 by GGoons.
*/
'use strict';

const assert = require('assert');
//const q = require('q');
const sinon = require('sinon');

const ProductlineQueryValidator = require('../../../dao/validate/ProductlineQueryValidator');
const ArrayUtils = require('../../../utils/array.utils');
const DateUtils = require('../../../utils/date.utils');
const MapUtils = require('../../../utils/map.utils');
const StringUtils = require('../../../utils/string.utils');

describe('ProductlineQueryValidateTest...', () => {
    it('query key name and data should be converted', () => {
        let req = {params: {}};
        let params = req.params;

        let result = ProductlineQueryValidator.validate(req).params;
        let value;

    });
});

