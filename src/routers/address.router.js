const express = require('express');
const address = express.Router();
const addressController = require('../controller/address.controller');

address.delete('/delete/:id', addressController.delete);
address.put('/update/:id', addressController.update);
address.put('/default/:id', addressController.setDefault);
address.post('/create', addressController.create);
address.get('/', addressController.get_All);
module.exports = address;
