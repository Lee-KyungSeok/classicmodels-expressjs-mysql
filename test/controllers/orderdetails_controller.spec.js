/*
 Copyright(c) 2009-2019 by GGoons.
*/
'use strict';

const { Observable } = require('rxjs');
//const q = require('q');
const httpMock = require('node-mocks-http');
const sinon = require('sinon');
const assert = require('assert');
const orderdetailController = require('../../controllers/orderdetails_controller');
const OrderdetailDao = require('../../dao/orderdetail.dao');
const OrderdetailQueryValidator = require('../../dao/validate/OrderdetailQueryValidator');
const StringUtils = require('../../utils/string.utils');

const req = httpMock.createRequest();
const res = httpMock.createResponse();

describe('orderdetails_controller testing...', () => {
    before(() => {
        //sinon.stub(OrderdetailDao, "count").returns(Observable.of(7));
        //sinon.stub(OrderdetailQueryValidator, "validate").returns(Observable.of(req));
        //sinon.stub(OrderdetailDao, "getOrderdetailList").returns(Observable.of([]));
    });
    after(() => {
        //OrderdetailDao.count.restore()
        //OrderdetailQueryValidator.validate.restore()
        //OrderdetailDao.getOrderdetailList.restore()
    });

    it('count should response 7', () => {
        sinon.stub(OrderdetailDao, "count").returns(Observable.of(7));
        sinon.stub(OrderdetailQueryValidator, "validate").returns(Observable.of(req));
        orderdetailController.count(req, res);
        res.on("end", () => {
            assert.equal(res.statusCode, 200);
            const result = res._getData();
//console.log("typeof result is "+typeof result+":["+result+"]");
            const json = JSON.parse(res._getData());
            assert.ok(json.hasOwnProperty('count'), "expect count property BUT not.");
            assert.equal(json.count, 7, "expect 7 for count BUT "+json.count);
        });
        OrderdetailQueryValidator.validate.restore();
        OrderdetailDao.count.restore();
    });

    it('orderdetail.list...', () => {
        sinon.stub(OrderdetailDao, "getOrderdetailList").returns(Observable.of([]));
        sinon.stub(OrderdetailQueryValidator, "validate").returns(Observable.of(req));
        orderdetailController.list(req, res);
        res.on("end", () => {
            assert.equal(res.statusCode, 200);
            const result = res._getData();
//console.log("typeof result is "+typeof result+":["+result+"]");
            const json = JSON.parse(res._getData());
            assert.ok(Array.isArray(json), "expect that list return array BUT "+typeof json);
        });
        OrderdetailQueryValidator.validate.restore()
        OrderdetailDao.getOrderdetailList.restore()
    });

    it('should response 200', () => {
        const ef = {};
        const orderdetail = {quantityOrdered:1, priceEach:1, orderLineNumber:1};
        ef.orderdetail = orderdetail;
        sinon.stub(OrderdetailDao, "saveOrderdetailEdit").returns(Observable.of(ef));
        orderdetailController.edit(req, res);
        res.on("end", () => {
            assert.equal(res.statusCode, 200);
            const result = res._getData();
//console.log("typeof result is "+typeof result+":["+JSON.stringify(result)+"]");
            const json = JSON.parse(result);
            assert.ok(json.hasOwnProperty('orderdetail'), "expect orderdetail property BUT not.");
            const orderdetail2 = json.orderdetail;
            assert.ok(orderdetail2.hasOwnProperty('quantityOrdered'), "expect quantityOrdered property BUT not.");
            assert.ok(orderdetail2.hasOwnProperty('priceEach'), "expect priceEach property BUT not.");
            assert.ok(orderdetail2.hasOwnProperty('orderLineNumber'), "expect orderLineNumber property BUT not.");
        });
    });
});
