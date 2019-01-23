/*
 Copyright(c) 2009-2019 by GGoons.
*/

const { Observable, Observer } = require('rxjs');
const co = require('co');

const DataValidateException = require('../error/DataValidateException');
const OfficeDao = require('../dao/office.dao');
const EmployeeDao = require('../dao/employee.dao');
const OfficeQueryValidator = require('../dao/validate/OfficeQueryValidator');
const Env = require('../config/environment');
const HttpUtils = require('../utils/http.utils');
const StringUtils = require('../utils/string.utils');

const HttpErrorCode = 400;

// handlers for model

exports.save = (req, res) => {
    OfficeDao.save(req).subscribe(
        row => res.json(row),
        err => {
            console.log("Exception: ", err);
            res.status(HttpErrorCode).send(err)
        })
        ;
};

// handlers for primary key

exports.find = (req, res) => {
    OfficeDao.find(req).subscribe(
        row => res.json(row),
        err => {
            console.log("Exception: ", err);
            res.status(HttpErrorCode).send(err)
        })
        ;
};

exports.destroy = (req, res) => {
    OfficeDao.destroy(req).subscribe(
        rows => res.json({count:rows}),
        err => {
            console.log("Exception: ", err);
            res.status(HttpErrorCode).send(err)
        })
        ;
};

// handlers for conditions

exports.count = (req, res) => {
    OfficeDao.count(OfficeQueryValidator.validate(req)).subscribe(
        rows => res.json({count:rows}),
        err => {
            console.log("Exception: ", err);
            res.status(HttpErrorCode).send(err)
        })
        ;
};

exports.query = (req, res) => {
    OfficeDao.query(OfficeQueryValidator.validate(req)).subscribe(
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
    OfficeDao.update(columns, OfficeQueryValidator.validate(req)).subscribe(
        rows => res.json({count:rows}),
        err => {
            console.log("Exception: ", err);
            res.status(HttpErrorCode).send(err)
        })
        ;
};

exports.deletes = (req, res) => {
    OfficeDao.deletes(OfficeQueryValidator.validate(req)).subscribe(
        rows => res.json({count:rows}),
        err => {
            console.log("Exception: ", err);
            res.status(HttpErrorCode).send(err)
        })
        ;
};

    // handlers for tasks.

exports.list = (req, res) => {
    OfficeDao.getOfficeList(OfficeQueryValidator.validate(req)).subscribe(
        rows => res.json(rows),
        err => {
            console.log("Exception: ", err);
            res.status(HttpErrorCode).send(err)
        })
        ;
};

exports.listCount = (req, res) => {
    OfficeDao.getOfficeListCount(OfficeQueryValidator.validate(req)).subscribe(
        rows => res.json({count:rows}),
        err => {
            console.log("Exception: ", err);
            res.status(HttpErrorCode).send(err)
        })
        ;
};

exports.map = (req, res) => {
    OfficeDao.getOfficeMap(OfficeQueryValidator.validate(req)).subscribe(
        rows => res.json(rows),
        err => {
            console.log("Exception: ", err);
            res.status(HttpErrorCode).send(err)
        })
        ;
};

exports.show = (req, res) => {
    OfficeDao.getOfficeShow(req).subscribe(
        rows => res.json(rows),
        err => {
            console.log("Exception: ", err);
            res.status(HttpErrorCode).send(err)
        })
        ;
};

exports.getOfficeEdit = (req, res) => {
    OfficeDao.find(req).subscribe(
        row => res.json(row),
        err => {
            console.log("Exception: ", err);
            res.status(HttpErrorCode).send(err)
        })
        ;
}

exports.edit = (req, res) => {
    const ef = req.body;
    OfficeDao.saveOfficeEdit(req)
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

