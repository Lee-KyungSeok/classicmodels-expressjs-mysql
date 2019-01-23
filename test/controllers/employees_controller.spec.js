/*
 Copyright(c) 2009-2019 by GGoons.
*/
'use strict';

const { Observable } = require('rxjs');
//const q = require('q');
const httpMock = require('node-mocks-http');
const sinon = require('sinon');
const assert = require('assert');
const employeeController = require('../../controllers/employees_controller');
const EmployeeDao = require('../../dao/employee.dao');
const EmployeeQueryValidator = require('../../dao/validate/EmployeeQueryValidator');
const EmployeeListQueryValidator = require('../../dao/validate/EmployeeListQueryValidator');
const StringUtils = require('../../utils/string.utils');

const req = httpMock.createRequest();
const res = httpMock.createResponse();

describe('employees_controller testing...', () => {
    before(() => {
        //sinon.stub(EmployeeDao, "count").returns(Observable.of(7));
        //sinon.stub(EmployeeQueryValidator, "validate").returns(Observable.of(req));
        //sinon.stub(EmployeeListQueryValidator, "validate").returns(Observable.of(req));
        //sinon.stub(EmployeeDao, "getEmployeeList").returns(Observable.of([]));
    });
    after(() => {
        //EmployeeDao.count.restore()
        //EmployeeQueryValidator.validate.restore()
        //EmployeeListQueryValidator.validate.restore()
        //EmployeeDao.getEmployeeList.restore()
    });

    it('count should response 7', () => {
        sinon.stub(EmployeeDao, "count").returns(Observable.of(7));
        sinon.stub(EmployeeQueryValidator, "validate").returns(Observable.of(req));
        employeeController.count(req, res);
        res.on("end", () => {
            assert.equal(res.statusCode, 200);
            const result = res._getData();
//console.log("typeof result is "+typeof result+":["+result+"]");
            const json = JSON.parse(res._getData());
            assert.ok(json.hasOwnProperty('count'), "expect count property BUT not.");
            assert.equal(json.count, 7, "expect 7 for count BUT "+json.count);
        });
        EmployeeQueryValidator.validate.restore();
        EmployeeDao.count.restore();
    });

    it('employee.list...', () => {
        sinon.stub(EmployeeDao, "getEmployeeList").returns(Observable.of([]));
        sinon.stub(EmployeeListQueryValidator, "validate").returns(Observable.of(req));
        employeeController.list(req, res);
        res.on("end", () => {
            assert.equal(res.statusCode, 200);
            const result = res._getData();
//console.log("typeof result is "+typeof result+":["+result+"]");
            const json = JSON.parse(res._getData());
            assert.ok(Array.isArray(json), "expect that list return array BUT "+typeof json);
        });
        EmployeeListQueryValidator.validate.restore()
        EmployeeDao.getEmployeeList.restore()
    });

    it('should response 200', () => {
        const ef = {};
        const employee = {lastName:"1", firstName:"1", extension:"1", email:"1", officeCode:"1", reportsTo:1, jobTitle:"1"};
        ef.employee = employee;
        sinon.stub(EmployeeDao, "saveEmployeeEdit").returns(Observable.of(ef));
        employeeController.edit(req, res);
        res.on("end", () => {
            assert.equal(res.statusCode, 200);
            const result = res._getData();
//console.log("typeof result is "+typeof result+":["+JSON.stringify(result)+"]");
            const json = JSON.parse(result);
            assert.ok(json.hasOwnProperty('employee'), "expect employee property BUT not.");
            const employee2 = json.employee;
            assert.ok(employee2.hasOwnProperty('lastName'), "expect lastName property BUT not.");
            assert.ok(employee2.hasOwnProperty('firstName'), "expect firstName property BUT not.");
            assert.ok(employee2.hasOwnProperty('extension'), "expect extension property BUT not.");
            assert.ok(employee2.hasOwnProperty('email'), "expect email property BUT not.");
            assert.ok(employee2.hasOwnProperty('officeCode'), "expect officeCode property BUT not.");
            assert.ok(employee2.hasOwnProperty('reportsTo'), "expect reportsTo property BUT not.");
            assert.ok(employee2.hasOwnProperty('jobTitle'), "expect jobTitle property BUT not.");
        });
    });
});
