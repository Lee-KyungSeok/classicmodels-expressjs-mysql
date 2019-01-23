/**
 Copyright(c) 2009-2019 by GGoons.
*/
const base64url = require('base64url');
const Const = require('../config/global.const');

exports.isBlank = (s) => {
    return !s || s.length==0 || s.match(/^\s*$/);
};

exports.isString = (s) => {
    return typeof s === "string";
};

exports.encodeBase64Url = (s) => {
    return base64url.encode(s.toString());
};

exports.encodeBase64 = (s) => {
    return new Buffer(s.toString()).toString("base64");
};

exports.decodeBase64 = (s) => {
    return Buffer.from(s, "base64");
};

exports.pad = (n, width, z="0") => {
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
};

    /**
    * convert string to byte.
    */
exports.toByte = (s) => module.exports.toNumber(s);

    /**
    * convert string to Byte or array of Byte.
    */
exports.toByteOrByteArray = (s) => module.exports.toNumberOrNumberArray(s);

    /**
    * convert string to short.
    */
exports.toShort = (s) => module.exports.toNumber(s);

    /**
    * convert string to Short or array of Short.
    */
exports.toShortOrShortArray = (s) => module.exports.toNumberOrNumberArray(s);

    /**
    * convert string to integer.
    */
exports.toInteger = (s) => module.exports.toNumber(s);

    /**
    * convert string to integer or array of integer.
    */
exports.toIntegerOrIntegerArray = (s) => module.exports.toNumberOrNumberArray(s);

    /**
    * convert string to Long.
    */
exports.toLong = (s) => module.exports.toNumber(s);

    /**
    * convert string to Long or array of Long.
    */
exports.toLongOrLongArray = (s) => module.exports.toNumberOrNumberArray(s);

    /**
    * convert string to number.
    */
exports.toNumber = (s) => {
    try {
        if (s.includes(".")) {
            return parseFloat(s);
        }
        else {
            return parseInt(s);
        }
    }
    catch(e) {
        throw new Error(e);
    }

};

    /**
    * convert string to number or array of number.
    */
exports.toNumberOrNumberArray = (s) => {
    if (s.includes(",")) {
        let ss = s.split(Const.RE_COMMA);
        return ss.map(str => module.exports.toNumber(str));
    }
    else {
        return exports.toNumber(s);
    }
};

    /**
    * convert string to date.
    */
exports.toDate = (s) => {
    const date = new Date(s);
    if (date.toString() === "Invalid Date") {
        throw new Error(s+": Invalid Date");
    }
    return date;
}

    /**
    * convert string to date or array of date.
    */
exports.toDateOrDateArray = (s) => {
    if (s.includes(",")) {
        let ss = s.split(Const.RE_COMMA);
        return ss.map(str => module.exports.toDate(str));
    }
    else {
        return module.exports.toDate(s);
    }
};

exports.toTimestampOrTimestampArray = (s) => module.exports.toDateOrDateArray(s);
exports.toTimeOrTimeArray = (s) => module.exports.toDateOrDateArray(s);

exports.convertTo = (s, clazz) => {
    if (clazz === "number") {
        return module.exports.toNumberOrNumberArray(s);
    } else if (clazz === "Date") {
        return module.exports.toDateOrDateArray(s);
    } else {
        return s;
    }
};

const RE_EMAIL = /\S+@\S+\.\S+/;
exports.isValidEmailAddress = (email) => {
    return RE_EMAIL.test(email);
}
