/*
 Copyright(c) 2009-2019 by GGoons.
*/
const { Observable } = require('rxjs');
const co = require('co');

const DataValidateException = require('../error/DataValidateException');
const EmployeeDao = require('./employee.dao');
const OfficeValidator = require('../validator/office.validator');
const OfficeEditValidator = require('../validator/officeEdit.validator');

const ArrayUtils = require('../utils/array.utils');
const DateUtils = require('../utils/date.utils');
const UploadUtils = require('../utils/upload.utils');
const Env = require('../config/environment')
const MapUtils = require('../utils/map.utils');
const QueryUtils = require('../utils/query.utils');
const PasswordUtils = require('../utils/password.utils');

const SELECT_SQL = 'SELECT * FROM offices ';
const COUNT_SQL  = 'SELECT COUNT(*) FROM offices ';
const DELETE_SQL = 'DELETE FROM offices ';
const UPDATE_SQL = 'UPDATE offices ';

// methods for model

exports.save = (req) => {
    const office = req.body;
    if (!office.officeCode) {
        return exports.create(req);
    }
    return exports.find({params: {officeCode: office.officeCode}, getConnection: req.getConnection})
        .flatMap(row => {
            if (!row) {
                return exports.create(req);
            } else {
                return exports.updateRow(req);
            }
        });
};

exports.create = (req) => {
    const SQL = "INSERT INTO offices ("
        + "	officeCode, city, phone, addressLine1, addressLine2, state, country, postalCode, territory"
        + ") VALUES ("
        + "	?, ?, ?, ?, ?, ?, ?, ?, ?"
        + ")";
    const office = req.body;
    const values = [];
    values.push(office.officeCode);
    values.push(office.city);
    values.push(office.phone);
    values.push(office.addressLine1);
    values.push(office.addressLine2);
    values.push(office.state);
    values.push(office.country);
    values.push(office.postalCode);
    values.push(office.territory);
//console.log("save office: ", office);
    return Observable.of(office)

        .map(office => {
            const errors = OfficeValidator.validate(office);
            if (!MapUtils.isEmpty(errors)) {
                throw new DataValidateException("validation fail.", errors);
            }
            return office;
        })
        .flatMap(office => QueryUtils.execute(req, SQL, values))
        .map(result => office)
        ;
};

exports.updateRow = (req) => {
    const SQL = "UPDATE offices SET "
        + "	officeCode = ?, city = ?, phone = ?, addressLine1 = ?, addressLine2 = ?, state = ?, country = ?, postalCode = ?, territory = ?"
        + " WHERE officeCode = ?"
        ;
    const office = req.body;
    const values = [];
    values.push(office.officeCode);
    values.push(office.city);
    values.push(office.phone);
    values.push(office.addressLine1);
    values.push(office.addressLine2);
    values.push(office.state);
    values.push(office.country);
    values.push(office.postalCode);
    values.push(office.territory);
    values.push(office.officeCode);
//console.log("save office: "+JSON.stringify(office));
    return Observable.of(office)
        .map(office => {
            const errors = OfficeValidator.validate(office);
            if (!MapUtils.isEmpty(errors)) {
                throw new DataValidateException("validation fail.", errors);
            }
            return office;
        })
        .flatMap(office => QueryUtils.execute(req, SQL, values))
        ;
};

// methods for primary key

exports.find = (req) => {
    return Observable.of(req)
        .map((req) => {
            if (!req.params || !req.params.officeCode) {
                throw new Error("Illegal argument");
            }
            return Observable.of(["WHERE offices.officeCode = ?", [req.params.officeCode]]);
        })
        .flatMap(([conditions, values]) => QueryUtils.query(req, SELECT_SQL+conditions, values))
        .map(rows => rows instanceof Array ? rows[0] : rows)
        ;
};

exports.destroy = (req) => {
    return Observable.of(req)
        .map((req) => {
            if (!req.params || !req.params.officeCode) {
                throw new Error("Illegal argument");
            }
            return Observable.of(["WHERE offices.officeCode = ?", [req.params.officeCode]]);
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
exports.getOfficeList = (req) => {
    const sql4OfficeList = "SELECT " +
        "offices.officeCode, " +
        "offices.city, " +
        "offices.phone, " +
        "offices.addressLine1, " +
        "offices.addressLine2, " +
        "offices.state, " +
        "offices.country, " +
        "offices.postalCode, " +
        "offices.territory " +
        "FROM offices  ";

    const params = {};
    Object.assign(params, req.params, req.query, req.body);
    return Observable.of(params)
        .flatMap(params => QueryUtils.make_conditions_and_values_by(params))
        .flatMap(([conditions, values]) => QueryUtils.query(req, sql4OfficeList + conditions, values))
        ;
};

/**
 */
exports.getOfficeListCount = (req) => {
    const count4OfficeList = "SELECT COUNT(*)"
        + "FROM offices  ";

    return QueryUtils.get_params(req)
        .flatMap(params => QueryUtils.make_conditions_and_values_by(params))
        .flatMap(([conditions, values]) => QueryUtils.query(req, count4OfficeList + conditions, values))
        .map(rows => rows[0]["COUNT(*)"])
        ;
};

/**
 */
exports.getOfficeMap = (req) => {
    const sql4OfficeMap = "SELECT " +
        "offices.officeCode, " +
        "offices.city, " +
        "offices.phone, " +
        "offices.addressLine1, " +
        "offices.addressLine2, " +
        "offices.state, " +
        "offices.country, " +
        "offices.postalCode, " +
        "offices.territory " +
        "FROM offices  ";

    const params = {};
    Object.assign(params, req.params, req.query, req.body);
    return Observable.of(params)
        .flatMap(params => QueryUtils.make_conditions_and_values_by(params))
        .flatMap(([conditions, values]) => QueryUtils.query(req, sql4OfficeMap + conditions, values))
        ;
};

/**
 */
exports.getOfficeShow = (req) => {
    const sql4OfficeShow = "SELECT " +
        "offices.officeCode, " +
        "offices.city, " +
        "offices.phone, " +
        "offices.addressLine1, " +
        "offices.addressLine2, " +
        "offices.state, " +
        "offices.country, " +
        "offices.postalCode, " +
        "offices.territory " +
        "FROM offices  ";

    return Observable.of(req)
        .flatMap((req) => {
            if (!req.params || !req.params.officeCode) {
                throw new Error("Illegal argument");
            }
            return Observable.of(["WHERE offices.officeCode = ?", [req.params.officeCode]]);
        })
        .flatMap(([conditions, values]) => QueryUtils.query(req, sql4OfficeShow + conditions, values))
        .map(rows => rows instanceof Array ? rows[0] : rows)
        ;
};
/**
 */
exports.saveOfficeEdit = (req) => {
    const ef = req.body;
//console.log("edit ef: "+JSON.stringify(ef));
    return Observable.of(ef)

        .flatMap(ef => {
            const office = ef.office;
            const errors = OfficeEditValidator.validate(ef);
            if (!MapUtils.isEmpty(errors)) {
                throw new DataValidateException('validation fail.', errors);
            }

            // save office.
            return module.exports.save({body:office, getConnection:req.getConnection})
                .flatMap(result => {
                    return Observable.of(ef);
                }).map(x => ef);
        })
        ;
};

