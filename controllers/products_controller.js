/*
 Copyright(c) 2009-2019 by GGoons.
*/

const { Observable, Observer } = require('rxjs');
const co = require('co');

const DataValidateException = require('../error/DataValidateException');
const ProductDao = require('../dao/product.dao');
const ProductlineDao = require('../dao/productline.dao');
const OrderdetailDao = require('../dao/orderdetail.dao');
const ProductQueryValidator = require('../dao/validate/ProductQueryValidator');
const Env = require('../config/environment');
const HttpUtils = require('../utils/http.utils');
const StringUtils = require('../utils/string.utils');

const HttpErrorCode = 400;

// handlers for model

exports.save = (req, res) => {
    ProductDao.save(req).subscribe(
        row => res.json(row),
        err => {
            console.log("Exception: ", err);
            res.status(HttpErrorCode).send(err)
        })
        ;
};

// handlers for primary key

exports.find = (req, res) => {
    ProductDao.find(req).subscribe(
        row => res.json(row),
        err => {
            console.log("Exception: ", err);
            res.status(HttpErrorCode).send(err)
        })
        ;
};

exports.destroy = (req, res) => {
    ProductDao.destroy(req).subscribe(
        rows => res.json({count:rows}),
        err => {
            console.log("Exception: ", err);
            res.status(HttpErrorCode).send(err)
        })
        ;
};

// handlers for conditions

exports.count = (req, res) => {
    ProductDao.count(ProductQueryValidator.validate(req)).subscribe(
        rows => res.json({count:rows}),
        err => {
            console.log("Exception: ", err);
            res.status(HttpErrorCode).send(err)
        })
        ;
};

exports.query = (req, res) => {
    ProductDao.query(ProductQueryValidator.validate(req)).subscribe(
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
    ProductDao.update(columns, ProductQueryValidator.validate(req)).subscribe(
        rows => res.json({count:rows}),
        err => {
            console.log("Exception: ", err);
            res.status(HttpErrorCode).send(err)
        })
        ;
};

exports.deletes = (req, res) => {
    ProductDao.deletes(ProductQueryValidator.validate(req)).subscribe(
        rows => res.json({count:rows}),
        err => {
            console.log("Exception: ", err);
            res.status(HttpErrorCode).send(err)
        })
        ;
};

    // handlers for tasks.

exports.list = (req, res) => {
    ProductDao.getProductList(ProductQueryValidator.validate(req)).subscribe(
        rows => res.json(rows),
        err => {
            console.log("Exception: ", err);
            res.status(HttpErrorCode).send(err)
        })
        ;
};

exports.listCount = (req, res) => {
    ProductDao.getProductListCount(ProductQueryValidator.validate(req)).subscribe(
        rows => res.json({count:rows}),
        err => {
            console.log("Exception: ", err);
            res.status(HttpErrorCode).send(err)
        })
        ;
};

exports.show = (req, res) => {
    ProductDao.getProductShow(req).subscribe(
        rows => res.json(rows),
        err => {
            console.log("Exception: ", err);
            res.status(HttpErrorCode).send(err)
        })
        ;
};

exports.getProductEdit = (req, res) => {
    ProductDao.find(req).subscribe(
        row => res.json(row),
        err => {
            console.log("Exception: ", err);
            res.status(HttpErrorCode).send(err)
        })
        ;
}

exports.edit = (req, res) => {
    const ef = req.body;
    ProductDao.saveProductEdit(req)
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
