/*
 Copyright(c) 2009-2019 by GGoons.
*/
const { Observable } = require('rxjs');
const co = require('co');

const DataValidateException = require('../error/DataValidateException');
const ProductDao = require('./product.dao');
const ProductlineValidator = require('../validator/productline.validator');
const ProductlineEditValidator = require('../validator/productlineEdit.validator');

const ArrayUtils = require('../utils/array.utils');
const DateUtils = require('../utils/date.utils');
const UploadUtils = require('../utils/upload.utils');
const Env = require('../config/environment')
const MapUtils = require('../utils/map.utils');
const QueryUtils = require('../utils/query.utils');
const PasswordUtils = require('../utils/password.utils');

const SELECT_SQL = 'SELECT * FROM productlines ';
const COUNT_SQL  = 'SELECT COUNT(*) FROM productlines ';
const DELETE_SQL = 'DELETE FROM productlines ';
const UPDATE_SQL = 'UPDATE productlines ';

// methods for model

exports.save = (req) => {
    const productline = req.body;
    if (!productline.productLine) {
        return exports.create(req);
    }
    return exports.find({params: {productLine: productline.productLine}, getConnection: req.getConnection})
        .flatMap(row => {
            if (!row) {
                return exports.create(req);
            } else {
                return exports.updateRow(req);
            }
        });
};

exports.create = (req) => {
    const SQL = "INSERT INTO productlines ("
        + "	productLine, textDescription, htmlDescription, image"
        + ") VALUES ("
        + "	?, ?, ?, ?"
        + ")";
    const productline = req.body;
    const values = [];
    values.push(productline.productLine);
    values.push(productline.textDescription);
    values.push(productline.htmlDescription);
    values.push(productline.image);
//console.log("save productline: ", productline);
    return Observable.of(productline)

        .map(productline => {
            const errors = ProductlineValidator.validate(productline);
            if (!MapUtils.isEmpty(errors)) {
                throw new DataValidateException("validation fail.", errors);
            }
            return productline;
        })
        .flatMap(productline => QueryUtils.execute(req, SQL, values))
        .map(result => productline)
        ;
};

exports.updateRow = (req) => {
    const SQL = "UPDATE productlines SET "
        + "	productLine = ?, textDescription = ?, htmlDescription = ?, image = ?"
        + " WHERE productLine = ?"
        ;
    const productline = req.body;
    const values = [];
    values.push(productline.productLine);
    values.push(productline.textDescription);
    values.push(productline.htmlDescription);
    values.push(productline.image);
    values.push(productline.productLine);
//console.log("save productline: "+JSON.stringify(productline));
    return Observable.of(productline)
        .map(productline => {
            const errors = ProductlineValidator.validate(productline);
            if (!MapUtils.isEmpty(errors)) {
                throw new DataValidateException("validation fail.", errors);
            }
            return productline;
        })
        .flatMap(productline => QueryUtils.execute(req, SQL, values))
        ;
};

// methods for primary key

exports.find = (req) => {
    return Observable.of(req)
        .map((req) => {
            if (!req.params || !req.params.productLine) {
                throw new Error("Illegal argument");
            }
            return Observable.of(["WHERE productlines.productLine = ?", [req.params.productLine]]);
        })
        .flatMap(([conditions, values]) => QueryUtils.query(req, SELECT_SQL+conditions, values))
        .map(rows => rows instanceof Array ? rows[0] : rows)
        ;
};

exports.destroy = (req) => {
    return Observable.of(req)
        .map((req) => {
            if (!req.params || !req.params.productLine) {
                throw new Error("Illegal argument");
            }
            return Observable.of(["WHERE productlines.productLine = ?", [req.params.productLine]]);
        })
        .flatMap(([conditions, values]) => QueryUtils.query(req, DELETE_SQL+conditions, values))
        ;
};

// methods for conditions

exports.count = (req) => {
    return QueryUtils.make_where_clause(req)
        .flatMap(([conditions, values]) => QueryUtils.query(req, COUNT_SQL+conditions, values))
        .map(rows => rows[0]["COUNT(*)"])
        ;
};

exports.query = (req) => {
    return QueryUtils.make_where_clause(req)
        .flatMap(([conditions, values]) => QueryUtils.query(req, SELECT_SQL+conditions, values))
        ;
};

exports.queryForObject = (req) => {
    return module.exports.query(req)
        .map(rows => rows instanceof Array ? rows[0] : rows)
        ;
};

exports.update = (columns, req) => {
    return QueryUtils.make_where_clause(req)
        .flatMap(([conditions, values]) => {
            const colVals = Object.keys(columns).map(col => col+"="+columns[col]);
            const sql = UPDATE_SQL + " SET " + colVals.join(', ') + ' ';
            return QueryUtils.query(req, sql+conditions, values);
        });
};

exports.deletes = (req) => {
    return QueryUtils.make_where_clause(req)
        .flatMap(([conditions, values]) => QueryUtils.query(req, DELETE_SQL+conditions, values))
        ;
};

// methods for tasks.

/**
 */
exports.getProductlineList = (req) => {
    const sql4ProductlineList = "SELECT " +
        "productlines.productLine, " +
        "productlines.textDescription, " +
        "productlines.htmlDescription, " +
        "productlines.image " +
        "FROM productlines  ";

    const params = {};
    Object.assign(params, req.params, req.query, req.body);
    return Observable.of(params)
        .flatMap(params => QueryUtils.make_conditions_and_values_by(params))
        .flatMap(([conditions, values]) => QueryUtils.query(req, sql4ProductlineList + conditions, values))
        ;
};

/**
 */
exports.getProductlineListCount = (req) => {
    const count4ProductlineList = "SELECT COUNT(*)"
        + "FROM productlines  ";

    return QueryUtils.get_params(req)
        .flatMap(params => QueryUtils.make_conditions_and_values_by(params))
        .flatMap(([conditions, values]) => QueryUtils.query(req, count4ProductlineList + conditions, values))
        .map(rows => rows[0]["COUNT(*)"])
        ;
};

/**
 */
exports.getProductlineShow = (req) => {
    const sql4ProductlineShow = "SELECT " +
        "productlines.productLine, " +
        "productlines.textDescription, " +
        "productlines.htmlDescription, " +
        "productlines.image " +
        "FROM productlines  ";

    return Observable.of(req)
        .flatMap((req) => {
            if (!req.params || !req.params.productLine) {
                throw new Error("Illegal argument");
            }
            return Observable.of(["WHERE productlines.productLine = ?", [req.params.productLine]]);
        })
        .flatMap(([conditions, values]) => QueryUtils.query(req, sql4ProductlineShow + conditions, values))
        .map(rows => rows instanceof Array ? rows[0] : rows)
        ;
};
/**
 */
exports.saveProductlineEdit = (req) => {
    const ef = req.body;
//console.log("edit ef: "+JSON.stringify(ef));
    return Observable.of(ef)

        .flatMap(ef => {
            const productline = ef.productline;
            const errors = ProductlineEditValidator.validate(ef);
            if (!MapUtils.isEmpty(errors)) {
                throw new DataValidateException('validation fail.', errors);
            }

            // save productline.
            return module.exports.save({body:productline, getConnection:req.getConnection})
                .flatMap(result => {
                    return Observable.of(ef);
                }).map(x => ef);
        })
        ;
};

