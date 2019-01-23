/*
 Copyright(c) 2009-2019 by GGoons.
*/
const Const = require('../config/global.const');
const StringUtils = require('../utils/string.utils');

/**
*/
exports.validate = (ef) => {
    const errors = {};
    const payment = ef.payment;
    if (StringUtils.isBlank(payment.checkNumber)) {
        errors["payment.checkNumber"] = "payment.checkNumber_is_required";
    }
    if (!payment.paymentDate) {
        errors["payment.paymentDate"] = "payment.paymentDate_is_required";
    }
    if (!payment.amount) {
        errors["payment.amount"] = "payment.amount_is_required";
    }
    if (payment.paymentDate) {
        payment.paymentDate = new Date(payment.paymentDate);
    }

    return errors;
}
