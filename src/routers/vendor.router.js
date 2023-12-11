const express = require('express');
const vendor = express.Router();
const accountRouter = require('./account.router');

const productRouter = require('./product.router');
const billRouter = require('./bill.router');
const reviewRouter = require('./review.router');
const reportRouter = require('./report.router');
const ResponseController = require('../controller/response.controller');
const storeController = require('../controller/store.controller');
vendor.use('/account', accountRouter);
vendor.use('/product', productRouter);
vendor.use('/bill', billRouter);
vendor.use('/review', reviewRouter);
vendor.use('/report', reportRouter);
vendor.get('/statistic', storeController.getStatistic);
vendor.post('/response', ResponseController.create_response);
module.exports = vendor;