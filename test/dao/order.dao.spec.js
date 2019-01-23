/*
 Copyright(c) 2009-2019 by GGoons.
*/
'use strict';

const { Observable } = require('rxjs');
const assert = require('assert');
const httpMock = require('node-mocks-http');
const sinon = require('sinon');
const OrderDao = require('../../dao/order.dao');
const QueryUtils = require('../../utils/query.utils');

const req = httpMock.createRequest();
const res = httpMock.createResponse();

describe('order.dao testing...', () => {
    let sandbox;
    before(() => sandbox = sinon.sandbox.create());
    after(() => sandbox.restore());

    it('count should be 7', () => {
        const st = sinon.stub(QueryUtils, "query").returns(Observable.of([{'COUNT(*)':7}]))
        OrderDao.count(req)
            .subscribe(rows => {
                assert.equal(rows, 7, "expect 7 for count BUT "+rows);
            }
            ,err => console.log(err))
            ;
        st.restore();
    });

    it('getOrderList should be return empty array', () => {
        const st = sandbox.stub(QueryUtils, "query").returns(Observable.of([]));
        OrderDao.getOrderList(req)
            .subscribe(rows => {
                assert.ok(rows instanceof Array, "expect Array for getOrderList BUT "+typeof rows);
                assert.equal(rows.length, 0, "expect empty array BUT "+rows.length);
            }
            ,err => console.log(err))
            ;
        st.restore();
    });
});

