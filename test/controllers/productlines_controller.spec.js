/*
 Copyright(c) 2009-2019 by GGoons.
*/
'use strict';

const { Observable } = require('rxjs');
//const q = require('q');
const httpMock = require('node-mocks-http');
const sinon = require('sinon');
const assert = require('assert');
const productlineController = require('../../controllers/productlines_controller');
const ProductlineDao = require('../../dao/productline.dao');
const ProductlineQueryValidator = require('../../dao/validate/ProductlineQueryValidator');
const StringUtils = require('../../utils/string.utils');

const req = httpMock.createRequest();
const res = httpMock.createResponse();

describe('productlines_controller testing...', () => {
    before(() => {
        //sinon.stub(ProductlineDao, "count").returns(Observable.of(7));
        //sinon.stub(ProductlineQueryValidator, "validate").returns(Observable.of(req));
        //sinon.stub(ProductlineDao, "getProductlineList").returns(Observable.of([]));
    });
    after(() => {
        //ProductlineDao.count.restore()
        //ProductlineQueryValidator.validate.restore()
        //ProductlineDao.getProductlineList.restore()
    });

    it('count should response 7', () => {
        sinon.stub(ProductlineDao, "count").returns(Observable.of(7));
        sinon.stub(ProductlineQueryValidator, "validate").returns(Observable.of(req));
        productlineController.count(req, res);
        res.on("end", () => {
            assert.equal(res.statusCode, 200);
            const result = res._getData();
//console.log("typeof result is "+typeof result+":["+result+"]");
            const json = JSON.parse(res._getData());
            assert.ok(json.hasOwnProperty('count'), "expect count property BUT not.");
            assert.equal(json.count, 7, "expect 7 for count BUT "+json.count);
        });
        ProductlineQueryValidator.validate.restore();
        ProductlineDao.count.restore();
    });

    it('productline.list...', () => {
        sinon.stub(ProductlineDao, "getProductlineList").returns(Observable.of([]));
        sinon.stub(ProductlineQueryValidator, "validate").returns(Observable.of(req));
        productlineController.list(req, res);
        res.on("end", () => {
            assert.equal(res.statusCode, 200);
            const result = res._getData();
//console.log("typeof result is "+typeof result+":["+result+"]");
            const json = JSON.parse(res._getData());
            assert.ok(Array.isArray(json), "expect that list return array BUT "+typeof json);
        });
        ProductlineQueryValidator.validate.restore()
        ProductlineDao.getProductlineList.restore()
    });

    it('should response 200', () => {
        const ef = {};
        const productline = {textDescription:"1", htmlDescription:"1", image:[1,2,3]};
        ef.productline = productline;
        sinon.stub(ProductlineDao, "saveProductlineEdit").returns(Observable.of(ef));
        productlineController.edit(req, res);
        res.on("end", () => {
            assert.equal(res.statusCode, 200);
            const result = res._getData();
//console.log("typeof result is "+typeof result+":["+JSON.stringify(result)+"]");
            const json = JSON.parse(result);
            assert.ok(json.hasOwnProperty('productline'), "expect productline property BUT not.");
            const productline2 = json.productline;
            assert.ok(productline2.hasOwnProperty('textDescription'), "expect textDescription property BUT not.");
            assert.ok(productline2.hasOwnProperty('htmlDescription'), "expect htmlDescription property BUT not.");
            assert.ok(productline2.hasOwnProperty('image'), "expect image property BUT not.");
        });
    });
});
