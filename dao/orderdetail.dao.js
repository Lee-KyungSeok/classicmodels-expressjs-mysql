/*
 Copyright(c) 2009-2019 by GGoons.
*/
const { Observable } = require('rxjs');
const co = require('co');

const DataValidateException = require('../error/DataValidateException');
const OrderDao = require('./order.dao');
const ProductDao = require('./product.dao');
const OrderdetailValidator = require('../validator/orderdetail.validator');
const OrderdetailEditValidator = require('../validator/orderdetailEdit.validator');

const ArrayUtils = require('../utils/array.utils');
const DateUtils = require('../utils/date.utils');
const UploadUtils = require('../utils/upload.utils');
const Env = require('../config/environment')
const MapUtils = require('../utils/map.utils');
const QueryUtils = require('../utils/query.utils');
const PasswordUtils = require('../utils/password.utils');

const SELECT_SQL = 'SELECT * FROM orderdetails ';
const COUNT_SQL  = 'SELECT COUNT(*) FROM orderdetails ';
const DELETE_SQL = 'DELETE FROM orderdetails ';
const UPDATE_SQL = 'UPDATE orderdetails ';

// methods for model

exports.save = (req) => {
    const orderdetail = req.body;
    if (!orderdetail.orderNumber || !orderdetail.productCode) {
        return exports.create(req);
    }
    return exports.find({params: {orderNumber: orderdetail.orderNumber, productCode: orderdetail.productCode}, getConnection: req.getConnection})
        .flatMap(row => {
            if (!row) {
                return exports.create(req);
            } else {
                return exports.updateRow(req);
            }
        });
};

exports.create = (req) => {
    const SQL = "INSERT INTO orderdetails ("
        + "	orderNumber, productCode, quantityOrdered, priceEach, orderLineNumber"
        + ") VALUES ("
        + "	?, ?, ?, ?, ?"
        + ")";
    const orderdetail = req.body;
    const values = [];
    values.push(orderdetail.orderNumber);
    values.push(orderdetail.productCode);
    values.push(orderdetail.quantityOrdered);
    values.push(orderdetail.priceEach);
    values.push(orderdetail.orderLineNumber);
//console.log("save orderdetail: ", orderdetail);
    return Observable.of(orderdetail)

        .map(orderdetail => {
            const errors = OrderdetailValidator.validate(orderdetail);
            if (!MapUtils.isEmpty(errors)) {
                throw new DataValidateException("validation fail.", errors);
            }
            return orderdetail;
        })
        .flatMap(orderdetail => QueryUtils.execute(req, SQL, values))
        .map(result => orderdetail)
        ;
};

exports.updateRow = (req) => {
    const SQL = "UPDATE orderdetails SET "
        + "	orderNumber = ?, productCode = ?, quantityOrdered = ?, priceEach = ?, orderLineNumber = ?"
        + " WHERE orderNumber = ? AND productCode = ?"
        ;
    const orderdetail = req.body;
    const values = [];
    values.push(orderdetail.orderNumber);
    values.push(orderdetail.productCode);
    values.push(orderdetail.quantityOrdered);
    values.push(orderdetail.priceEach);
    values.push(orderdetail.orderLineNumber);
    values.push(orderdetail.orderNumber);
    values.push(orderdetail.productCode);
//console.log("save orderdetail: "+JSON.stringify(orderdetail));
    return Observable.of(orderdetail)
        .map(orderdetail => {
            const errors = OrderdetailValidator.validate(orderdetail);
            if (!MapUtils.isEmpty(errors)) {
                throw new DataValidateException("validation fail.", errors);
            }
            return orderdetail;
        })
        .flatMap(orderdetail => QueryUtils.execute(req, SQL, values))
        ;
};

// methods for primary key

exports.find = (req) => {
    return Observable.of(req)
        .map((req) => {
            const params = (req.params || []);
            const args = [params.orderNumber, params.productCode].filter(key => key);
            if (args.length != 2) {
                throw new Error("Illegal argument");
            }
            return Observable.of(["WHERE orderdetails.orderNumber = ? AND orderdetails.productCode = ?", args]);
        })
        .flatMap(([conditions, values]) => QueryUtils.query(req, SELECT_SQL+conditions, values))
        .map(rows => rows instanceof Array ? rows[0] : rows)
        ;
};

exports.destroy = (req) => {
    return Observable.of(req)
        .map((req) => {
            const params = (req.params || []);
            const args = [params.orderNumber, params.productCode].filter(key => key);
            if (args.length != 2) {
                throw new Error("Illegal argument");
            }
            return Observable.of(["WHERE orderdetails.orderNumber = ? AND orderdetails.productCode = ?", args]);
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
exports.getOrderdetailList = (req) => {
    const sql4OrderdetailList = "SELECT " +
        "orderdetails.orderNumber, " +
        "orderdetails.productCode, " +
        "orderdetails.quantityOrdered, " +
        "orderdetails.priceEach, " +
        "orderdetails.orderLineNumber " +
        "FROM orderdetails  ";

    const params = {};
    Object.assign(params, req.params, req.query, req.body);
    return Observable.of(params)
        .flatMap(params => QueryUtils.make_conditions_and_values_by(params))
        .flatMap(([conditions, values]) => QueryUtils.query(req, sql4OrderdetailList + conditions, values))
        ;
};

/**
 */
exports.getOrderdetailListCount = (req) => {
    const count4OrderdetailList = "SELECT COUNT(*)"
        + "FROM orderdetails  ";

    return QueryUtils.get_params(req)
        .flatMap(params => QueryUtils.make_conditions_and_values_by(params))
        .flatMap(([conditions, values]) => QueryUtils.query(req, count4OrderdetailList + conditions, values))
        .map(rows => rows[0]["COUNT(*)"])
        ;
};

/**
 */
exports.getOrderdetailShow = (req) => {
    const sql4OrderdetailShow = "SELECT " +
        "orderdetails.orderNumber, " +
        "orderdetails.productCode, " +
        "orderdetails.quantityOrdered, " +
        "orderdetails.priceEach, " +
        "orderdetails.orderLineNumber " +
        "FROM orderdetails  ";

    return Observable.of(req)
        .flatMap((req) => {
            const params = (req.params || []);
            const args = [params.orderNumber, params.productCode].filter(key => key);
            if (args.length != 2) {
                throw new Error("Illegal argument");
            }
            return Observable.of(["WHERE orderdetails.orderNumber = ? AND orderdetails.productCode = ?", args]);
        })
        .flatMap(([conditions, values]) => QueryUtils.query(req, sql4OrderdetailShow + conditions, values))
        .map(rows => rows instanceof Array ? rows[0] : rows)
        ;
};
/**
 */
exports.saveOrderdetailEdit = (req) => {
    const ef = req.body;
//console.log("edit ef: "+JSON.stringify(ef));
    return Observable.of(ef)

        .flatMap(ef => {
            const orderdetail = ef.orderdetail;
            const errors = OrderdetailEditValidator.validate(ef);
            if (!MapUtils.isEmpty(errors)) {
                throw new DataValidateException('validation fail.', errors);
            }

            // save orderdetail.
            return module.exports.save({body:orderdetail, getConnection:req.getConnection})
                .flatMap(result => {
                    return Observable.of(ef);
                }).map(x => ef);
        })
        ;
};

