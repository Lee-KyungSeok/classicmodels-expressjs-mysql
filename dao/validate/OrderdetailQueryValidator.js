/*
 Copyright(c) 2009-2019 by GGoons.
*/
const ArrayUtils = require('../../utils/array.utils');
const DateUtils = require('../../utils/date.utils');
const MapUtils = require('../../utils/map.utils');
const StringUtils = require('../../utils/string.utils');
const QueryParamsValidateUtils = require('./QueryParamsValidateUtils');

const columnNameMap = {};
columnNameMap["quantityOrdered"] = ["orderdetails.quantityOrdered", "number"];
columnNameMap["orderLineNumber"] = ["orderdetails.orderLineNumber", "number"];
columnNameMap["orderNumber"] = ["orderdetails.orderNumber", "number"];
columnNameMap["productCode"] = ["orderdetails.productCode", "string"];

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
