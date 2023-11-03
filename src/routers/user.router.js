const express = require('express');
const user = express.Router();
const accountRouter = require('./account.router')

user.use('/account', accountRouter);
module.exports = user;