const express = require('express');
const folowController = require('../controller/folow.controller');
const folow = express.Router();
folow.post('/add', folowController.add_folow);
folow.delete('/remove/:id', folowController.delete_folow);
folow.get('/', folowController.get_folow);
module.exports = folow;