/*
 Copyright(c) 2009-2019 by GGoons.
*/
const { Observable } = require('rxjs');
const co = require('co');

const DataValidateException = require('../error/DataValidateException');
const CustomerDao = require('./customer.dao');
const PaymentValidator = require('../validator/payment.validator');
const PaymentEditValidator = require('../validator/paymentEdit.validator');

const ArrayUtils = require('../utils/array.utils');
const DateUtils = require('../utils/date.utils');
const UploadUtils = require('../utils/upload.utils');
const Env = require('../config/environment')
const MapUtils = require('../utils/map.utils');
const QueryUtils = require('../utils/query.utils');
const PasswordUtils = require('../utils/password.utils');

const SELECT_SQL = 'SELECT * FROM payments ';
const COUNT_SQL  = 'SELECT COUNT(*) FROM payments ';
const DELETE_SQL = 'DELETE FROM payments ';
const UPDATE_SQL = 'UPDATE payments ';

// methods for model

exports.save = (req) => {
    const payment = req.body;
    if (!payment.customerNumber || !payment.checkNumber) {
        return exports.create(req);
    }
    return exports.find({params: {customerNumber: payment.customerNumber, checkNumber: payment.checkNumber}, getConnection: req.getConnection})
        .flatMap(row => {
            if (!row) {
                return exports.create(req);
            } else {
                return exports.updateRow(req);
            }
        });
};

exports.create = (req) => {
    const SQL = "INSERT INTO payments ("
        + "	customerNumber, checkNumber, paymentDate, amount"
        + ") VALUES ("
        + "	?, ?, ?, ?"
        + ")";
    const payment = req.body;
    const values = [];
    values.push(payment.customerNumber);
    values.push(payment.checkNumber);
    values.push(payment.paymentDate);
    values.push(payment.amount);
//console.log("save payment: ", payment);
    return Observable.of(payment)

        .map(payment => {
            const errors = PaymentValidator.validate(payment);
            if (!MapUtils.isEmpty(errors)) {
                throw new DataValidateException("validation fail.", errors);
            }
            return payment;
        })
        .flatMap(payment => QueryUtils.execute(req, SQL, values))
        .map(result => payment)
        ;
};

exports.updateRow = (req) => {
    const SQL = "UPDATE payments SET "
        + "	customerNumber = ?, checkNumber = ?, paymentDate = ?, amount = ?"
        + " WHERE customerNumber = ? AND checkNumber = ?"
        ;
    const payment = req.body;
    const values = [];
    values.push(payment.customerNumber);
    values.push(payment.checkNumber);
    values.push(payment.paymentDate);
    values.push(payment.amount);
    values.push(payment.customerNumber);
    values.push(payment.checkNumber);
//console.log("save payment: "+JSON.stringify(payment));
    return Observable.of(payment)
        .map(payment => {
            const errors = PaymentValidator.validate(payment);
            if (!MapUtils.isEmpty(errors)) {
                throw new DataValidateException("validation fail.", errors);
            }
            return payment;
        })
        .flatMap(payment => QueryUtils.execute(req, SQL, values))
        ;
};

// methods for primary key

exports.find = (req) => {
    return Observable.of(req)
        .map((req) => {
            const params = (req.params || []);
            const args = [params.customerNumber, params.checkNumber].filter(key => key);
            if (args.length != 2) {
                throw new Error("Illegal argument");
            }
            return Observable.of(["WHERE payments.customerNumber = ? AND payments.checkNumber = ?", args]);
        })
        .flatMap(([conditions, values]) => QueryUtils.query(req, SELECT_SQL+conditions, values))
        .map(rows => rows instanceof Array ? rows[0] : rows)
        ;
};

exports.destroy = (req) => {
    return Observable.of(req)
        .map((req) => {
            const params = (req.params || []);
            const args = [params.customerNumber, params.checkNumber].filter(key => key);
            if (args.length != 2) {
                throw new Error("Illegal argument");
            }
            return Observable.of(["WHERE payments.customerNumber = ? AND payments.checkNumber = ?", args]);
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
exports.getPaymentList = (req) => {
    const sql4PaymentList = "SELECT " +
        "payments.customerNumber, " +
        "payments.checkNumber, " +
        "payments.paymentDate, " +
        "payments.amount " +
        "FROM payments  ";

    const params = {};
    Object.assign(params, req.params, req.query, req.body);
    return Observable.of(params)
        .flatMap(params => QueryUtils.make_conditions_and_values_by(params))
        .flatMap(([conditions, values]) => QueryUtils.query(req, sql4PaymentList + conditions, values))
        ;
};

/**
 */
exports.getPaymentListCount = (req) => {
    const count4PaymentList = "SELECT COUNT(*)"
        + "FROM payments  ";

    return QueryUtils.get_params(req)
        .flatMap(params => QueryUtils.make_conditions_and_values_by(params))
        .flatMap(([conditions, values]) => QueryUtils.query(req, count4PaymentList + conditions, values))
        .map(rows => rows[0]["COUNT(*)"])
        ;
};

/**
 */
exports.getPaymentShow = (req) => {
    const sql4PaymentShow = "SELECT " +
        "payments.customerNumber, " +
        "payments.checkNumber, " +
        "payments.paymentDate, " +
        "payments.amount " +
        "FROM payments  ";

    return Observable.of(req)
        .flatMap((req) => {
            const params = (req.params || []);
            const args = [params.customerNumber, params.checkNumber].filter(key => key);
            if (args.length != 2) {
                throw new Error("Illegal argument");
            }
            return Observable.of(["WHERE payments.customerNumber = ? AND payments.checkNumber = ?", args]);
        })
        .flatMap(([conditions, values]) => QueryUtils.query(req, sql4PaymentShow + conditions, values))
        .map(rows => rows instanceof Array ? rows[0] : rows)
        ;
};
/**
 */
exports.savePaymentEdit = (req) => {
    const ef = req.body;
//console.log("edit ef: "+JSON.stringify(ef));
    return Observable.of(ef)

        .flatMap(ef => {
            const payment = ef.payment;
            const errors = PaymentEditValidator.validate(ef);
            if (!MapUtils.isEmpty(errors)) {
                throw new DataValidateException('validation fail.', errors);
            }

            // save payment.
            return module.exports.save({body:payment, getConnection:req.getConnection})
                .flatMap(result => {
                    return Observable.of(ef);
                }).map(x => ef);
        })
        ;
};

