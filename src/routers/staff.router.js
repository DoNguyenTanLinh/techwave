const express = require('express');
const staff = express.Router();
const accountRouter = require('./account.router')

staff.use('/account', accountRouter);
module.exports = staff;