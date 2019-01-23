/**
 Copyright(c) 2009-2019 by GGoons.
*/
const StringUtils = require('../utils/string.utils');

/**
* validate model Customer
*
* @param customer model for validate.
* @param errors storage to result of validation.
*/
exports.validate = (customer) => {
    const errors = {};
    if (StringUtils.isBlank(customer.customerName))
        errors["customerName"] = "FIXME: customerName is required.";

    if (StringUtils.isBlank(customer.contactLastName))
        errors["contactLastName"] = "FIXME: contactLastName is required.";

    if (StringUtils.isBlank(customer.contactFirstName))
        errors["contactFirstName"] = "FIXME: contactFirstName is required.";

    if (StringUtils.isBlank(customer.phone))
        errors["phone"] = "FIXME: phone is required.";

    if (StringUtils.isBlank(customer.addressLine1))
        errors["addressLine1"] = "FIXME: addressLine1 is required.";

    if (StringUtils.isBlank(customer.city))
        errors["city"] = "FIXME: city is required.";

    if (StringUtils.isBlank(customer.country))
        errors["country"] = "FIXME: country is required.";

    return errors;
};
