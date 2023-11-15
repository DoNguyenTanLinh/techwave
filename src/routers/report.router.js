const express = require('express');
const reportController = require('../controller/report.controller');

const report = express.Router();
report.post('/create', reportController.create_report)
report.put('/resolve/:id', reportController.resolve_report)
report.get('/:id', reportController.get_detail_report)
report.get('/', reportController.get_report)
module.exports = report;