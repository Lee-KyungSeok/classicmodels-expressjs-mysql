/*
 Copyright(c) 2009-2019 by GGoons.
*/

const { Observable, Observer } = require('rxjs');
const co = require('co');

const DataValidateException = require('../error/DataValidateException');
const OrderDao = require('../dao/order.dao');
const CustomerDao = require('../dao/customer.dao');
const OrderdetailDao = require('../dao/orderdetail.dao');
const OrderQueryValidator = require('../dao/validate/OrderQueryValidator');
const Env = require('../config/environment');
const HttpUtils = require('../utils/http.utils');
const StringUtils = require('../utils/string.utils');

const HttpErrorCode = 400;

// handlers for model

exports.save = (req, res) => {
    OrderDao.save(req).subscribe(
        row => res.json(row),
        err => {
            console.log("Exception: ", err);
            res.status(HttpErrorCode).send(err)
        })
        ;
};

// handlers for primary key

exports.find = (req, res) => {
    OrderDao.find(req).subscribe(
        row => res.json(row),
        err => {
            console.log("Exception: ", err);
            res.status(HttpErrorCode).send(err)
        })
        ;
};

exports.destroy = (req, res) => {
    OrderDao.destroy(req).subscribe(
        rows => res.json({count:rows}),
        err => {
            console.log("Exception: ", err);
            res.status(HttpErrorCode).send(err)
        })
        ;
};

// handlers for conditions

exports.count = (req, res) => {
    OrderDao.count(OrderQueryValidator.validate(req)).subscribe(
        rows => res.json({count:rows}),
        err => {
            console.log("Exception: ", err);
            res.status(HttpErrorCode).send(err)
        })
        ;
};

exports.query = (req, res) => {
    OrderDao.query(OrderQueryValidator.validate(req)).subscribe(
        rows => res.json(rows),
        err => {
            console.log("Exception: ", err);
            res.status(HttpErrorCode).send(err)
        })
        ;
};

exports.update = (req, res) => {
    const columns = req.body;
    req.body = {};
    OrderDao.update(columns, OrderQueryValidator.validate(req)).subscribe(
        rows => res.json({count:rows}),
        err => {
            console.log("Exception: ", err);
            res.status(HttpErrorCode).send(err)
        })
        ;
};

exports.deletes = (req, res) => {
    OrderDao.deletes(OrderQueryValidator.validate(req)).subscribe(
        rows => res.json({count:rows}),
        err => {
            console.log("Exception: ", err);
            res.status(HttpErrorCode).send(err)
        })
        ;
};

    // handlers for tasks.

exports.list = (req, res) => {
    OrderDao.getOrderList(OrderQueryValidator.validate(req)).subscribe(
        rows => res.json(rows),
        err => {
            console.log("Exception: ", err);
            res.status(HttpErrorCode).send(err)
        })
        ;
};

exports.listCount = (req, res) => {
    OrderDao.getOrderListCount(OrderQueryValidator.validate(req)).subscribe(
        rows => res.json({count:rows}),
        err => {
            console.log("Exception: ", err);
            res.status(HttpErrorCode).send(err)
        })
        ;
};

exports.show = (req, res) => {
    OrderDao.getOrderShow(req).subscribe(
        rows => res.json(rows),
        err => {
            console.log("Exception: ", err);
            res.status(HttpErrorCode).send(err)
        })
        ;
};

exports.getOrderEdit = (req, res) => {
    OrderDao.find(req).subscribe(
        row => res.json(row),
        err => {
            console.log("Exception: ", err);
            res.status(HttpErrorCode).send(err)
        })
        ;
}

exports.edit = (req, res) => {
    const ef = req.body;
    OrderDao.saveOrderEdit(req)
        .subscribe(ef => res.json(ef),
            err => {
                if (err.hasOwnProperty("errors") && err.hasOwnProperty("message")) {
                    console.log("Validation fail: "+JSON.stringify(err));
                    ef.errors = err.errors;
                    res.json(ef);
                }
                else {
                    console.log("Error: "+err);
                    res.status(HttpErrorCode).send(err);
                }
            })
            ;

};

