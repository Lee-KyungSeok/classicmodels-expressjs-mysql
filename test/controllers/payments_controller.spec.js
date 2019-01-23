/*
 Copyright(c) 2009-2019 by GGoons.
*/
'use strict';

const { Observable } = require('rxjs');
//const q = require('q');
const httpMock = require('node-mocks-http');
const sinon = require('sinon');
const assert = require('assert');
const paymentController = require('../../controllers/payments_controller');
const PaymentDao = require('../../dao/payment.dao');
const PaymentQueryValidator = require('../../dao/validate/PaymentQueryValidator');
const StringUtils = require('../../utils/string.utils');

const req = httpMock.createRequest();
const res = httpMock.createResponse();

describe('payments_controller testing...', () => {
    before(() => {
        //sinon.stub(PaymentDao, "count").returns(Observable.of(7));
        //sinon.stub(PaymentQueryValidator, "validate").returns(Observable.of(req));
        //sinon.stub(PaymentDao, "getPaymentList").returns(Observable.of([]));
    });
    after(() => {
        //PaymentDao.count.restore()
        //PaymentQueryValidator.validate.restore()
        //PaymentDao.getPaymentList.restore()
    });

    it('count should response 7', () => {
        sinon.stub(PaymentDao, "count").returns(Observable.of(7));
        sinon.stub(PaymentQueryValidator, "validate").returns(Observable.of(req));
        paymentController.count(req, res);
        res.on("end", () => {
            assert.equal(res.statusCode, 200);
            const result = res._getData();
//console.log("typeof result is "+typeof result+":["+result+"]");
            const json = JSON.parse(res._getData());
            assert.ok(json.hasOwnProperty('count'), "expect count property BUT not.");
            assert.equal(json.count, 7, "expect 7 for count BUT "+json.count);
        });
        PaymentQueryValidator.validate.restore();
        PaymentDao.count.restore();
    });

    it('payment.list...', () => {
        sinon.stub(PaymentDao, "getPaymentList").returns(Observable.of([]));
        sinon.stub(PaymentQueryValidator, "validate").returns(Observable.of(req));
        paymentController.list(req, res);
        res.on("end", () => {
            assert.equal(res.statusCode, 200);
            const result = res._getData();
//console.log("typeof result is "+typeof result+":["+result+"]");
            const json = JSON.parse(res._getData());
            assert.ok(Array.isArray(json), "expect that list return array BUT "+typeof json);
        });
        PaymentQueryValidator.validate.restore()
        PaymentDao.getPaymentList.restore()
    });

    it('should response 200', () => {
        const ef = {};
        const payment = {paymentDate:new Date(), amount:1};
        ef.payment = payment;
        sinon.stub(PaymentDao, "savePaymentEdit").returns(Observable.of(ef));
        paymentController.edit(req, res);
        res.on("end", () => {
            assert.equal(res.statusCode, 200);
            const result = res._getData();
//console.log("typeof result is "+typeof result+":["+JSON.stringify(result)+"]");
            const json = JSON.parse(result);
            assert.ok(json.hasOwnProperty('payment'), "expect payment property BUT not.");
            const payment2 = json.payment;
            assert.ok(payment2.hasOwnProperty('paymentDate'), "expect paymentDate property BUT not.");
            assert.ok(payment2.hasOwnProperty('amount'), "expect amount property BUT not.");
        });
    });
});
