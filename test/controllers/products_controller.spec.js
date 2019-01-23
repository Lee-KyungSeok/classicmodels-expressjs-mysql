/*
 Copyright(c) 2009-2019 by GGoons.
*/
'use strict';

const { Observable } = require('rxjs');
//const q = require('q');
const httpMock = require('node-mocks-http');
const sinon = require('sinon');
const assert = require('assert');
const productController = require('../../controllers/products_controller');
const ProductDao = require('../../dao/product.dao');
const ProductQueryValidator = require('../../dao/validate/ProductQueryValidator');
const StringUtils = require('../../utils/string.utils');

const req = httpMock.createRequest();
const res = httpMock.createResponse();

describe('products_controller testing...', () => {
    before(() => {
        //sinon.stub(ProductDao, "count").returns(Observable.of(7));
        //sinon.stub(ProductQueryValidator, "validate").returns(Observable.of(req));
        //sinon.stub(ProductDao, "getProductList").returns(Observable.of([]));
    });
    after(() => {
        //ProductDao.count.restore()
        //ProductQueryValidator.validate.restore()
        //ProductDao.getProductList.restore()
    });

    it('count should response 7', () => {
        sinon.stub(ProductDao, "count").returns(Observable.of(7));
        sinon.stub(ProductQueryValidator, "validate").returns(Observable.of(req));
        productController.count(req, res);
        res.on("end", () => {
            assert.equal(res.statusCode, 200);
            const result = res._getData();
//console.log("typeof result is "+typeof result+":["+result+"]");
            const json = JSON.parse(res._getData());
            assert.ok(json.hasOwnProperty('count'), "expect count property BUT not.");
            assert.equal(json.count, 7, "expect 7 for count BUT "+json.count);
        });
        ProductQueryValidator.validate.restore();
        ProductDao.count.restore();
    });

    it('product.list...', () => {
        sinon.stub(ProductDao, "getProductList").returns(Observable.of([]));
        sinon.stub(ProductQueryValidator, "validate").returns(Observable.of(req));
        productController.list(req, res);
        res.on("end", () => {
            assert.equal(res.statusCode, 200);
            const result = res._getData();
//console.log("typeof result is "+typeof result+":["+result+"]");
            const json = JSON.parse(res._getData());
            assert.ok(Array.isArray(json), "expect that list return array BUT "+typeof json);
        });
        ProductQueryValidator.validate.restore()
        ProductDao.getProductList.restore()
    });

    it('should response 200', () => {
        const ef = {};
        const product = {productName:"1", productLine:"1", productScale:"1", productVendor:"1", productDescription:"1", quantityInStock:1, buyPrice:1, msrp:1};
        ef.product = product;
        sinon.stub(ProductDao, "saveProductEdit").returns(Observable.of(ef));
        productController.edit(req, res);
        res.on("end", () => {
            assert.equal(res.statusCode, 200);
            const result = res._getData();
//console.log("typeof result is "+typeof result+":["+JSON.stringify(result)+"]");
            const json = JSON.parse(result);
            assert.ok(json.hasOwnProperty('product'), "expect product property BUT not.");
            const product2 = json.product;
            assert.ok(product2.hasOwnProperty('productName'), "expect productName property BUT not.");
            assert.ok(product2.hasOwnProperty('productLine'), "expect productLine property BUT not.");
            assert.ok(product2.hasOwnProperty('productScale'), "expect productScale property BUT not.");
            assert.ok(product2.hasOwnProperty('productVendor'), "expect productVendor property BUT not.");
            assert.ok(product2.hasOwnProperty('productDescription'), "expect productDescription property BUT not.");
            assert.ok(product2.hasOwnProperty('quantityInStock'), "expect quantityInStock property BUT not.");
            assert.ok(product2.hasOwnProperty('buyPrice'), "expect buyPrice property BUT not.");
            assert.ok(product2.hasOwnProperty('msrp'), "expect msrp property BUT not.");
        });
    });
});
