const express = require('express');
const introduceController = require('../controller/introduce.controller');
const introduce = express.Router();
introduce.put('/edit', introduceController.update_introduce);
introduce.put('/clear', introduceController.clear_introduce);
module.exports = introduce;