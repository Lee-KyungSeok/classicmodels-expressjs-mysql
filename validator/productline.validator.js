/**
 Copyright(c) 2009-2019 by GGoons.
*/
const StringUtils = require('../utils/string.utils');

/**
* validate model Productline
*
* @param productline model for validate.
* @param errors storage to result of validation.
*/
exports.validate = (productline) => {
    const errors = {};

    if (!!productline.image && productline.image.length >= 16777215)
        errors["image"] = "FIXME: image value is too big.";

    return errors;
};
