/*
 Copyright(c) 2009-2019 by GGoons.
*/
const { Observable } = require('rxjs');
const co = require('co');

const DataValidateException = require('../error/DataValidateException');
const EmployeeDao = require('./employee.dao');
const OrderDao = require('./order.dao');
const PaymentDao = require('./payment.dao');
const CustomerValidator = require('../validator/customer.validator');
const CustomerEditValidator = require('../validator/customerEdit.validator');

const ArrayUtils = require('../utils/array.utils');
const DateUtils = require('../utils/date.utils');
const UploadUtils = require('../utils/upload.utils');
const Env = require('../config/environment')
const MapUtils = require('../utils/map.utils');
const QueryUtils = require('../utils/query.utils');
const PasswordUtils = require('../utils/password.utils');

const SELECT_SQL = 'SELECT * FROM customers ';
const COUNT_SQL  = 'SELECT COUNT(*) FROM customers ';
const DELETE_SQL = 'DELETE FROM customers ';
const UPDATE_SQL = 'UPDATE customers ';

// methods for model

exports.save = (req) => {
    const customer = req.body;
    if (!customer.customerNumber) {
        return exports.create(req);
    }
    return exports.find({params: {customerNumber: customer.customerNumber}, getConnection: req.getConnection})
        .flatMap(row => {
            if (!row) {
                return exports.create(req);
            } else {
                return exports.updateRow(req);
            }
        });
};

exports.create = (req) => {
    const SQL = "INSERT INTO customers ("
        + "	customerNumber, customerName, contactLastName, contactFirstName, phone, addressLine1, addressLine2, city, state, postalCode, country, salesRepEmployeeNumber, creditLimit"
        + ") VALUES ("
        + "	?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?"
        + ")";
    const customer = req.body;
    const values = [];
    values.push(customer.customerNumber);
    values.push(customer.customerName);
    values.push(customer.contactLastName);
    values.push(customer.contactFirstName);
    values.push(customer.phone);
    values.push(customer.addressLine1);
    values.push(customer.addressLine2);
    values.push(customer.city);
    values.push(customer.state);
    values.push(customer.postalCode);
    values.push(customer.country);
    values.push(customer.salesRepEmployeeNumber);
    values.push(customer.creditLimit);
//console.log("save customer: ", customer);
    return Observable.of(customer)

        .map(customer => {
            const errors = CustomerValidator.validate(customer);
            if (!MapUtils.isEmpty(errors)) {
                throw new DataValidateException("validation fail.", errors);
            }
            return customer;
        })
        .flatMap(customer => QueryUtils.execute(req, SQL, values))
        .map(result => customer)
        ;
};

exports.updateRow = (req) => {
    const SQL = "UPDATE customers SET "
        + "	customerNumber = ?, customerName = ?, contactLastName = ?, contactFirstName = ?, phone = ?, addressLine1 = ?, addressLine2 = ?, city = ?, state = ?, postalCode = ?, country = ?, salesRepEmployeeNumber = ?, creditLimit = ?"
        + " WHERE customerNumber = ?"
        ;
    const customer = req.body;
    const values = [];
    values.push(customer.customerNumber);
    values.push(customer.customerName);
    values.push(customer.contactLastName);
    values.push(customer.contactFirstName);
    values.push(customer.phone);
    values.push(customer.addressLine1);
    values.push(customer.addressLine2);
    values.push(customer.city);
    values.push(customer.state);
    values.push(customer.postalCode);
    values.push(customer.country);
    values.push(customer.salesRepEmployeeNumber);
    values.push(customer.creditLimit);
    values.push(customer.customerNumber);
//console.log("save customer: "+JSON.stringify(customer));
    return Observable.of(customer)
        .map(customer => {
            const errors = CustomerValidator.validate(customer);
            if (!MapUtils.isEmpty(errors)) {
                throw new DataValidateException("validation fail.", errors);
            }
            return customer;
        })
        .flatMap(customer => QueryUtils.execute(req, SQL, values))
        ;
};

// methods for primary key

exports.find = (req) => {
    return Observable.of(req)
        .map((req) => {
            if (!req.params || !req.params.customerNumber) {
                throw new Error("Illegal argument");
            }
            return Observable.of(["WHERE customers.customerNumber = ?", [req.params.customerNumber]]);
        })
        .flatMap(([conditions, values]) => QueryUtils.query(req, SELECT_SQL+conditions, values))
        .map(rows => rows instanceof Array ? rows[0] : rows)
        ;
};

