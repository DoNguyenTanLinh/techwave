const express = require('express');

const introduceRouter = require('./introduce.router');
const home = express.Router();
home.use('/introduce', introduceRouter)
module.exports = home;