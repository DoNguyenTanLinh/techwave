const express = require('express');
const user = express.Router();
const accountRouter = require('./account.router')
const cartRouter = require('./cart.router')
const billUserRouter = require('./billUser.router')
const folowRouter = require('./folow.router')
const favorProductController = require('../controller/favProduct.controller')
const paymentController = require('../controller/payment.controller')
const reportRouter = require('./report.router');
const paymentRouter = require('./payment.router');
const reviewRouter = require('./review.router');
const discountRouter = require('./discount.router');
const checkPaymentAction = require('../middleware/checkpayment.Action');
user.use('/discount', discountRouter);
user.use('/account', accountRouter);
user.use('/cart', cartRouter)
user.use('/bill', billUserRouter)
user.use('/report', reportRouter);
user.use('/folow', folowRouter);
user.use('/payment', paymentRouter);
user.use('/review', reviewRouter)
// user.post('/createBill', checkPaymentAction)
user.post('/createBill', checkPaymentAction, paymentController.createPayment, paymentController.createEmail)
// user.get('/payment', paymentController.getPaymentMethods)
user.get('/favor-product', favorProductController.get_favor_product);
module.exports = user;