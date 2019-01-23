/*
 Copyright(c) 2009-2019 by GGoons.
*/
'use strict';

const { Observable } = require('rxjs');
//const q = require('q');
const httpMock = require('node-mocks-http');
const sinon = require('sinon');
const assert = require('assert');
const customerController = require('../../controllers/customers_controller');
const CustomerDao = require('../../dao/customer.dao');
const CustomerQueryValidator = require('../../dao/validate/CustomerQueryValidator');
const CustomerListQueryValidator = require('../../dao/validate/CustomerListQueryValidator');
const CustomerPaymentStatisticQueryValidator = require('../../dao/validate/CustomerPaymentStatisticQueryValidator');
const StringUtils = require('../../utils/string.utils');

const req = httpMock.createRequest();
const res = httpMock.createResponse();

describe('customers_controller testing...', () => {
    before(() => {
        //sinon.stub(CustomerDao, "count").returns(Observable.of(7));
        //sinon.stub(CustomerQueryValidator, "validate").returns(Observable.of(req));
        //sinon.stub(CustomerListQueryValidator, "validate").returns(Observable.of(req));
        //sinon.stub(CustomerDao, "getCustomerList").returns(Observable.of([]));
        //sinon.stub(CustomerPaymentStatisticQueryValidator, "validate").returns(Observable.of(req));
        //sinon.stub(CustomerDao, "getCustomerPaymentStatistic").returns(Observable.of([]));
    });
    after(() => {
        //CustomerDao.count.restore()
        //CustomerQueryValidator.validate.restore()
        //CustomerListQueryValidator.validate.restore()
        //CustomerDao.getCustomerList.restore()
        //CustomerPaymentStatisticQueryValidator.validate.restore()
        //CustomerDao.getCustomerPaymentStatistic.restore()
    });

    it('count should response 7', () => {
        sinon.stub(CustomerDao, "count").returns(Observable.of(7));
        sinon.stub(CustomerQueryValidator, "validate").returns(Observable.of(req));
        customerController.count(req, res);
        res.on("end", () => {
            assert.equal(res.statusCode, 200);
            const result = res._getData();
//console.log("typeof result is "+typeof result+":["+result+"]");
            const json = JSON.parse(res._getData());
            assert.ok(json.hasOwnProperty('count'), "expect count property BUT not.");
            assert.equal(json.count, 7, "expect 7 for count BUT "+json.count);
        });
        CustomerQueryValidator.validate.restore();
        CustomerDao.count.restore();
    });

    it('customer.list...', () => {
        sinon.stub(CustomerDao, "getCustomerList").returns(Observable.of([]));
        sinon.stub(CustomerListQueryValidator, "validate").returns(Observable.of(req));
        customerController.list(req, res);
        res.on("end", () => {
            assert.equal(res.statusCode, 200);
            const result = res._getData();
//console.log("typeof result is "+typeof result+":["+result+"]");
            const json = JSON.parse(res._getData());
            assert.ok(Array.isArray(json), "expect that list return array BUT "+typeof json);
        });
        CustomerListQueryValidator.validate.restore()
        CustomerDao.getCustomerList.restore()
    });

    it('customer.statistics...', () => {
        sinon.stub(CustomerDao, "getCustomerPaymentStatistic").returns(Observable.of([]));
        sinon.stub(CustomerPaymentStatisticQueryValidator, "validate").returns(Observable.of(req));
        customerController.statistics(req, res);
        res.on("end", () => {
            assert.equal(res.statusCode, 200);
            const result = res._getData();
//console.log("typeof result is "+typeof result+":["+result+"]");
            const json = JSON.parse(res._getData());
            assert.ok(Array.isArray(json), "expect that statistics return array BUT "+typeof json);
        });
        CustomerPaymentStatisticQueryValidator.validate.restore()
        CustomerDao.getCustomerPaymentStatistic.restore()
    });

    it('should response 200', () => {
        const ef = {};
        const customer = {customerName:"1", contactLastName:"1", contactFirstName:"1", phone:"1", addressLine1:"1", addressLine2:"1", city:"1", state:"1", postalCode:"1", country:"1", salesRepEmployeeNumber:1, creditLimit:1};
        ef.customer = customer;
        sinon.stub(CustomerDao, "saveCustomerEdit").returns(Observable.of(ef));
        customerController.edit(req, res);
        res.on("end", () => {
            assert.equal(res.statusCode, 200);
            const result = res._getData();
//console.log("typeof result is "+typeof result+":["+JSON.stringify(result)+"]");
            const json = JSON.parse(result);
            assert.ok(json.hasOwnProperty('customer'), "expect customer property BUT not.");
            const customer2 = json.customer;
            assert.ok(customer2.hasOwnProperty('customerName'), "expect customerName property BUT not.");
            assert.ok(customer2.hasOwnProperty('contactLastName'), "expect contactLastName property BUT not.");
            assert.ok(customer2.hasOwnProperty('contactFirstName'), "expect contactFirstName property BUT not.");
            assert.ok(customer2.hasOwnProperty('phone'), "expect phone property BUT not.");
            assert.ok(customer2.hasOwnProperty('addressLine1'), "expect addressLine1 property BUT not.");
            assert.ok(customer2.hasOwnProperty('addressLine2'), "expect addressLine2 property BUT not.");
            assert.ok(customer2.hasOwnProperty('city'), "expect city property BUT not.");
            assert.ok(customer2.hasOwnProperty('state'), "expect state property BUT not.");
            assert.ok(customer2.hasOwnProperty('postalCode'), "expect postalCode property BUT not.");
            assert.ok(customer2.hasOwnProperty('country'), "expect country property BUT not.");
            assert.ok(customer2.hasOwnProperty('salesRepEmployeeNumber'), "expect salesRepEmployeeNumber property BUT not.");
            assert.ok(customer2.hasOwnProperty('creditLimit'), "expect creditLimit property BUT not.");
        });
    });
});
