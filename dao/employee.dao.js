/*
 Copyright(c) 2009-2019 by GGoons.
*/
const { Observable } = require('rxjs');
const co = require('co');

const DataValidateException = require('../error/DataValidateException');
const OfficeDao = require('./office.dao');
const CustomerDao = require('./customer.dao');
const EmployeeValidator = require('../validator/employee.validator');
const EmployeeEditValidator = require('../validator/employeeEdit.validator');

const ArrayUtils = require('../utils/array.utils');
const DateUtils = require('../utils/date.utils');
const UploadUtils = require('../utils/upload.utils');
const Env = require('../config/environment')
const MapUtils = require('../utils/map.utils');
const QueryUtils = require('../utils/query.utils');
const PasswordUtils = require('../utils/password.utils');

const SELECT_SQL = 'SELECT * FROM employees ';
const COUNT_SQL  = 'SELECT COUNT(*) FROM employees ';
const DELETE_SQL = 'DELETE FROM employees ';
const UPDATE_SQL = 'UPDATE employees ';

// methods for model

exports.save = (req) => {
    const employee = req.body;
    if (!employee.employeeNumber) {
        return exports.create(req);
    }
    return exports.find({params: {employeeNumber: employee.employeeNumber}, getConnection: req.getConnection})
        .flatMap(row => {
            if (!row) {
                return exports.create(req);
            } else {
                return exports.updateRow(req);
            }
        });
};

exports.create = (req) => {
    const SQL = "INSERT INTO employees ("
        + "	employeeNumber, lastName, firstName, extension, email, officeCode, reportsTo, jobTitle"
        + ") VALUES ("
        + "	?, ?, ?, ?, ?, ?, ?, ?"
        + ")";
    const employee = req.body;
    const values = [];
    values.push(employee.employeeNumber);
    values.push(employee.lastName);
    values.push(employee.firstName);
    values.push(employee.extension);
    values.push(employee.email);
    values.push(employee.officeCode);
    values.push(employee.reportsTo);
    values.push(employee.jobTitle);
//console.log("save employee: ", employee);
    return Observable.of(employee)

        .map(employee => {
            const errors = EmployeeValidator.validate(employee);
            if (!MapUtils.isEmpty(errors)) {
                throw new DataValidateException("validation fail.", errors);
            }
            return employee;
        })
        .flatMap(employee => QueryUtils.execute(req, SQL, values))
        .map(result => employee)
        ;
};

exports.updateRow = (req) => {
    const SQL = "UPDATE employees SET "
        + "	employeeNumber = ?, lastName = ?, firstName = ?, extension = ?, email = ?, officeCode = ?, reportsTo = ?, jobTitle = ?"
        + " WHERE employeeNumber = ?"
        ;
    const employee = req.body;
    const values = [];
    values.push(employee.employeeNumber);
    values.push(employee.lastName);
    values.push(employee.firstName);
    values.push(employee.extension);
    values.push(employee.email);
    values.push(employee.officeCode);
    values.push(employee.reportsTo);
    values.push(employee.jobTitle);
    values.push(employee.employeeNumber);
//console.log("save employee: "+JSON.stringify(employee));
    return Observable.of(employee)
        .map(employee => {
            const errors = EmployeeValidator.validate(employee);
            if (!MapUtils.isEmpty(errors)) {
                throw new DataValidateException("validation fail.", errors);
            }
            return employee;
        })
        .flatMap(employee => QueryUtils.execute(req, SQL, values))
        ;
};

// methods for primary key

exports.find = (req) => {
    return Observable.of(req)
        .map((req) => {
            if (!req.params || !req.params.employeeNumber) {
                throw new Error("Illegal argument");
            }
            return Observable.of(["WHERE employees.employeeNumber = ?", [req.params.employeeNumber]]);
        })
        .flatMap(([conditions, values]) => QueryUtils.query(req, SELECT_SQL+conditions, values))
        .map(rows => rows instanceof Array ? rows[0] : rows)
        ;
};

exports.destroy = (req) => {
    return Observable.of(req)
        .map((req) => {
            if (!req.params || !req.params.employeeNumber) {
                throw new Error("Illegal argument");
            }
            return Observable.of(["WHERE employees.employeeNumber = ?", [req.params.employeeNumber]]);
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
exports.getEmployeeList = (req) => {
    const sql4EmployeeList = "SELECT " +
        "employees.employeeNumber, " +
        "employees.lastName, " +
        "employees.firstName, " +
        "employees.extension, " +
        "employees.email, " +
        "employees.officeCode, " +
        "employees.reportsTo, " +
        "employees.jobTitle " +
        "FROM employees  ";

    const params = {};
    Object.assign(params, req.params, req.query, req.body);
    return Observable.of(params)
        .flatMap(params => QueryUtils.make_conditions_and_values_by(params))
        .flatMap(([conditions, values]) => QueryUtils.query(req, sql4EmployeeList + conditions, values))
        ;
};

/**
 */
exports.getEmployeeListCount = (req) => {
    const count4EmployeeList = "SELECT COUNT(*)"
        + "FROM employees  ";

    return QueryUtils.get_params(req)
        .flatMap(params => QueryUtils.make_conditions_and_values_by(params))
        .flatMap(([conditions, values]) => QueryUtils.query(req, count4EmployeeList + conditions, values))
        .map(rows => rows[0]["COUNT(*)"])
        ;
};

/**
 */
exports.getEmployeeShow = (req) => {
    const sql4EmployeeShow = "SELECT " +
        "employees.employeeNumber, " +
        "employees.lastName, " +
        "employees.firstName, " +
        "employees.extension, " +
        "employees.email, " +
        "employees.officeCode, " +
        "employees.reportsTo, " +
        "employees.jobTitle " +
        "FROM employees  ";

    return Observable.of(req)
        .flatMap((req) => {
            if (!req.params || !req.params.employeeNumber) {
                throw new Error("Illegal argument");
            }
            return Observable.of(["WHERE employees.employeeNumber = ?", [req.params.employeeNumber]]);
        })
        .flatMap(([conditions, values]) => QueryUtils.query(req, sql4EmployeeShow + conditions, values))
        .map(rows => rows instanceof Array ? rows[0] : rows)
        ;
};
/**
 */
exports.saveEmployeeEdit = (req) => {
    const ef = req.body;
//console.log("edit ef: "+JSON.stringify(ef));
    return Observable.of(ef)

        .flatMap(ef => {
            const employee = ef.employee;
            const errors = EmployeeEditValidator.validate(ef);
            if (!MapUtils.isEmpty(errors)) {
                throw new DataValidateException('validation fail.', errors);
            }

            // save employee.
            return module.exports.save({body:employee, getConnection:req.getConnection})
                .flatMap(result => {
                    return Observable.of(ef);
                }).map(x => ef);
        })
        ;
};

