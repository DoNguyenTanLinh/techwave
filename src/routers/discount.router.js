const express = require('express');
const discountController = require('../controller/discount.controller');
const discount = express.Router();

discount.post('/create', discountController.create_Discount);
discount.put('/edit/:id', discountController.edit_Discount);
discount.delete('/delete/:id', discountController.delete_Discount);
discount.get('/voucher', discountController.get_DiscountShopPayment);
discount.get('/freeShip', discountController.get_DiscountShipPayment);
discount.get('/', discountController.get_Discount);
module.exports = discount;