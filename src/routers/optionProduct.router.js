const express = require('express');
const optionController = require('../controller/option.controller');
const option = express.Router();
option.post('/create', optionController.create_option)
option.put('/edit/:id', optionController.update_option)
option.delete('/remove/:id', optionController.delete_option)
option.get('/', optionController.get_option)
module.exports = option;