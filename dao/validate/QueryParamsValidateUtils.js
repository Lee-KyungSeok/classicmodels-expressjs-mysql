/*
 Copyright(c) 2009-2019 by GGoons.
*/
const Const = require('../../config/global.const');
const ArrayUtils = require('../../utils/array.utils');
const MapUtils = require('../../utils/map.utils');
const StringUtils = require('../../utils/string.utils');

const controlKeys = ["page-no", "num-rows", "order-by", "group-by"];

/**
 */
exports.isControlKey = (key) => {
    return controlKeys.indexOf(key) >= 0;
};

/**
* convert key and value to BETWEEN operator.
* ex)
*	key: "orderDateFrom", "orderDateTo" => "orders.order_date BETWEEN"
*	val: String to Date.
*/
exports.validateBetweenParams = (params, arr) => {
    arr.forEach(e => {
        // is exist xxxFrom and xxxTo in params ?
        if (params.hasOwnProperty(e[0]) && params.hasOwnProperty(e[1])) {
            let v1 = params[e[0]]; delete params[e[0]];
            let v2 = params[e[1]]; delete params[e[1]];
            const datatype = e[3];
            if (StringUtils.isString(v1) && datatype !== "string") {
                v1 = StringUtils.convertTo(v1, datatype);
            }
            if (StringUtils.isString(v2) && datatype !== "string") {
                v2 = StringUtils.convertTo(v2, datatype);
            }
            params[e[2]] = [v1, v2];
        }
    });
};

/**
* 1. Check key name in given params to valid or not.
* 2. Translate key name from variable name in programming language to column name in DBMS.
* 3. Translate value for key from String to datatype for each column in DBMS.
*/
exports.paramsValidate = (params, columnNameMap) => {
    const keys = Object.keys(params);
    let arr = null;
    let rkey;
    let mkey;
    let value;
    let pair;
    let datatype;

    keys.forEach(key => {
        if (module.exports.isControlKey(key)) {
            return;
        }
        let withOp = false;
        if (key.includes(" ")) {	// is "<key> <op>"
            arr = key.split(" ");
            rkey = arr[0];
            withOp = true;
        } else {
            rkey = key;
        }
        if (columnNameMap.hasOwnProperty(rkey)) {
            pair = columnNameMap[rkey];
            if (pair[0] == null && pair[1] == null) {
                return;	// is only for name check ?
            }

            mkey = pair[0];
            datatype = pair[1];
            value = params[key];
            delete params[key];

            if (mkey == null) {		// no need to translate key name ?
                if (StringUtils.isString(value) && datatype === "string") {
                    return;		// no need to translate value either ?
                }
            }

            if (StringUtils.isString(value) && datatype !== "string") {
                value = StringUtils.convertTo(value, datatype);
            }

            if (mkey != null) {
                if (withOp && !mkey.includes(" ")) {
                    arr[0] = mkey;
                    mkey = arr.join(" ");
                }
            }
            else {
                mkey = key;	// only change value to key.
            }

            params[mkey] = value;
        }
        else {
            throw new Error("Unknown key column name for query: "+rkey);
        }
    });

    return params;
};

/**
*/
exports.validateJoinParams = (params, keyName, classes) => {
    if (params.hasOwnProperty(keyName)) {
        const val = params[keyName];
        if (StringUtils.isString(val)) {
            let stringValues = val.split(Const.RE_COMMA);
            if (stringValues.length != classes.length) {
                throw new Error("key length mismatch to "+keyName);
            }
            let valLength = stringValues.length;
            let values = new Array(valLength);

            for (let i=0 ; i<valLength ; i++) {
                let clazz = classes[i];
                let value = stringValues[i];
                if (clazz === "string") {
                    values[i] = value;
                } else {
                    values[i] = StringUtils.convertTo(value, clazz);
                }
            }

            params[keyName] = values;
        }
    }
};
