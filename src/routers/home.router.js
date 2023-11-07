const express = require('express');
const introduceController = require('../controller/introduce.controller');
const productController = require('../controller/product.controller');
const favProductController = require('../controller/favProduct.controller');
const posterController = require('../controller/poster.controller');
const home = express.Router();
home.use('/introduce', introduceController.get_introduce)
home.post('/product/favor/:id', favProductController.add_fav_product)
home.delete('/product/deletefavor/:id', favProductController.delete_favor_product)
home.get('/product/:id', productController.getDetail_product)
home.get('/product', productController.getAll_product)
home.get('/category/:id', productController.getByCategory)
home.get('/poster/:id', posterController.get_one)
home.get('/poster', posterController.get_all)
module.exports = home;