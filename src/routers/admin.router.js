const express = require('express');
const admin = express.Router();
const accountRouter = require('./account.router')
const introduceController = require('../controller/introduce.controller');

admin.use('/account', accountRouter);
admin.put('/introduce/edit', introduceController.update_introduce);
admin.put('/introduce/clear', introduceController.clear_introduce);
module.exports = admin;