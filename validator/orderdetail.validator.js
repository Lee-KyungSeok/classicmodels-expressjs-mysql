/**
 Copyright(c) 2009-2019 by GGoons.
*/
const StringUtils = require('../utils/string.utils');

/**
* validate model Orderdetail
*
* @param orderdetail model for validate.
* @param errors storage to result of validation.
*/
exports.validate = (orderdetail) => {
    const errors = {};
    if (!orderdetail.quantityOrdered)
        errors["quantityOrdered"] = "FIXME: quantityOrdered is required.";

    if (!orderdetail.priceEach)
        errors["priceEach"] = "FIXME: priceEach is required.";

    if (!orderdetail.orderLineNumber)
        errors["orderLineNumber"] = "FIXME: orderLineNumber is required.";

    return errors;
};
