/**
 Copyright(c) 2009-2019 by GGoons.
*/
const { Observable, Observer } = require('rxjs');

const keyNameParser = require('./key_name_parser');
const RdbQueryBuilder = require('./rdb_query_builder');

exports.get_params = (req) => {
    let params = {};
    Object.assign(params, req.params, req.query, req.body);
    return Observable.of(params);
};

exports.make_conditions_and_values_by = (params, options={}) => {
    let conditions = [];
    let values = [];
    let where = "";
    const qb = new RdbQueryBuilder(conditions, values, (options.joinStatements || {}));
    let p;
    if (options.before) {
        p = options.before(params);	// it MUST BE return Promise.
    } else {
        p = Observable.of(params);
    }
    return p.map(params => {
        if (options.filter) {
            params = options.filter.sync(params);
        }
        keyNameParser.parse(params, true, qb);	// wrapable is true to RDB mode.

        if (conditions.length > 0) {
            where = " WHERE " + conditions.join(" AND ");
        }

        if (!options.restricted_control) {		// is not for COUNT(*)
            if (params.hasOwnProperty("group-by")) {
                where += " GROUP BY " + params["group-by"];
            }
            if (params.hasOwnProperty("order-by")) {
                where += " ORDER BY " + params["order-by"];
            }
            if (params.hasOwnProperty("page-no") && params.hasOwnProperty("num-rows")) {
                const numRows = parseInt(params["num-rows"]) || 10;
                const startRow =  ((parseInt(params["page-no"]) || 1) - 1) * numRows;
                if (numRows > 0) {
                    where += " LIMIT " + startRow + "," + numRows;
                }
            }
        }

        return [where, values];
    });
}

exports.make_where_clause = (req, options={}) => {
    return exports.get_params(req)
        .flatMap(params => exports.make_conditions_and_values_by(params, options))
        ;
};

exports.getConditionsTo = (params, values, options={}) => {
    let conditions = [];
    const qb = new RdbQueryBuilder(conditions, values, (options.joinStatements || {}));
    keyNameParser.parse(params, true, qb);	// wrapable is true to RDB mode.
    return conditions;
};

exports.query = (req, sql, values) => {
    return Observable.create((observer) => {
        req.getConnection((err, conn) => {
            if (err) {
                console.log("Error: " + err);
                return observer.error(err);
            }
            conn.query(sql, values, (err, rows) => {
                if (err) {
                    console.log("Error: " + err);
                    return observer.error(err);
                } else {
                    observer.next(rows);
                    observer.complete();
                }
            });
        });
    });
};

/**
* Usage:
*	QueryUtils.execute(req, "INSERT INTO `tableName`(col1, col2, ...) values ?", obj, (err, result) => {
*		...
*	});
*	QueryUtils.execute(req, "INSERT INTO `tableName`(col1, col2, ...) values (?,?,...)", arrayForValues, (err, result) => {
*		...
*	});
*/
exports.execute = (req, sql, values) => {
    return Observable.create((observer) => {
        req.getConnection((err, conn) => {
            if (err) {
                console.log("Connection Error: " + err);
                return observer.error(err);
            }
            conn.beginTransaction(err => {
                if (err) {
                    console.log("Transaction error: " + err);
                    return observer.error(err);
                }
                conn.query(sql, values, (err, result) => {
                    if (err) {
                        conn.rollback(() => {
                            console.log("SQL error: " + err);
                            return observer.error(err);
                        });
                    }
                    else {
                        conn.commit(err => {
                            if (err) {
                                conn.rollback(() => observer.error(err));
                            } else {
                                observer.next(result);
                                observer.complete();
                            }
                        });
                    }
                });
            });
        });
    });
};
