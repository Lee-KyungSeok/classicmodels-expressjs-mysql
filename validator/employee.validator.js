/**
 Copyright(c) 2009-2019 by GGoons.
*/
const StringUtils = require('../utils/string.utils');

/**
* validate model Employee
*
* @param employee model for validate.
* @param errors storage to result of validation.
*/
exports.validate = (employee) => {
    const errors = {};
    if (StringUtils.isBlank(employee.lastName))
        errors["lastName"] = "FIXME: lastName is required.";

    if (StringUtils.isBlank(employee.firstName))
        errors["firstName"] = "FIXME: firstName is required.";

    if (StringUtils.isBlank(employee.extension))
        errors["extension"] = "FIXME: extension is required.";

    if (StringUtils.isBlank(employee.email))
        errors["email"] = "FIXME: email is required.";

    if (!!employee.email && !StringUtils.isValidEmailAddress(employee.email))
        errors["email"] = "FIXME: invalid pattern";
    if (StringUtils.isBlank(employee.officeCode))
        errors["officeCode"] = "FIXME: officeCode is required.";

    if (StringUtils.isBlank(employee.jobTitle))
        errors["jobTitle"] = "FIXME: jobTitle is required.";

    return errors;
};
