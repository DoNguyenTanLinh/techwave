const express = require('express');
const admin = express.Router();
const accountRouter = require('./account.router')
const introduceRouter = require('./introduce.router');
const permissionRouter = require('./permission.router');
admin.use('/account', accountRouter);
admin.use('/introduce', introduceRouter);
admin.use('/permission', permissionRouter);
module.exports = admin;