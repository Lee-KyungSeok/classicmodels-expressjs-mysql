/*
 Copyright(c) 2009-2019 by GGoons.
*/
const ArrayUtils = require('../../utils/array.utils');
const DateUtils = require('../../utils/date.utils');
const MapUtils = require('../../utils/map.utils');
const StringUtils = require('../../utils/string.utils');
const QueryParamsValidateUtils = require('./QueryParamsValidateUtils');

const columnNameMap = {};
columnNameMap["orderDate"] = ["orders.orderDate", "Date"];
columnNameMap["requiredDate"] = ["orders.requiredDate", "Date"];
columnNameMap["shippedDate"] = ["orders.shippedDate", "Date"];
columnNameMap["status"] = ["orders.status", "string"];
columnNameMap["customerNumber"] = ["orders.customerNumber", "number"];

    /**
    */
exports.validate = (req) => {
    const params = {};
    const keys = {};
    let value;
    Object.assign(params, req.params, req.query, req.body);

    QueryParamsValidateUtils.paramsValidate(params, columnNameMap);

    req.params = params;
    return req;
};
