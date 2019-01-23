/*
 Copyright(c) 2009-2019 by GGoons.
*/
'use strict';

const { Observable } = require('rxjs');
const assert = require('assert');
const httpMock = require('node-mocks-http');
const sinon = require('sinon');
const CustomerDao = require('../../dao/customer.dao');
const QueryUtils = require('../../utils/query.utils');

const req = httpMock.createRequest();
const res = httpMock.createResponse();

describe('customer.dao testing...', () => {
    let sandbox;
    before(() => sandbox = sinon.sandbox.create());
    after(() => sandbox.restore());

    it('count should be 7', () => {
        const st = sinon.stub(QueryUtils, "query").returns(Observable.of([{'COUNT(*)':7}]))
        CustomerDao.count(req)
            .subscribe(rows => {
                assert.equal(rows, 7, "expect 7 for count BUT "+rows);
            }
            ,err => console.log(err))
            ;
        st.restore();
    });

    it('getCustomerList should be return empty array', () => {
        const st = sandbox.stub(QueryUtils, "query").returns(Observable.of([]));
        CustomerDao.getCustomerList(req)
            .subscribe(rows => {
                assert.ok(rows instanceof Array, "expect Array for getCustomerList BUT "+typeof rows);
                assert.equal(rows.length, 0, "expect empty array BUT "+rows.length);
            }
            ,err => console.log(err))
            ;
        st.restore();
    });
    it('getCustomerPaymentStatistic should be return empty array', () => {
        const st = sandbox.stub(QueryUtils, "query").returns(Observable.of([]));
        CustomerDao.getCustomerPaymentStatistic(req)
            .subscribe(rows => {
                assert.ok(rows instanceof Array, "expect Array for getCustomerPaymentStatistic BUT "+typeof rows);
                assert.equal(rows.length, 0, "expect empty array BUT "+rows.length);
            }
            ,err => console.log(err))
            ;
        st.restore();
    });
});

