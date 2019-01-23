/*
 Copyright(c) 2009-2019 by GGoons.
*/
'use strict';

const { Observable } = require('rxjs');
const assert = require('assert');
const httpMock = require('node-mocks-http');
const sinon = require('sinon');
const EmployeeDao = require('../../dao/employee.dao');
const QueryUtils = require('../../utils/query.utils');

const req = httpMock.createRequest();
const res = httpMock.createResponse();

describe('employee.dao testing...', () => {
    let sandbox;
    before(() => sandbox = sinon.sandbox.create());
    after(() => sandbox.restore());

    it('count should be 7', () => {
        const st = sinon.stub(QueryUtils, "query").returns(Observable.of([{'COUNT(*)':7}]))
        EmployeeDao.count(req)
            .subscribe(rows => {
                assert.equal(rows, 7, "expect 7 for count BUT "+rows);
            }
            ,err => console.log(err))
            ;
        st.restore();
    });

    it('getEmployeeList should be return empty array', () => {
        const st = sandbox.stub(QueryUtils, "query").returns(Observable.of([]));
        EmployeeDao.getEmployeeList(req)
            .subscribe(rows => {
                assert.ok(rows instanceof Array, "expect Array for getEmployeeList BUT "+typeof rows);
                assert.equal(rows.length, 0, "expect empty array BUT "+rows.length);
            }
            ,err => console.log(err))
            ;
        st.restore();
    });
});

