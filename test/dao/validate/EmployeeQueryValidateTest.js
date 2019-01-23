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

    });
});

