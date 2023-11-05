const express = require('express');
const categoryController = require('../controller/category.controller');
const category = express.Router();
category.post('/create', categoryController.create_category)
category.put('/edit/:id', categoryController.update_category)
category.delete('/remove/:id', categoryController.delete_category)
category.get('/', categoryController.getAll_category)
module.exports = category;