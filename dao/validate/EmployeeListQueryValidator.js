/*
 Copyright(c) 2009-2019 by GGoons.
*/
const ArrayUtils = require('../../utils/array.utils');
const DateUtils = require('../../utils/date.utils');
const MapUtils = require('../../utils/map.utils');
const StringUtils = require('../../utils/string.utils');
const QueryParamsValidateUtils = require('./QueryParamsValidateUtils');

const columnNameMap = {};
columnNameMap["lastName"] = ["employees.lastName like", "string"];
columnNameMap["reportsTo"] = ["employees.reportsTo =", "number"];
columnNameMap["officeCode"] = ["employees.officeCode =", "string"];

exports.validate = (req) => {
    const params = {};
    Object.assign(params, req.params, req.query, req.body);

    QueryParamsValidateUtils.paramsValidate(params, columnNameMap);

    if (!params.hasOwnProperty("page-no")) {
        params["page-no"] = "1";
    }
    if (!params.hasOwnProperty("num-rows")) {
        params["num-rows"] = "20";
    }

    req.params = params;
    req.query = {};
    req.body = {};

    return req;
};
