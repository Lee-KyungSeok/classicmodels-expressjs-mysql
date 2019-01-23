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
    if (map.hasOwnProperty("lastName")) {
        map["employees.lastName like"] = map["lastName"];
        delete map['lastName'];
    }
    if (map.hasOwnProperty("reportsToEmployeeReportsTo")) {
        map["employees.reportsTo ="] = map["reportsToEmployeeReportsTo"];
        delete map["reportsToEmployeeReportsTo"];
    }
    if (map.hasOwnProperty("officeOfficeCode")) {
        map["employees.officeCode ="] = map["officeOfficeCode"];
        delete map["officeOfficeCode"];
    }

    return map;
};
