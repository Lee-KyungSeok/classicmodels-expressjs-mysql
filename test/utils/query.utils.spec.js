/**
 Copyright(c) 2009-2019 by GGoons.
*/
'use strict';

const assert = require('assert');
const q = require('q');
const httpMock = require('node-mocks-http');
const sinon = require('sinon');
const QueryUtils = require('../../utils/query.utils');

const req = httpMock.createRequest();
const res = httpMock.createResponse();

describe('query.utils testing...', () => {

    it('checking to make where clause ...', () => {
        let params = {};
        params["page-no"] = "1";
        params["num-rows"] = "20";
        params["bugs.id ="] = 1;
        params["bugs.target LIKE"] = "spring";
        params["bugs.createdAt BETWEEN"] = [new Date(), new Date()];
        params["bugs.db IN"] = "mysql, oracle, db2";
        params["bugs.db COMPOSITE-IN"] = "mysql, oracle, db2";
        params["bugs.dao COMPOSITE-IN"] = "jdbc, nosql, jpa";
        params["order4Product JOIN"] = 1;

        let join = {order4Product:"orders.orderNumber IN (SELECT orderdetails.orderNumber FROM orderdetails WHERE orderdetails.productCode=?)"};
        let options = {joinStatements: join}
        req.params = params;

        const expect = " WHERE "
            + "bugs.id = ? "
            + "AND bugs.db IN (?, ?, ?) "
            + "AND (bugs.db, bugs.dao) IN ((?, ?), (?, ?), (?, ?)) "
            + "AND orders.orderNumber IN (SELECT orderdetails.orderNumber FROM orderdetails WHERE orderdetails.productCode=?) "
            + "AND bugs.createdAt BETWEEN ? AND ? "
            + "AND bugs.target LIKE concat('%', ?, '%') "
            + "LIMIT 0,20"
            ;

        QueryUtils.make_where_clause(req, options)
            .subscribe(([conditions, values]) => {
            //	console.log("conditions = " + conditions);
            //	console.log("values.length = "+values.length);
                assert.equal(conditions, expect, "NOT expected conditions: "+conditions);
                assert.equal(values.length, 14, "expect 14 values for where conditions BUT not: "+values.length);
            },
            err => console.log(err))
            ;
    });

    it('customers where clause check...', () => {
        req.params = {"customerNumber LIKE":"lo"};
        QueryUtils.make_where_clause(req)
            .subscribe(([conditions, values]) => {
                //console.log("conditions = " + conditions);
                assert.equal(conditions, " WHERE customerNumber LIKE concat('%', ?, '%')",
                    "NOT expected conditions: "+conditions);
                assert.ok(values.length > 0, "expect not empty values BUT empty");
                assert.equal("lo", values[0], "expect values[0] is 'lo' BUT "+values[0]);
            },
            err => console.log(err))
            ;
    });

});
