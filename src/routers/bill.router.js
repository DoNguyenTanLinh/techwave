const express = require('express');
const billController = require('../controller/bill.controller');
const bill = express.Router();
bill.put('/approve/:id', billController.setApproval);
bill.put('/reject/:id', billController.setReject);
bill.delete('/delete/:id', billController.delete_bill);
bill.get('/status/:status', billController.getforVender_bill);
bill.get('/:id', billController.getOne_bill);
module.exports = bill;