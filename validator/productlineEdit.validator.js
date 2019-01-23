/*
 Copyright(c) 2009-2019 by GGoons.
*/
const Const = require('../config/global.const');
const StringUtils = require('../utils/string.utils');

/**
*/
exports.validate = (ef) => {
    const errors = {};
    const productline = ef.productline;
    if (StringUtils.isBlank(productline.productLine)) {
        errors["productline.productLine"] = "productline.productLine_is_required";
    }
    if (productline.image && productline.image.length >= 16777215)
        errors["productline.image"] = "productline.image_is_too_big";

    return errors;
}
