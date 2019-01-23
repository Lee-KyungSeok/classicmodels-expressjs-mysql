/**
 Copyright(c) 2009-2019 by GGoons.
*/
const StringUtils = require('../utils/string.utils');

/**
* validate model Product
*
* @param product model for validate.
* @param errors storage to result of validation.
*/
exports.validate = (product) => {
    const errors = {};
    if (StringUtils.isBlank(product.productName))
        errors["productName"] = "FIXME: productName is required.";

    if (StringUtils.isBlank(product.productLine))
        errors["productLine"] = "FIXME: productLine is required.";

    if (StringUtils.isBlank(product.productScale))
        errors["productScale"] = "FIXME: productScale is required.";

    if (StringUtils.isBlank(product.productVendor))
        errors["productVendor"] = "FIXME: productVendor is required.";

    if (StringUtils.isBlank(product.productDescription))
        errors["productDescription"] = "FIXME: productDescription is required.";

    if (!product.quantityInStock)
        errors["quantityInStock"] = "FIXME: quantityInStock is required.";

    if (!product.buyPrice)
        errors["buyPrice"] = "FIXME: buyPrice is required.";

    if (!product.msrp)
        errors["msrp"] = "FIXME: msrp is required.";

    return errors;
};
