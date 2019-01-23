/*
 Copyright(c) 2009-2019 by GGoons.
*/
const Const = require('../config/global.const');
const StringUtils = require('../utils/string.utils');

/**
*/
exports.validate = (ef) => {
    const errors = {};
    const office = ef.office;
    if (StringUtils.isBlank(office.officeCode)) {
        errors["office.officeCode"] = "office.officeCode_is_required";
    }
    if (StringUtils.isBlank(office.city)) {
        errors["office.city"] = "office.city_is_required";
    }
    if (StringUtils.isBlank(office.phone)) {
        errors["office.phone"] = "office.phone_is_required";
    }
    if (StringUtils.isBlank(office.addressLine1)) {
        errors["office.addressLine1"] = "office.addressLine1_is_required";
    }
    if (StringUtils.isBlank(office.country)) {
        errors["office.country"] = "office.country_is_required";
    }
    if (StringUtils.isBlank(office.postalCode)) {
        errors["office.postalCode"] = "office.postalCode_is_required";
    }
    if (StringUtils.isBlank(office.territory)) {
        errors["office.territory"] = "office.territory_is_required";
    }

    return errors;
}
