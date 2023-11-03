const express = require('express');
const introduceController = require('../controller/introduce.controller');
const introduce = express.Router();
introduce.get('/', introduceController.get_introduce);
module.exports = introduce;