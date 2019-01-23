/*
 Copyright(c) 2009-2019 by GGoons.
*/
'use strict';

const { Observable } = require('rxjs');
const assert = require('assert');
const httpMock = require('node-mocks-http');
const sinon = require('sinon');
const OfficeDao = require('../../dao/office.dao');
const QueryUtils = require('../../utils/query.utils');

const req = httpMock.createRequest();
const res = httpMock.createResponse();

describe('office.dao testing...', () => {
    let sandbox;
    before(() => sandbox = sinon.sandbox.create());
    after(() => sandbox.restore());

    it('count should be 7', () => {
        const st = sinon.stub(QueryUtils, "query").returns(Observable.of([{'COUNT(*)':7}]))
        OfficeDao.count(req)
            .subscribe(rows => {
                assert.equal(rows, 7, "expect 7 for count BUT "+rows);
            }
            ,err => console.log(err))
            ;
        st.restore();
    });

    it('getOfficeList should be return empty array', () => {
        const st = sandbox.stub(QueryUtils, "query").returns(Observable.of([]));
        OfficeDao.getOfficeList(req)
            .subscribe(rows => {
                assert.ok(rows instanceof Array, "expect Array for getOfficeList BUT "+typeof rows);
                assert.equal(rows.length, 0, "expect empty array BUT "+rows.length);
            }
            ,err => console.log(err))
            ;
        st.restore();
    });
    it('getOfficeMap should be return empty array', () => {
        const st = sandbox.stub(QueryUtils, "query").returns(Observable.of([]));
        OfficeDao.getOfficeMap(req)
            .subscribe(rows => {
                assert.ok(rows instanceof Array, "expect Array for getOfficeMap BUT "+typeof rows);
                assert.equal(rows.length, 0, "expect empty array BUT "+rows.length);
            }
            ,err => console.log(err))
            ;
        st.restore();
    });
});

