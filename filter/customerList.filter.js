/*
 Copyright(c) 2009-2019 by GGoons.
*/

const MapUtils = require('../utils/map.utils');
const g_const = require('../config/global.const');

/**
*/
exports.sync = (orgParams) => {
    const map = MapUtils.compact(orgParams);
//console.log("sync(): map = "+JSON.stringify(map));

    if (!map.hasOwnProperty("num-rows"))
        map["num-rows"] = "20";
    if (!map.hasOwnProperty("num-pages"))
        map["num-pages"] = "10";
    if (map.hasOwnProperty("city")) {
        map["customers.city like"] = map["city"];
        delete map['city'];
    }
    if (map.hasOwnProperty("state")) {
        map["customers.state like"] = map["state"];
        delete map['state'];
    }
    if (map.hasOwnProperty("employeeSalesRepEmployeeNumber")) {
        map["customers.salesRepEmployeeNumber ="] = map["employeeSalesRepEmployeeNumber"];
        delete map["employeeSalesRepEmployeeNumber"];
    }

    return map;
};
