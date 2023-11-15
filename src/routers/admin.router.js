const express = require('express');
const admin = express.Router();
const accountRouter = require('./account.router')
const permissionRouter = require('./permission.router');
const reviewRouter = require('./review.router');
const reportRouter = require('./report.router');
const reasonRouter = require('./reason.router');
const categoryRouter = require('./category.router');
admin.use('/category', categoryRouter);
admin.use('/report', reportRouter);
admin.use('/account', accountRouter);
admin.use('/permission', permissionRouter);
admin.use('/review', reviewRouter);
admin.use('/reason', reasonRouter)
module.exports = admin;