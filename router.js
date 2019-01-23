/**
 Copyright(c) 2009-2019 by GGoons.
*/
const express = require('express');
// load customers conteroller
const customer = require('./controllers/customers_controller'); 
// load employees conteroller
const employee = require('./controllers/employees_controller'); 
// load offices conteroller
const office = require('./controllers/offices_controller'); 
// load orderdetails conteroller
const orderdetail = require('./controllers/orderdetails_controller'); 
// load orders conteroller
const order = require('./controllers/orders_controller'); 
// load payments conteroller
const payment = require('./controllers/payments_controller'); 
// load productlines conteroller
const productline = require('./controllers/productlines_controller'); 
// load products conteroller
const product = require('./controllers/products_controller'); 
const uploadController = require('./controllers/upload.controller'); 

// routes
module.exports = function(app) {
    app.post('/upload/file', uploadController.upload_file);
    app.post('/upload/ckeditor-file', uploadController.upload_ckeditor_file);
    app.get("/customers/list", customer.list);
    app.get("/customers/list/count", customer.listCount);
    app.get("/customers/show/:customerNumber", customer.show);
    app.post("/customers/edit", customer.edit);
    app.get("/customers/edit/:customerNumber", customer.getCustomerEdit);
    app.get("/customers/statistics", customer.statistics);
    app.post("/customers/save", customer.save);
    app.get("/customers/find/:customerNumber", customer.find);
    app.get("/customers/query", customer.query);
    app.post("/customers/update", customer.update);
    app.delete("/customers/delete", customer.deletes);
    app.delete("/customers/destroy/:customerNumber", customer.destroy);
    app.get("/employees/list", employee.list);
    app.get("/employees/list/count", employee.listCount);
    app.get("/employees/show/:employeeNumber", employee.show);
    app.post("/employees/edit", employee.edit);
    app.get("/employees/edit/:employeeNumber", employee.getEmployeeEdit);
    app.post("/employees/save", employee.save);
    app.get("/employees/find/:employeeNumber", employee.find);
    app.get("/employees/query", employee.query);
    app.post("/employees/update", employee.update);
    app.delete("/employees/delete", employee.deletes);
    app.delete("/employees/destroy/:employeeNumber", employee.destroy);
    app.get("/offices/list", office.list);
    app.get("/offices/list/count", office.listCount);
    app.get("/offices/show/:officeCode", office.show);
    app.post("/offices/edit", office.edit);
    app.get("/offices/edit/:officeCode", office.getOfficeEdit);
    app.get("/offices/map", office.map);
    app.post("/offices/save", office.save);
    app.get("/offices/find/:officeCode", office.find);
    app.get("/offices/query", office.query);
    app.post("/offices/update", office.update);
    app.delete("/offices/delete", office.deletes);
    app.delete("/offices/destroy/:officeCode", office.destroy);
    app.get("/orderdetails/list", orderdetail.list);
    app.get("/orderdetails/list/count", orderdetail.listCount);
    app.get("/orderdetails/show/:orderNumber/:productCode", orderdetail.show);
    app.post("/orderdetails/edit", orderdetail.edit);
    app.get("/orderdetails/edit/:orderNumber/:productCode", orderdetail.getOrderdetailEdit);
    app.post("/orderdetails/save", orderdetail.save);
    app.get("/orderdetails/find/:orderNumber/:productCode", orderdetail.find);
    app.get("/orderdetails/query", orderdetail.query);
    app.post("/orderdetails/update", orderdetail.update);
    app.delete("/orderdetails/delete", orderdetail.deletes);
    app.delete("/orderdetails/destroy/:orderNumber/:productCode", orderdetail.destroy);
    app.get("/orders/list", order.list);
    app.get("/orders/list/count", order.listCount);
    app.get("/orders/show/:orderNumber", order.show);
    app.post("/orders/edit", order.edit);
    app.get("/orders/edit/:orderNumber", order.getOrderEdit);
    app.post("/orders/save", order.save);
    app.get("/orders/find/:orderNumber", order.find);
    app.get("/orders/query", order.query);
    app.post("/orders/update", order.update);
    app.delete("/orders/delete", order.deletes);
    app.delete("/orders/destroy/:orderNumber", order.destroy);
    app.get("/payments/list", payment.list);
    app.get("/payments/list/count", payment.listCount);
    app.get("/payments/show/:customerNumber/:checkNumber", payment.show);
    app.post("/payments/edit", payment.edit);
    app.get("/payments/edit/:customerNumber/:checkNumber", payment.getPaymentEdit);
    app.post("/payments/save", payment.save);
    app.get("/payments/find/:customerNumber/:checkNumber", payment.find);
    app.get("/payments/query", payment.query);
    app.post("/payments/update", payment.update);
    app.delete("/payments/delete", payment.deletes);
    app.delete("/payments/destroy/:customerNumber/:checkNumber", payment.destroy);
    app.get("/productlines/list", productline.list);
    app.get("/productlines/list/count", productline.listCount);
    app.get("/productlines/show/:productLine", productline.show);
    app.post("/productlines/edit", productline.edit);
    app.get("/productlines/edit/:productLine", productline.getProductlineEdit);
    app.post("/productlines/save", productline.save);
    app.get("/productlines/find/:productLine", productline.find);
    app.get("/productlines/query", productline.query);
    app.post("/productlines/update", productline.update);
    app.delete("/productlines/delete", productline.deletes);
    app.delete("/productlines/destroy/:productLine", productline.destroy);
    app.get("/products/list", product.list);
    app.get("/products/list/count", product.listCount);
    app.get("/products/show/:productCode", product.show);
    app.post("/products/edit", product.edit);
    app.get("/products/edit/:productCode", product.getProductEdit);
    app.post("/products/save", product.save);
    app.get("/products/find/:productCode", product.find);
    app.get("/products/query", product.query);
    app.post("/products/update", product.update);
    app.delete("/products/delete", product.deletes);
    app.delete("/products/destroy/:productCode", product.destroy);
    app.use("/uploaded", express.static(__dirname + "/uploaded"));
}
