const express = require('express');
const admin = express.Router();
const accountRouter = require('./account.router')
const permissionRouter = require('./permission.router');
const reviewRouter = require('./review.router');
const reportRouter = require('./report.router');
const categoryRouter = require('./category.router');
const discountRouter = require('./discount.router');
admin.use('/category', categoryRouter);
admin.use('/report', reportRouter);
admin.use('/account', accountRouter);
admin.use('/permission', permissionRouter);
admin.use('/discount', discountRouter);
admin.use('/review', reviewRouter);
module.exports = admin;