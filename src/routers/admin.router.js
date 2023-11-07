const express = require('express');
const admin = express.Router();
const accountRouter = require('./account.router')
const introduceRouter = require('./introduce.router');
const permissionRouter = require('./permission.router');
const posterRouter = require('./poster.router');
admin.use('/account', accountRouter);
admin.use('/introduce', introduceRouter);
admin.use('/permission', permissionRouter);
admin.use('/poster', posterRouter);
module.exports = admin;