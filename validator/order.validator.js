/**
 Copyright(c) 2009-2019 by GGoons.
*/
const StringUtils = require('../utils/string.utils');

/**
* validate model Order
*
* @param order model for validate.
* @param errors storage to result of validation.
*/
exports.validate = (order) => {
    const errors = {};
    if (!order.orderDate)
        errors["orderDate"] = "FIXME: orderDate is required.";

    if (!order.requiredDate)
        errors["requiredDate"] = "FIXME: requiredDate is required.";

    if (StringUtils.isBlank(order.status))
        errors["status"] = "FIXME: status is required.";

    if (!order.customerNumber)
        errors["customerNumber"] = "FIXME: customerNumber is required.";

    return errors;
};
