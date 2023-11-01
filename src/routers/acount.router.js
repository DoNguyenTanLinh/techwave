const express = require('express');
const accountController = require('../controller/account.controller')
const jwtService = require('../service/JWTService')
const router = express.Router();

router.get('/token', accountController.get_token);
router.get('/', accountController.get_All);
router.get('/:id', accountController.get_Detail);

module.exports = router;
