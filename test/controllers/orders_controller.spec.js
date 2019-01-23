/*
 Copyright(c) 2009-2019 by GGoons.
*/
'use strict';

const { Observable } = require('rxjs');
//const q = require('q');
const httpMock = require('node-mocks-http');
const sinon = require('sinon');
const assert = require('assert');
const orderController = require('../../controllers/orders_controller');
const OrderDao = require('../../dao/order.dao');
const OrderQueryValidator = require('../../dao/validate/OrderQueryValidator');
const StringUtils = require('../../utils/string.utils');

const req = httpMock.createRequest();
const res = httpMock.createResponse();

describe('orders_controller testing...', () => {
    before(() => {
        //sinon.stub(OrderDao, "count").returns(Observable.of(7));
        //sinon.stub(OrderQueryValidator, "validate").returns(Observable.of(req));
        //sinon.stub(OrderDao, "getOrderList").returns(Observable.of([]));
    });
    after(() => {
        //OrderDao.count.restore()
        //OrderQueryValidator.validate.restore()
        //OrderDao.getOrderList.restore()
    });

    it('count should response 7', () => {
        sinon.stub(OrderDao, "count").returns(Observable.of(7));
        sinon.stub(OrderQueryValidator, "validate").returns(Observable.of(req));
        orderController.count(req, res);
        res.on("end", () => {
            assert.equal(res.statusCode, 200);
            const result = res._getData();
//console.log("typeof result is "+typeof result+":["+result+"]");
            const json = JSON.parse(res._getData());
            assert.ok(json.hasOwnProperty('count'), "expect count property BUT not.");
            assert.equal(json.count, 7, "expect 7 for count BUT "+json.count);
        });
        OrderQueryValidator.validate.restore();
        OrderDao.count.restore();
    });

    it('order.list...', () => {
        sinon.stub(OrderDao, "getOrderList").returns(Observable.of([]));
        sinon.stub(OrderQueryValidator, "validate").returns(Observable.of(req));
        orderController.list(req, res);
        res.on("end", () => {
            assert.equal(res.statusCode, 200);
            const result = res._getData();
//console.log("typeof result is "+typeof result+":["+result+"]");
            const json = JSON.parse(res._getData());
            assert.ok(Array.isArray(json), "expect that list return array BUT "+typeof json);
        });
        OrderQueryValidator.validate.restore()
        OrderDao.getOrderList.restore()
    });

    it('should response 200', () => {
        const ef = {};
        const order = {orderDate:new Date(), requiredDate:new Date(), shippedDate:new Date(), status:"1", comments:"1", customerNumber:1};
        ef.order = order;
        sinon.stub(OrderDao, "saveOrderEdit").returns(Observable.of(ef));
        orderController.edit(req, res);
        res.on("end", () => {
            assert.equal(res.statusCode, 200);
            const result = res._getData();
//console.log("typeof result is "+typeof result+":["+JSON.stringify(result)+"]");
            const json = JSON.parse(result);
            assert.ok(json.hasOwnProperty('order'), "expect order property BUT not.");
            const order2 = json.order;
            assert.ok(order2.hasOwnProperty('orderDate'), "expect orderDate property BUT not.");
            assert.ok(order2.hasOwnProperty('requiredDate'), "expect requiredDate property BUT not.");
            assert.ok(order2.hasOwnProperty('shippedDate'), "expect shippedDate property BUT not.");
            assert.ok(order2.hasOwnProperty('status'), "expect status property BUT not.");
            assert.ok(order2.hasOwnProperty('comments'), "expect comments property BUT not.");
            assert.ok(order2.hasOwnProperty('customerNumber'), "expect customerNumber property BUT not.");
        });
    });
});
