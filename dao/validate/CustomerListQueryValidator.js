/*
 Copyright(c) 2009-2019 by GGoons.
*/
const ArrayUtils = require('../../utils/array.utils');
const DateUtils = require('../../utils/date.utils');
const MapUtils = require('../../utils/map.utils');
const StringUtils = require('../../utils/string.utils');
const QueryParamsValidateUtils = require('./QueryParamsValidateUtils');

const columnNameMap = {};
columnNameMap["city"] = ["customers.city like", "string"];
columnNameMap["state"] = ["customers.state like", "string"];
columnNameMap["salesRepEmployeeNumber"] = ["customers.salesRepEmployeeNumber =", "number"];

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
