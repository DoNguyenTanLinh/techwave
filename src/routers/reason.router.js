const express = require('express');
const reasonController = require('../controller/reason.controller');
const reason = express.Router();
reason.post('/create', reasonController.create_reason)
module.exports = reason;