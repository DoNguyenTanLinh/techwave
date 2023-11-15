const express = require('express');
const productController = require('../controller/product.controller');
const favProductController = require('../controller/favProduct.controller');
const home = express.Router();

home.post('/product/favor/:id', favProductController.add_fav_product)
home.delete('/product/deletefavor/:id', favProductController.delete_favor_product)
home.get('/product/:id', productController.getOne_product)
home.get('/product', productController.getAllForUser_product)
home.get('/category/:id', productController.getByCategory)

module.exports = home;