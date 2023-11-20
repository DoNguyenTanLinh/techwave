const express = require('express');
const product = express.Router();
const productController = require('../controller/product.controller');
const detailRouter = require('./detailProduct.router');
const optionRouter = require('./optionProduct.router');
product.use('/detail/:id', (req, res, next) => { req.product_id = req.params.id; next() }, detailRouter)
product.use('/option/:id', (req, res, next) => { req.product_id = req.params.id; next() }, optionRouter)
product.post('/create', productController.create_product)
product.put('/edit/:id', productController.update_product)
product.delete('/remove/:id', productController.delete_product)
product.get('/:id', productController.getOne_product)
product.get('/', productController.getForVendor_product)

module.exports = product;