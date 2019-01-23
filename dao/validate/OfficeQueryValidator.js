/*
 Copyright(c) 2009-2019 by GGoons.
*/
const ArrayUtils = require('../../utils/array.utils');
const DateUtils = require('../../utils/date.utils');
const MapUtils = require('../../utils/map.utils');
const StringUtils = require('../../utils/string.utils');
const QueryParamsValidateUtils = require('./QueryParamsValidateUtils');

const columnNameMap = {};
columnNameMap["city"] = ["offices.city", "string"];
columnNameMap["phone"] = ["offices.phone", "string"];
columnNameMap["addressLine1"] = ["offices.addressLine1", "string"];
columnNameMap["addressLine2"] = ["offices.addressLine2", "string"];
columnNameMap["state"] = ["offices.state", "string"];
columnNameMap["country"] = ["offices.country", "string"];
columnNameMap["postalCode"] = ["offices.postalCode", "string"];
columnNameMap["territory"] = ["offices.territory", "string"];

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
