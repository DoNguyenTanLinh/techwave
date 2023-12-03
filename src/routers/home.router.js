const express = require('express');
const productController = require('../controller/product.controller');
const categoryController = require('../controller/category.controller');
const storeController = require('../controller/store.controller');
const favProductController = require('../controller/favProduct.controller');
const uploadCloud = require('../service/uploadFileService');
const home = express.Router();

home.post('/product/favor/:id', favProductController.add_fav_product)
home.delete('/product/deletefavor/:id', favProductController.delete_favor_product)
home.get('/product/:id', productController.getOne_product)
home.get('/product', productController.getAllForUser_product)
home.get('/category/:id', productController.getByCategory)
home.get('/category', categoryController.getAll_category)
home.get('/store/:id', storeController.getStore)
home.get('/search/:name', productController.findByName_product)
home.post('/uploadFile', uploadCloud.single('image'), (req, res) => {
    if (!req.file) {
        res.json({ status: false, message: 'No file uploaded!' });
    }
    else res.json({ status: true, imagePath: req.file.path })
})
module.exports = home;