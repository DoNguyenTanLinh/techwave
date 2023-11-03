const express = require('express');
const accountController = require('../controller/account.controller')
const { deleteAllAddress } = require('../middleware/address.Action')
const addressRouter = require('./address.router')
const router = express.Router();
router.get('/detail/:id', accountController.get_DetailOthAccount);
router.get('/detail', accountController.get_Detail);
router.post('/create', accountController.create_account);
router.use('/edit/address/', addressRouter);
router.put('/edit', accountController.update_account);
router.put('/delete-soft/:id', accountController.soft_delete);
router.put('/active/:id', accountController.active);
router.delete('/remove/:id', deleteAllAddress, accountController.remove_account);
router.get('/', accountController.get_All);

module.exports = router;
