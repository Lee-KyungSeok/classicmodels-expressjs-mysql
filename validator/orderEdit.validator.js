/*
 Copyright(c) 2009-2019 by GGoons.
*/
const Const = require('../config/global.const');
const StringUtils = require('../utils/string.utils');

/**
*/
exports.validate = (ef) => {
    const errors = {};
    const order = ef.order;
    if (!order.orderNumber) {
        errors["order.orderNumber"] = "order.orderNumber_is_required";
    }
    if (!order.orderDate) {
        errors["order.orderDate"] = "order.orderDate_is_required";
    }
    if (!order.requiredDate) {
        errors["order.requiredDate"] = "order.requiredDate_is_required";
    }
    if (StringUtils.isBlank(order.status)) {
        errors["order.status"] = "order.status_is_required";
    }
    if (!order.customerNumber)
            errors["order.customerNumber"] = "order.customerNumber_is_required";
    if (order.orderDate) {
        order.orderDate = new Date(order.orderDate);
    }
    if (order.requiredDate) {
        order.requiredDate = new Date(order.requiredDate);
    }
    if (order.shippedDate) {
        order.shippedDate = new Date(order.shippedDate);
    }

    return errors;
}
