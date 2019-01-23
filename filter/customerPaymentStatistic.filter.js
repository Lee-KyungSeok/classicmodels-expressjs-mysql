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

    let day;
    if (map.hasOwnProperty("customerNumber")) {
        map["customers.customerNumber in"] = map["customerNumber"];
        delete map['customerNumber'];
    }
    if (map.hasOwnProperty("paymentPaymentDateFrom") && map.hasOwnProperty("paymentPaymentDateTo")) {
        map["payments.paymentDate between"] = [new Date(map["paymentPaymentDateFrom"]), new Date(map["paymentPaymentDateTo"])];
        delete map['paymentPaymentDateFrom'];
        delete map['paymentPaymentDateTo'];
    }
    if (map.hasOwnProperty("employeeSalesRepEmployeeNumber")) {
        map["customers.salesRepEmployeeNumber ="] = map["employeeSalesRepEmployeeNumber"];
        delete map["employeeSalesRepEmployeeNumber"];
    }

    return map;
};
