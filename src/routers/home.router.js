const express = require('express');
const productController = require('../controller/product.controller');
const categoryController = require('../controller/category.controller');
const storeController = require('../controller/store.controller');
const favProductController = require('../controller/favProduct.controller');
const uploadCloud = require('../service/uploadFileService');
const discountRouter = require('./discount.router');
const home = express.Router();

home.post('/product/favor/:id', favProductController.add_fav_product)
home.delete('/product/deletefavor/:id', favProductController.delete_favor_product)
home.get('/product/:id', productController.getOne_product)
home.get('/product', productController.getAllForUser_product)
home.get('/category/:id', productController.getByCategory, (req, res) => {
    const productsWithData = res.locals.productsWithData;
    const listCate = res.locals.listCate;
    if (req.query.page) {
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const results = {};
        results.total = Math.ceil(productsWithData.length / limit)
        if (endIndex < productsWithData.length) {
            results.next = {
                page: page + 1,
                limit: limit
            };
        }
        if (startIndex > 0) {
            results.previous = {
                page: page - 1,
                limit: limit
            };
        }
        results.results = productsWithData.slice(startIndex, endIndex);
        res.json({ listCate: listCate, data: results });
    } else {
        res.json({ listCate: listCate, data: productsWithData });
    }
})
home.use('/discount', discountRouter);
home.get('/category', categoryController.getAll_category)
home.get('/store/:id', storeController.getStore)
home.get('/search', productController.findByName_product)
home.post('/uploadFile', uploadCloud.single('image'), (req, res) => {
    if (!req.file) {
        res.json({ status: false, message: 'No file uploaded!' });
    }
    else res.json({ status: true, imagePath: req.file.path })
})
module.exports = home;