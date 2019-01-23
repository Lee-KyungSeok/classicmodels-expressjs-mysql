/*
 Copyright(c) 2009-2019 by GGoons.
*/
const Const = require('../config/global.const');
const StringUtils = require('../utils/string.utils');

/**
*/
exports.validate = (ef) => {
    const errors = {};
    const orderdetail = ef.orderdetail;
    if (!orderdetail.quantityOrdered) {
        errors["orderdetail.quantityOrdered"] = "orderdetail.quantityOrdered_is_required";
    }
    if (!orderdetail.priceEach) {
        errors["orderdetail.priceEach"] = "orderdetail.priceEach_is_required";
    }
    if (!orderdetail.orderLineNumber) {
        errors["orderdetail.orderLineNumber"] = "orderdetail.orderLineNumber_is_required";
    }

    return errors;
}
