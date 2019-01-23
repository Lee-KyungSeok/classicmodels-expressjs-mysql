/**
 Copyright(c) 2009-2019 by GGoons.
*/
const StringUtils = require('../utils/string.utils');

/**
* validate model Office
*
* @param office model for validate.
* @param errors storage to result of validation.
*/
exports.validate = (office) => {
    const errors = {};
    if (StringUtils.isBlank(office.city))
        errors["city"] = "FIXME: city is required.";

    if (StringUtils.isBlank(office.phone))
        errors["phone"] = "FIXME: phone is required.";

    if (StringUtils.isBlank(office.addressLine1))
        errors["addressLine1"] = "FIXME: addressLine1 is required.";

    if (StringUtils.isBlank(office.country))
        errors["country"] = "FIXME: country is required.";

    if (StringUtils.isBlank(office.postalCode))
        errors["postalCode"] = "FIXME: postalCode is required.";

    if (StringUtils.isBlank(office.territory))
        errors["territory"] = "FIXME: territory is required.";

    return errors;
};
