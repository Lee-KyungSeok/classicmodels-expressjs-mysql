/*
 Copyright(c) 2009-2019 by GGoons.
*/
'use strict';

const { Observable } = require('rxjs');
//const q = require('q');
const httpMock = require('node-mocks-http');
const sinon = require('sinon');
const assert = require('assert');
const officeController = require('../../controllers/offices_controller');
const OfficeDao = require('../../dao/office.dao');
const OfficeQueryValidator = require('../../dao/validate/OfficeQueryValidator');
const StringUtils = require('../../utils/string.utils');

const req = httpMock.createRequest();
const res = httpMock.createResponse();

describe('offices_controller testing...', () => {
    before(() => {
        //sinon.stub(OfficeDao, "count").returns(Observable.of(7));
        //sinon.stub(OfficeQueryValidator, "validate").returns(Observable.of(req));
        //sinon.stub(OfficeDao, "getOfficeList").returns(Observable.of([]));
        //sinon.stub(OfficeDao, "getOfficeMap").returns(Observable.of([]));
    });
    after(() => {
        //OfficeDao.count.restore()
        //OfficeQueryValidator.validate.restore()
        //OfficeDao.getOfficeList.restore()
        //OfficeDao.getOfficeMap.restore()
    });

    it('count should response 7', () => {
        sinon.stub(OfficeDao, "count").returns(Observable.of(7));
        sinon.stub(OfficeQueryValidator, "validate").returns(Observable.of(req));
        officeController.count(req, res);
        res.on("end", () => {
            assert.equal(res.statusCode, 200);
            const result = res._getData();
//console.log("typeof result is "+typeof result+":["+result+"]");
            const json = JSON.parse(res._getData());
            assert.ok(json.hasOwnProperty('count'), "expect count property BUT not.");
            assert.equal(json.count, 7, "expect 7 for count BUT "+json.count);
        });
        OfficeQueryValidator.validate.restore();
        OfficeDao.count.restore();
    });

    it('office.list...', () => {
        sinon.stub(OfficeDao, "getOfficeList").returns(Observable.of([]));
        sinon.stub(OfficeQueryValidator, "validate").returns(Observable.of(req));
        officeController.list(req, res);
        res.on("end", () => {
            assert.equal(res.statusCode, 200);
            const result = res._getData();
//console.log("typeof result is "+typeof result+":["+result+"]");
            const json = JSON.parse(res._getData());
            assert.ok(Array.isArray(json), "expect that list return array BUT "+typeof json);
        });
        OfficeQueryValidator.validate.restore()
        OfficeDao.getOfficeList.restore()
    });

    it('office.map...', () => {
        sinon.stub(OfficeDao, "getOfficeMap").returns(Observable.of([]));
        sinon.stub(OfficeQueryValidator, "validate").returns(Observable.of(req));
        officeController.map(req, res);
        res.on("end", () => {
            assert.equal(res.statusCode, 200);
            const result = res._getData();
//console.log("typeof result is "+typeof result+":["+result+"]");
            const json = JSON.parse(res._getData());
            assert.ok(Array.isArray(json), "expect that map return array BUT "+typeof json);
        });
        OfficeQueryValidator.validate.restore()
        OfficeDao.getOfficeMap.restore()
    });

    it('should response 200', () => {
        const ef = {};
        const office = {city:"1", phone:"1", addressLine1:"1", addressLine2:"1", state:"1", country:"1", postalCode:"1", territory:"1"};
        ef.office = office;
        sinon.stub(OfficeDao, "saveOfficeEdit").returns(Observable.of(ef));
        officeController.edit(req, res);
        res.on("end", () => {
            assert.equal(res.statusCode, 200);
            const result = res._getData();
//console.log("typeof result is "+typeof result+":["+JSON.stringify(result)+"]");
            const json = JSON.parse(result);
            assert.ok(json.hasOwnProperty('office'), "expect office property BUT not.");
            const office2 = json.office;
            assert.ok(office2.hasOwnProperty('city'), "expect city property BUT not.");
            assert.ok(office2.hasOwnProperty('phone'), "expect phone property BUT not.");
            assert.ok(office2.hasOwnProperty('addressLine1'), "expect addressLine1 property BUT not.");
            assert.ok(office2.hasOwnProperty('addressLine2'), "expect addressLine2 property BUT not.");
            assert.ok(office2.hasOwnProperty('state'), "expect state property BUT not.");
            assert.ok(office2.hasOwnProperty('country'), "expect country property BUT not.");
            assert.ok(office2.hasOwnProperty('postalCode'), "expect postalCode property BUT not.");
            assert.ok(office2.hasOwnProperty('territory'), "expect territory property BUT not.");
        });
    });
});
