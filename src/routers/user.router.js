const express = require('express');
const user = express.Router();
const accountRouter = require('./account.router')
const cartRouter = require('./cart.router')
const favorProductController = require('../controller/favProduct.controller')
const paymentController = require('../controller/payment.controller')

user.use('/account', accountRouter);
user.use('/cart', cartRouter)
user.get('/payment', paymentController.getPaymentMethods)
user.get('/favor-product', favorProductController.get_favor_product);
module.exports = user;