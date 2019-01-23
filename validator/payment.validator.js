/**
 Copyright(c) 2009-2019 by GGoons.
*/
const StringUtils = require('../utils/string.utils');

/**
* validate model Payment
*
* @param payment model for validate.
* @param errors storage to result of validation.
*/
exports.validate = (payment) => {
    const errors = {};
    if (!payment.paymentDate)
        errors["paymentDate"] = "FIXME: paymentDate is required.";

    if (!payment.amount)
        errors["amount"] = "FIXME: amount is required.";

    return errors;
};
