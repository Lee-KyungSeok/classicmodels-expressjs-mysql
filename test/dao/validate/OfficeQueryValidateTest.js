/*
 Copyright(c) 2009-2019 by GGoons.
*/
'use strict';

const assert = require('assert');
//const q = require('q');
const sinon = require('sinon');

const OfficeQueryValidator = require('../../../dao/validate/OfficeQueryValidator');
const ArrayUtils = require('../../../utils/array.utils');
const DateUtils = require('../../../utils/date.utils');
const MapUtils = require('../../../utils/map.utils');
const StringUtils = require('../../../utils/string.utils');

describe('OfficeQueryValidateTest...', () => {
    it('query key name and data should be converted', () => {
        let req = {params: {}};
        let params = req.params;
        params["city"] = "1";
        params["phone"] = "1";
        params["addressLine1"] = "1";
        params["addressLine2"] = "1";
        params["state"] = "1";
        params["country"] = "1";
        params["postalCode"] = "1";
        params["territory"] = "1";

        let result = OfficeQueryValidator.validate(req).params;
        let value;

    });
});

