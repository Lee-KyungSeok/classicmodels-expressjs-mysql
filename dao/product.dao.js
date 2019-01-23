/*
 Copyright(c) 2009-2019 by GGoons.
*/
const { Observable } = require('rxjs');
const co = require('co');

const DataValidateException = require('../error/DataValidateException');
const ProductlineDao = require('./productline.dao');
const OrderdetailDao = require('./orderdetail.dao');
const ProductValidator = require('../validator/product.validator');
const ProductEditValidator = require('../validator/productEdit.validator');

const ArrayUtils = require('../utils/array.utils');
const DateUtils = require('../utils/date.utils');
const UploadUtils = require('../utils/upload.utils');
const Env = require('../config/environment')
const MapUtils = require('../utils/map.utils');
const QueryUtils = require('../utils/query.utils');
const PasswordUtils = require('../utils/password.utils');

const SELECT_SQL = 'SELECT * FROM products ';
const COUNT_SQL  = 'SELECT COUNT(*) FROM products ';
const DELETE_SQL = 'DELETE FROM products ';
const UPDATE_SQL = 'UPDATE products ';

// methods for model

exports.save = (req) => {
    const product = req.body;
    if (!product.productCode) {
        return exports.create(req);
    }
    return exports.find({params: {productCode: product.productCode}, getConnection: req.getConnection})
        .flatMap(row => {
            if (!row) {
                return exports.create(req);
            } else {
                return exports.updateRow(req);
            }
        });
};

exports.create = (req) => {
    const SQL = "INSERT INTO products ("
        + "	productCode, productName, productLine, productScale, productVendor, productDescription, quantityInStock, buyPrice, MSRP"
        + ") VALUES ("
        + "	?, ?, ?, ?, ?, ?, ?, ?, ?"
        + ")";
    const product = req.body;
    const values = [];
    values.push(product.productCode);
    values.push(product.productName);
    values.push(product.productLine);
    values.push(product.productScale);
    values.push(product.productVendor);
    values.push(product.productDescription);
    values.push(product.quantityInStock);
    values.push(product.buyPrice);
    values.push(product.msrp);
//console.log("save product: ", product);
    return Observable.of(product)

        .map(product => {
            const errors = ProductValidator.validate(product);
            if (!MapUtils.isEmpty(errors)) {
                throw new DataValidateException("validation fail.", errors);
            }
            return product;
        })
        .flatMap(product => QueryUtils.execute(req, SQL, values))
        .map(result => product)
        ;
};

exports.updateRow = (req) => {
    const SQL = "UPDATE products SET "
        + "	productCode = ?, productName = ?, productLine = ?, productScale = ?, productVendor = ?, productDescription = ?, quantityInStock = ?, buyPrice = ?, MSRP = ?"
        + " WHERE productCode = ?"
        ;
    const product = req.body;
    const values = [];
    values.push(product.productCode);
    values.push(product.productName);
    values.push(product.productLine);
    values.push(product.productScale);
    values.push(product.productVendor);
    values.push(product.productDescription);
    values.push(product.quantityInStock);
    values.push(product.buyPrice);
    values.push(product.msrp);
    values.push(product.productCode);
//console.log("save product: "+JSON.stringify(product));
    return Observable.of(product)
        .map(product => {
            const errors = ProductValidator.validate(product);
            if (!MapUtils.isEmpty(errors)) {
                throw new DataValidateException("validation fail.", errors);
            }
            return product;
        })
        .flatMap(product => QueryUtils.execute(req, SQL, values))
        ;
};

// methods for primary key

exports.find = (req) => {
    return Observable.of(req)
        .map((req) => {
            if (!req.params || !req.params.productCode) {
                throw new Error("Illegal argument");
            }
            return Observable.of(["WHERE products.productCode = ?", [req.params.productCode]]);
        })
        .flatMap(([conditions, values]) => QueryUtils.query(req, SELECT_SQL+conditions, values))
        .map(rows => rows instanceof Array ? rows[0] : rows)
        ;
};

exports.destroy = (req) => {
    return Observable.of(req)
        .map((req) => {
            if (!req.params || !req.params.productCode) {
                throw new Error("Illegal argument");
            }
            return Observable.of(["WHERE products.productCode = ?", [req.params.productCode]]);
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
exports.getProductList = (req) => {
    const sql4ProductList = "SELECT " +
        "products.productCode, " +
        "products.productName, " +
        "products.productLine, " +
        "products.productScale, " +
        "products.productVendor, " +
        "products.productDescription, " +
        "products.quantityInStock, " +
        "products.buyPrice, " +
        "products.MSRP " +
        "FROM products  ";

    const params = {};
    Object.assign(params, req.params, req.query, req.body);
    return Observable.of(params)
        .flatMap(params => QueryUtils.make_conditions_and_values_by(params))
        .flatMap(([conditions, values]) => QueryUtils.query(req, sql4ProductList + conditions, values))
        ;
};

/**
 */
exports.getProductListCount = (req) => {
    const count4ProductList = "SELECT COUNT(*)"
        + "FROM products  ";

    return QueryUtils.get_params(req)
        .flatMap(params => QueryUtils.make_conditions_and_values_by(params))
        .flatMap(([conditions, values]) => QueryUtils.query(req, count4ProductList + conditions, values))
        .map(rows => rows[0]["COUNT(*)"])
        ;
};

/**
 */
exports.getProductShow = (req) => {
    const sql4ProductShow = "SELECT " +
        "products.productCode, " +
        "products.productName, " +
        "products.productLine, " +
        "products.productScale, " +
        "products.productVendor, " +
        "products.productDescription, " +
        "products.quantityInStock, " +
        "products.buyPrice, " +
        "products.MSRP " +
        "FROM products  ";

    return Observable.of(req)
        .flatMap((req) => {
            if (!req.params || !req.params.productCode) {
                throw new Error("Illegal argument");
            }
            return Observable.of(["WHERE products.productCode = ?", [req.params.productCode]]);
        })
        .flatMap(([conditions, values]) => QueryUtils.query(req, sql4ProductShow + conditions, values))
        .map(rows => rows instanceof Array ? rows[0] : rows)
        ;
};
/**
 */
exports.saveProductEdit = (req) => {
    const ef = req.body;
//console.log("edit ef: "+JSON.stringify(ef));
    return Observable.of(ef)

        .flatMap(ef => {
            const product = ef.product;
            const errors = ProductEditValidator.validate(ef);
            if (!MapUtils.isEmpty(errors)) {
                throw new DataValidateException('validation fail.', errors);
            }

            // save product.
            return module.exports.save({body:product, getConnection:req.getConnection})
                .flatMap(result => {
                    return Observable.of(ef);
                }).map(x => ef);
        })
        ;
};
