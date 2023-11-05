const express = require('express');
const staff = express.Router();
const accountRouter = require('./account.router');
const categoryRouter = require('./category.router');
const productRouter = require('./product.router');

staff.use('/account', accountRouter);
staff.use('/category', categoryRouter);
staff.use('/product', productRouter);
module.exports = staff;