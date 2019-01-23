/*
 Copyright(c) 2009-2019 by GGoons.
*/

const { Observable, Observer } = require('rxjs');
const co = require('co');

const DataValidateException = require('../error/DataValidateException');
const PaymentDao = require('../dao/payment.dao');
const CustomerDao = require('../dao/customer.dao');
const PaymentQueryValidator = require('../dao/validate/PaymentQueryValidator');
const Env = require('../config/environment');
const HttpUtils = require('../utils/http.utils');
const StringUtils = require('../utils/string.utils');

const HttpErrorCode = 400;

// handlers for model

exports.save = (req, res) => {
    PaymentDao.save(req).subscribe(
        row => res.json(row),
        err => {
            console.log("Exception: ", err);
            res.status(HttpErrorCode).send(err)
        })
        ;
};

// handlers for primary key

exports.find = (req, res) => {
    PaymentDao.find(req).subscribe(
        row => res.json(row),
        err => {
            console.log("Exception: ", err);
            res.status(HttpErrorCode).send(err)
        })
        ;
};

exports.destroy = (req, res) => {
    PaymentDao.destroy(req).subscribe(
        rows => res.json({count:rows}),
        err => {
            console.log("Exception: ", err);
            res.status(HttpErrorCode).send(err)
        })
        ;
};

// handlers for conditions

exports.count = (req, res) => {
    PaymentDao.count(PaymentQueryValidator.validate(req)).subscribe(
        rows => res.json({count:rows}),
        err => {
            console.log("Exception: ", err);
            res.status(HttpErrorCode).send(err)
        })
        ;
};

exports.query = (req, res) => {
    PaymentDao.query(PaymentQueryValidator.validate(req)).subscribe(
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
    PaymentDao.update(columns, PaymentQueryValidator.validate(req)).subscribe(
        rows => res.json({count:rows}),
        err => {
            console.log("Exception: ", err);
            res.status(HttpErrorCode).send(err)
        })
        ;
};

exports.deletes = (req, res) => {
    PaymentDao.deletes(PaymentQueryValidator.validate(req)).subscribe(
        rows => res.json({count:rows}),
        err => {
            console.log("Exception: ", err);
            res.status(HttpErrorCode).send(err)
        })
        ;
};

    // handlers for tasks.

exports.list = (req, res) => {
    PaymentDao.getPaymentList(PaymentQueryValidator.validate(req)).subscribe(
        rows => res.json(rows),
        err => {
            console.log("Exception: ", err);
            res.status(HttpErrorCode).send(err)
        })
        ;
};

exports.listCount = (req, res) => {
    PaymentDao.getPaymentListCount(PaymentQueryValidator.validate(req)).subscribe(
        rows => res.json({count:rows}),
        err => {
            console.log("Exception: ", err);
            res.status(HttpErrorCode).send(err)
        })
        ;
};

exports.show = (req, res) => {
    PaymentDao.getPaymentShow(req).subscribe(
        rows => res.json(rows),
        err => {
            console.log("Exception: ", err);
            res.status(HttpErrorCode).send(err)
        })
        ;
};

exports.getPaymentEdit = (req, res) => {
    PaymentDao.find(req).subscribe(
        row => res.json(row),
        err => {
            console.log("Exception: ", err);
            res.status(HttpErrorCode).send(err)
        })
        ;
}

exports.edit = (req, res) => {
    const ef = req.body;
    PaymentDao.savePaymentEdit(req)
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

