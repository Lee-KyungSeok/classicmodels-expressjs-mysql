/*
 Copyright(c) 2009-2019 by GGoons.
*/
const Const = require('../config/global.const');
const StringUtils = require('../utils/string.utils');

/**
*/
exports.validate = (ef) => {
    const errors = {};
    const product = ef.product;
    if (StringUtils.isBlank(product.productCode)) {
        errors["product.productCode"] = "product.productCode_is_required";
    }
    if (StringUtils.isBlank(product.productName)) {
        errors["product.productName"] = "product.productName_is_required";
    }
    if (StringUtils.isBlank(product.productScale)) {
        errors["product.productScale"] = "product.productScale_is_required";
    }
    if (StringUtils.isBlank(product.productVendor)) {
        errors["product.productVendor"] = "product.productVendor_is_required";
    }
    if (!product.productDescription) {
        errors["product.productDescription"] = "product.productDescription_is_required";
    }
    if (!product.quantityInStock) {
        errors["product.quantityInStock"] = "product.quantityInStock_is_required";
    }
    if (!product.buyPrice) {
        errors["product.buyPrice"] = "product.buyPrice_is_required";
    }
    if (!product.msrp) {
        errors["product.msrp"] = "product.msrp_is_required";
    }
    if (StringUtils.isBlank(product.productLine))
        errors["product.productLine"] = "product.productLine_is_required";

    return errors;
}
