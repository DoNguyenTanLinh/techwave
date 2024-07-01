const express = require('express');
const billController = require('../controller/bill.controller');
const bill = express.Router();

bill.put('/received/:id', billController.setReceived);
bill.put('/cancel/:id', billController.setCancel);
// bill.get('/received', billController.getReceivedforUser_bill);
bill.get('/', billController.getforUser_bill);
module.exports = bill;