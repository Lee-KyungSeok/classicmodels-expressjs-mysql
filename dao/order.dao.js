/*
 Copyright(c) 2009-2019 by GGoons.
*/
const { Observable } = require('rxjs');
const co = require('co');

const DataValidateException = require('../error/DataValidateException');
const CustomerDao = require('./customer.dao');
const OrderdetailDao = require('./orderdetail.dao');
const OrderValidator = require('../validator/order.validator');
const OrderEditValidator = require('../validator/orderEdit.validator');

const ArrayUtils = require('../utils/array.utils');
const DateUtils = require('../utils/date.utils');
const UploadUtils = require('../utils/upload.utils');
const Env = require('../config/environment')
const MapUtils = require('../utils/map.utils');
const QueryUtils = require('../utils/query.utils');
const PasswordUtils = require('../utils/password.utils');

const SELECT_SQL = 'SELECT * FROM orders ';
const COUNT_SQL  = 'SELECT COUNT(*) FROM orders ';
const DELETE_SQL = 'DELETE FROM orders ';
const UPDATE_SQL = 'UPDATE orders ';

// methods for model

exports.save = (req) => {
    const order = req.body;
    if (!order.orderNumber) {
        return exports.create(req);
    }
    return exports.find({params: {orderNumber: order.orderNumber}, getConnection: req.getConnection})
        .flatMap(row => {
            if (!row) {
                return exports.create(req);
            } else {
                return exports.updateRow(req);
            }
        });
};

exports.create = (req) => {
    const SQL = "INSERT INTO orders ("
        + "	orderNumber, orderDate, requiredDate, shippedDate, status, comments, customerNumber"
        + ") VALUES ("
        + "	?, ?, ?, ?, ?, ?, ?"
        + ")";
    const order = req.body;
    const values = [];
    values.push(order.orderNumber);
    values.push(order.orderDate);
    values.push(order.requiredDate);
    values.push(order.shippedDate);
    values.push(order.status);
    values.push(order.comments);
    values.push(order.customerNumber);
//console.log("save order: ", order);
    return Observable.of(order)

        .map(order => {
            const errors = OrderValidator.validate(order);
            if (!MapUtils.isEmpty(errors)) {
                throw new DataValidateException("validation fail.", errors);
            }
            return order;
        })
        .flatMap(order => QueryUtils.execute(req, SQL, values))
        .map(result => order)
        ;
};

exports.updateRow = (req) => {
    const SQL = "UPDATE orders SET "
        + "	orderNumber = ?, orderDate = ?, requiredDate = ?, shippedDate = ?, status = ?, comments = ?, customerNumber = ?"
        + " WHERE orderNumber = ?"
        ;
    const order = req.body;
    const values = [];
    values.push(order.orderNumber);
    values.push(order.orderDate);
    values.push(order.requiredDate);
    values.push(order.shippedDate);
    values.push(order.status);
    values.push(order.comments);
    values.push(order.customerNumber);
    values.push(order.orderNumber);
//console.log("save order: "+JSON.stringify(order));
    return Observable.of(order)
        .map(order => {
            const errors = OrderValidator.validate(order);
            if (!MapUtils.isEmpty(errors)) {
                throw new DataValidateException("validation fail.", errors);
            }
            return order;
        })
        .flatMap(order => QueryUtils.execute(req, SQL, values))
        ;
};

// methods for primary key

exports.find = (req) => {
    return Observable.of(req)
        .map((req) => {
            if (!req.params || !req.params.orderNumber) {
                throw new Error("Illegal argument");
            }
            return Observable.of(["WHERE orders.orderNumber = ?", [req.params.orderNumber]]);
        })
        .flatMap(([conditions, values]) => QueryUtils.query(req, SELECT_SQL+conditions, values))
        .map(rows => rows instanceof Array ? rows[0] : rows)
        ;
};

exports.destroy = (req) => {
    return Observable.of(req)
        .map((req) => {
            if (!req.params || !req.params.orderNumber) {
                throw new Error("Illegal argument");
            }
            return Observable.of(["WHERE orders.orderNumber = ?", [req.params.orderNumber]]);
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
exports.getOrderList = (req) => {
    const sql4OrderList = "SELECT " +
        "orders.orderNumber, " +
        "orders.orderDate, " +
        "orders.requiredDate, " +
        "orders.shippedDate, " +
        "orders.status, " +
        "orders.comments, " +
        "orders.customerNumber " +
        "FROM orders  ";

    const params = {};
    Object.assign(params, req.params, req.query, req.body);
    return Observable.of(params)
        .flatMap(params => QueryUtils.make_conditions_and_values_by(params))
        .flatMap(([conditions, values]) => QueryUtils.query(req, sql4OrderList + conditions, values))
        ;
};

/**
 */
exports.getOrderListCount = (req) => {
    const count4OrderList = "SELECT COUNT(*)"
        + "FROM orders  ";

    return QueryUtils.get_params(req)
        .flatMap(params => QueryUtils.make_conditions_and_values_by(params))
        .flatMap(([conditions, values]) => QueryUtils.query(req, count4OrderList + conditions, values))
        .map(rows => rows[0]["COUNT(*)"])
        ;
};

/**
 */
exports.getOrderShow = (req) => {
    const sql4OrderShow = "SELECT " +
        "orders.orderNumber, " +
        "orders.orderDate, " +
        "orders.requiredDate, " +
        "orders.shippedDate, " +
        "orders.status, " +
        "orders.comments, " +
        "orders.customerNumber " +
        "FROM orders  ";

    return Observable.of(req)
        .flatMap((req) => {
            if (!req.params || !req.params.orderNumber) {
                throw new Error("Illegal argument");
            }
            return Observable.of(["WHERE orders.orderNumber = ?", [req.params.orderNumber]]);
        })
        .flatMap(([conditions, values]) => QueryUtils.query(req, sql4OrderShow + conditions, values))
        .map(rows => rows instanceof Array ? rows[0] : rows)
        ;
};
/**
 */
exports.saveOrderEdit = (req) => {
    const ef = req.body;
//console.log("edit ef: "+JSON.stringify(ef));
    return Observable.of(ef)

        .flatMap(ef => {
            const order = ef.order;
            const errors = OrderEditValidator.validate(ef);
            if (!MapUtils.isEmpty(errors)) {
                throw new DataValidateException('validation fail.', errors);
            }

            // save order.
            return module.exports.save({body:order, getConnection:req.getConnection})
                .flatMap(result => {
                    return Observable.of(ef);
                }).map(x => ef);
        })
        ;
};

