const express = require('express');
const detailController = require('../controller/detail.controller');
const detail = express.Router();
detail.put('/edit', detailController.update_detail)
detail.put('/clear', detailController.clear_detail)
detail.get('/', detailController.get_detail)
module.exports = detail;