/*
 Copyright(c) 2009-2019 by GGoons.
*/

const { Observable, Observer } = require('rxjs');
const co = require('co');

const DataValidateException = require('../error/DataValidateException');
const ProductlineDao = require('../dao/productline.dao');
const ProductDao = require('../dao/product.dao');
const ProductlineQueryValidator = require('../dao/validate/ProductlineQueryValidator');
const Env = require('../config/environment');
const HttpUtils = require('../utils/http.utils');
const StringUtils = require('../utils/string.utils');

const HttpErrorCode = 400;

// handlers for model

exports.save = (req, res) => {
    ProductlineDao.save(req).subscribe(
        row => res.json(row),
        err => {
            console.log("Exception: ", err);
            res.status(HttpErrorCode).send(err)
        })
        ;
};

// handlers for primary key

exports.find = (req, res) => {
    ProductlineDao.find(req).subscribe(
        row => res.json(row),
        err => {
            console.log("Exception: ", err);
            res.status(HttpErrorCode).send(err)
        })
        ;
};

exports.destroy = (req, res) => {
    ProductlineDao.destroy(req).subscribe(
        rows => res.json({count:rows}),
        err => {
            console.log("Exception: ", err);
            res.status(HttpErrorCode).send(err)
        })
        ;
};

// handlers for conditions

exports.count = (req, res) => {
    ProductlineDao.count(ProductlineQueryValidator.validate(req)).subscribe(
        rows => res.json({count:rows}),
        err => {
            console.log("Exception: ", err);
            res.status(HttpErrorCode).send(err)
        })
        ;
};

exports.query = (req, res) => {
    ProductlineDao.query(ProductlineQueryValidator.validate(req)).subscribe(
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
    ProductlineDao.update(columns, ProductlineQueryValidator.validate(req)).subscribe(
        rows => res.json({count:rows}),
        err => {
            console.log("Exception: ", err);
            res.status(HttpErrorCode).send(err)
        })
        ;
};

exports.deletes = (req, res) => {
    ProductlineDao.deletes(ProductlineQueryValidator.validate(req)).subscribe(
        rows => res.json({count:rows}),
        err => {
            console.log("Exception: ", err);
            res.status(HttpErrorCode).send(err)
        })
        ;
};

    // handlers for tasks.

exports.list = (req, res) => {
    ProductlineDao.getProductlineList(ProductlineQueryValidator.validate(req)).subscribe(
        rows => res.json(rows),
        err => {
            console.log("Exception: ", err);
            res.status(HttpErrorCode).send(err)
        })
        ;
};

exports.listCount = (req, res) => {
    ProductlineDao.getProductlineListCount(ProductlineQueryValidator.validate(req)).subscribe(
        rows => res.json({count:rows}),
        err => {
            console.log("Exception: ", err);
            res.status(HttpErrorCode).send(err)
        })
        ;
};

exports.show = (req, res) => {
    ProductlineDao.getProductlineShow(req).subscribe(
        rows => res.json(rows),
        err => {
            console.log("Exception: ", err);
            res.status(HttpErrorCode).send(err)
        })
        ;
};

exports.getProductlineEdit = (req, res) => {
    ProductlineDao.find(req).subscribe(
        row => res.json(row),
        err => {
            console.log("Exception: ", err);
            res.status(HttpErrorCode).send(err)
        })
        ;
}

exports.edit = (req, res) => {
    const ef = req.body;
    ProductlineDao.saveProductlineEdit(req)
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

