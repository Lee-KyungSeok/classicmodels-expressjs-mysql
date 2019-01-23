/*
 Copyright(c) 2009-2019 by GGoons.
*/
const ArrayUtils = require('../../utils/array.utils');
const DateUtils = require('../../utils/date.utils');
const MapUtils = require('../../utils/map.utils');
const StringUtils = require('../../utils/string.utils');
const QueryParamsValidateUtils = require('./QueryParamsValidateUtils');

const columnNameMap = {};
columnNameMap["customerName"] = ["customers.customerName", "string"];
columnNameMap["contactLastName"] = ["customers.contactLastName", "string"];
columnNameMap["contactFirstName"] = ["customers.contactFirstName", "string"];
columnNameMap["phone"] = ["customers.phone", "string"];
columnNameMap["addressLine1"] = ["customers.addressLine1", "string"];
columnNameMap["addressLine2"] = ["customers.addressLine2", "string"];
columnNameMap["city"] = ["customers.city", "string"];
columnNameMap["state"] = ["customers.state", "string"];
columnNameMap["postalCode"] = ["customers.postalCode", "string"];
columnNameMap["country"] = ["customers.country", "string"];
columnNameMap["salesRepEmployeeNumber"] = ["customers.salesRepEmployeeNumber", "number"];

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
