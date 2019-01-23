/*
 Copyright(c) 2009-2019 by GGoons.
*/
const ArrayUtils = require('../../utils/array.utils');
const DateUtils = require('../../utils/date.utils');
const MapUtils = require('../../utils/map.utils');
const StringUtils = require('../../utils/string.utils');
const QueryParamsValidateUtils = require('./QueryParamsValidateUtils');

const columnNameMap = {};
columnNameMap["customerNumber"] = ["customers.customerNumber in", "number"];
columnNameMap["paymentDateFrom"] = [null, null];
columnNameMap["paymentDateTo"] = [null, null];
columnNameMap["salesRepEmployeeNumber"] = ["customers.salesRepEmployeeNumber =", "number"];
const betweenColumnNames = [];
betweenColumnNames.push(["paymentDateFrom", "paymentDateTo", 
        "payments.paymentDate between", "Date"]);

exports.validate = (req) => {
    const params = {};
    Object.assign(params, req.params, req.query, req.body);

    QueryParamsValidateUtils.paramsValidate(params, columnNameMap);
    QueryParamsValidateUtils.validateBetweenParams(params, betweenColumnNames);

    let day;

    req.params = params;
    req.query = {};
    req.body = {};

    return req;
};
