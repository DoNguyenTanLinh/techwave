const express = require('express');
const user = express.Router();
const accountRouter = require('./account.router')
const cartRouter = require('./cart.router')
const billUserRouter = require('./billUser.router')
const folowRouter = require('./folow.router')
const favorProductController = require('../controller/favProduct.controller')
const paymentController = require('../controller/payment.controller')
const reviewController = require('../controller/review.controller')
const reportRouter = require('./report.router');

user.use('/account', accountRouter);
user.use('/cart', cartRouter)
user.use('/bill', billUserRouter)
user.use('/report', reportRouter);
user.use('/folow', folowRouter)
user.post('/review', reviewController.create_review)
user.post('/createBill', paymentController.createPayment)
user.get('/payment', paymentController.getPaymentMethods)
user.get('/favor-product', favorProductController.get_favor_product);
module.exports = user;