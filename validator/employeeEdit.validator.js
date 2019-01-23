/*
 Copyright(c) 2009-2019 by GGoons.
*/
const Const = require('../config/global.const');
const StringUtils = require('../utils/string.utils');

/**
*/
exports.validate = (ef) => {
    const errors = {};
    const employee = ef.employee;
    if (!employee.employeeNumber) {
        errors["employee.employeeNumber"] = "employee.employeeNumber_is_required";
    }
    if (StringUtils.isBlank(employee.lastName)) {
        errors["employee.lastName"] = "employee.lastName_is_required";
    }
    if (StringUtils.isBlank(employee.firstName)) {
        errors["employee.firstName"] = "employee.firstName_is_required";
    }
    if (StringUtils.isBlank(employee.extension)) {
        errors["employee.extension"] = "employee.extension_is_required";
    }
    if (StringUtils.isBlank(employee.email)) {
        errors["employee.email"] = "employee.email_is_required";
    }
    else {
        if (!Const.RE_EMAIL.test(employee.email))
            errors["employee.email"] = "not_a_email_address";
    }
    if (StringUtils.isBlank(employee.jobTitle)) {
        errors["employee.jobTitle"] = "employee.jobTitle_is_required";
    }
    if (StringUtils.isBlank(employee.officeCode))
        errors["employee.officeCode"] = "employee.officeCode_is_required";

    return errors;
}
