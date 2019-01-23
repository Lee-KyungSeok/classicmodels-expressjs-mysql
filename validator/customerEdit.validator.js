/*
 Copyright(c) 2009-2019 by GGoons.
*/
const Const = require('../config/global.const');
const StringUtils = require('../utils/string.utils');

/**
*/
exports.validate = (ef) => {
    const errors = {};
    const customer = ef.customer;
    if (!customer.customerNumber) {
        errors["customer.customerNumber"] = "customer.customerNumber_is_required";
    }
    if (StringUtils.isBlank(customer.customerName)) {
        errors["customer.customerName"] = "customer.customerName_is_required";
    }
    if (StringUtils.isBlank(customer.contactLastName)) {
        errors["customer.contactLastName"] = "customer.contactLastName_is_required";
    }
    if (StringUtils.isBlank(customer.contactFirstName)) {
        errors["customer.contactFirstName"] = "customer.contactFirstName_is_required";
    }
    if (StringUtils.isBlank(customer.phone)) {
        errors["customer.phone"] = "customer.phone_is_required";
    }
    if (StringUtils.isBlank(customer.addressLine1)) {
        errors["customer.addressLine1"] = "customer.addressLine1_is_required";
    }
    if (StringUtils.isBlank(customer.city)) {
        errors["customer.city"] = "customer.city_is_required";
    }
    if (StringUtils.isBlank(customer.country)) {
        errors["customer.country"] = "customer.country_is_required";
    }

    return errors;
}
