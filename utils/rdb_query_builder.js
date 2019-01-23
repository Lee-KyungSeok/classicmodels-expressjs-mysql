/**
 Copyright(c) 2009-2019 by GGoons.
*/
'use strict';

const g_const = require('../config/global.const');
const re_to_named_params = new RegExp("[ \\.]", "g");

/**
*/
class RdbQueryBuilder {
    constructor(conditions, values, joinStatements) {
        this.conditions = conditions;
        this.values = values;
        this.joinStatements = joinStatements;
        this.joined = {};
    }

    add(value) {
        this.values.push(value);
    }

    op(cname, op, value) {
        this.conditions.push(cname + op + "?");
        this.add(value);
    }

    eq(cname, value) {
        if (null === value) {
            this.conditions.push(cname + " IS NULL");
        } else {
            this.op(cname, " = ", value);
        }
    }
    ne(cname, value) {
        if (null === value) {
            this.conditions.push(cname + " IS NOT NULL");
        } else {
            this.op(cname, " != ", value);
        }
    }
    gt(cname, value) {
        this.op(cname, " > ", value);
    }
    ge(cname, value) {
        this.op(cname, " >= ", value);
    }
    lt(cname, value) {
        this.op(cname, " < ", value);
    }
    le(cname, value) {
        this.op(cname, " <= ", value);
    }

    make_in(cname, op, values) {
        const arr = [];
        values.forEach(value => {
            arr.push("?");
            this.add(value);
        });

        this.conditions.push(cname + op + "(" + arr.join(", ") + ")");
    }

    in(cname, values) {
        this.make_in(cname, " IN ", values);
    }

    notIn(cname, values) {
        this.make_in(cname, " NOT IN ", values);
    }

    make_like(cname, op, value) {
        this.conditions.push(cname + op);
        this.add(value);
    }

    like(cname, value) {
        this.make_like(cname, " LIKE concat('%', ?, '%')", value);
    }

    notLike(cname, value) {
        this.make_like(cname, " NOT LIKE concat('%', ?, '%')", value);
    }

    make_between(cname, op, fval, tval) {
        this.conditions.push(cname + op + "? AND ?");
        this.add(fval);
        this.add(tval);
    }

    between(cname, fval, tval) {
        this.make_between(cname, " BETWEEN ", fval, tval);
    }

    notBetween(cname, fval, tval) {
        this.make_between(cname, " NOT BETWEEN ", fval, tval);
    }

    /**
    * @param tname join target many-to-many table name.
    * @param value join key(s). or String[]
    *	if value type is and join key is composite then 
    *	each of key seperated by comma(', ').
    *	ex)
    *		value => "v1, v2, ..."
    */
    join(tname, value) {
        if (!this.joined.hasOwnProperty(tname)) {				// not joined yet?
            if (this.joinStatements.hasOwnProperty(tname)) {	// is exist?
                const stmt = this.joinStatements[tname];
                this.conditions.push(stmt);

                let values = null;
                if ((typeof value === "string") && value.includes(",")) {
                    values = value.split(g_const.RE_COMMA);
                }
                else if (value instanceof Array) {
                    values = value;
                }
                if (values != null) {
                    for (let i=0 ; i<values.length ; i++) {
                        this.add(values[i]);
                    }
                }
                else {
                    this.add(value);
                }

                // joined.
                this.joined[tname] = true;
            }
            else {
                throw new Error("no statements to JOIN with table '"+tname+"'");
            }
        }
    }

    compositeIn(cols) {
        this.make_compositeIn(cols, " IN ");
    }

    compositeNotIn(cols) {
        this.make_compositeIn(cols, " NOT IN ");
    }

    /**
    * target format:
    *	(key1, key2, ...) [NOT ]IN ((:val11, :val12, ...), (:val21, :val22, ...), ...)
    *
    * @param cols {"c1":[v1, v2, ...], "c2":[v1, v2, ...], "c3":[v1, v2, v3], ...}
    */
    make_compositeIn(cols, op) {
        const colNames = Object.keys(cols);

        // we assume that values is not empty and all values has the same size.
        const valuesSize = cols[colNames[0]].length;
        let sb = "(" + colNames.join(", ") + ")" + op + "(";

        for (let i=0 ; i<valuesSize ; i++) {
            let npnames = [];
            colNames.forEach(colName => {
                npnames.push("?")
                this.add(cols[colName][i]);
            });
            sb += "(" + npnames.join(", ") + ")";
            if ((i+1) < valuesSize) {
                sb += ", ";
            }
        }

        sb += ")";

        this.conditions.push(sb);
    }
}

module.exports = RdbQueryBuilder;