exports.destroy = (req) => {
    return Observable.of(req)
        .map((req) => {
            if (!req.params || !req.params.customerNumber) {
                throw new Error("Illegal argument");
            }
            return Observable.of(["WHERE customers.customerNumber = ?", [req.params.customerNumber]]);
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
exports.getCustomerList = (req) => {
    const sql4CustomerList = "SELECT " +
        "customers.customerNumber, " +
        "customers.customerName, " +
        "customers.city, " +
        "customers.country " +
        "FROM customers  ";

    const params = {};
    Object.assign(params, req.params, req.query, req.body);
    return Observable.of(params)
        .flatMap(params => QueryUtils.make_conditions_and_values_by(params))
        .flatMap(([conditions, values]) => QueryUtils.query(req, sql4CustomerList + conditions, values))
        ;
};

/**
 */
exports.getCustomerListCount = (req) => {
    const count4CustomerList = "SELECT COUNT(*)"
        + "FROM customers  ";

    return QueryUtils.get_params(req)
        .flatMap(params => QueryUtils.make_conditions_and_values_by(params))
        .flatMap(([conditions, values]) => QueryUtils.query(req, count4CustomerList + conditions, values))
        .map(rows => rows[0]["COUNT(*)"])
        ;
};

/**
 */
exports.getCustomerPaymentStatistic = (req) => {
    const sql4CustomerPaymentStatistic = "SELECT " +
        "customers.customerNumber, " +
        "payments.paymentDate AS paymentPaymentDate, " +
        "(SUM(payments.amount)) AS amount " +
        "FROM customers LEFT OUTER JOIN payments  ON customers.customerNumber=payments.customerNumber ";
    req.params["group-by"] = "customers.customerNumber, date_format(payments.paymentDate, '%Y'), date_format(payments.paymentDate, '%Y-%m')";

    const params = {};
    Object.assign(params, req.params, req.query, req.body);
    return Observable.of(params)
        .flatMap(params => QueryUtils.make_conditions_and_values_by(params))
        .flatMap(([conditions, values]) => QueryUtils.query(req, sql4CustomerPaymentStatistic + conditions, values))
        .map(rows => {
            return rows.map(customer => {
                const payment = {paymentDate:null};
                payment.paymentDate = customer.paymentPaymentDate
                delete customer.paymentPaymentDate;
                customer.__xtra__ = customer.__xtra__ || {};
                customer.__xtra__["Amount"] = customer.amount;
                delete customer.amount;
                customer.payments = customer.payments || [];
                customer.payments.push(payment);
                return customer;
            });
        })
        ;
};

/**
 */
exports.getCustomerShow = (req) => {
    const sql4CustomerShow = "SELECT " +
        "customers.customerNumber, " +
        "customers.customerName, " +
        "customers.contactLastName, " +
        "customers.contactFirstName, " +
        "customers.phone, " +
        "customers.addressLine1, " +
        "customers.addressLine2, " +
        "customers.city, " +
        "customers.state, " +
        "customers.postalCode, " +
        "customers.country, " +
        "customers.salesRepEmployeeNumber, " +
        "customers.creditLimit " +
        "FROM customers  ";

    return Observable.of(req)
        .flatMap((req) => {
            if (!req.params || !req.params.customerNumber) {
                throw new Error("Illegal argument");
            }
            return Observable.of(["WHERE customers.customerNumber = ?", [req.params.customerNumber]]);
        })
        .flatMap(([conditions, values]) => QueryUtils.query(req, sql4CustomerShow + conditions, values))
        .map(rows => rows instanceof Array ? rows[0] : rows)
        ;
};
/**
 */
exports.saveCustomerEdit = (req) => {
    const ef = req.body;
//console.log("edit ef: "+JSON.stringify(ef));
    return Observable.of(ef)

        .flatMap(ef => {
            const customer = ef.customer;
            const errors = CustomerEditValidator.validate(ef);
            if (!MapUtils.isEmpty(errors)) {
                throw new DataValidateException('validation fail.', errors);
            }

            // save customer.
            return module.exports.save({body:customer, getConnection:req.getConnection})
                .flatMap(result => {
                    return Observable.of(ef);
                }).map(x => ef);
        })
        ;
};

