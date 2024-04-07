const express = require('express');
const discountController = require('../controller/discount.controller');
const discount = express.Router();

discount.post('/create', discountController.create_Discount);
discount.get('/', discountController.get_Discount_Payment);
module.exports = discount;