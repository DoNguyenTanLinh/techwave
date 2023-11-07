const express = require('express');
const cartController = require('../controller/cart.controller');
const cart = express.Router();
cart.post('/create/:id', cartController.create_cart)
cart.put('/update/:id', cartController.update_cart)
cart.delete('/remove/:id', cartController.delete_cart)
cart.get('/', cartController.getAll_cart)
module.exports = cart;