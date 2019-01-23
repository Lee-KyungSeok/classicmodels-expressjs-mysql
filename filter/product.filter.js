/*
 Copyright(c) 2009-2019 by GGoons.
*/

const MapUtils = require('../utils/map.utils');

/**
*/
exports.sync = (orgParams) => {
    const params = {};
    const keys = {};
    Object.assign(params, orgParams);
    Object.keys(params).forEach(key => {
        if (MapUtils.putIfEquals(keys, key, "msrp", [null, "products.MSRP"])) return;
        if (MapUtils.putIfEquals(keys, key, "MSRP", [null, "products.MSRP"])) return;
        if (MapUtils.putIfStartsWith(keys, key, "msrp ", ["msrp ", "products.MSRP "])) return;
    });

    Object.keys(keys).forEach(key => {
        const val = keys[key];
        if (null == val[0]) {
            params[val[1]] = params[key];
            delete params[key];
        }
        else {
            MapUtils.changeKey(params, key, val[0], val[1]);
        }
    });

    return params;
};
