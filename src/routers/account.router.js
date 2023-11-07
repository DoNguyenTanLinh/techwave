const express = require('express');
const accountController = require('../controller/account.controller')
const { deleteAllAddress } = require('../middleware/address.Action')
const { adminPermission } = require('../middleware/admin.Action')
const router = express.Router();
router.get('/detail/:id', accountController.get_OthDetails);
router.get('/detail', accountController.get_Detail);
router.post('/create', accountController.create_account);
router.put('/edit/:id', adminPermission, accountController.update_account);
router.put('/edit', accountController.update_account);
router.put('/delete-soft/:id', accountController.soft_delete);
router.put('/active/:id', accountController.active);
router.delete('/remove/:id', deleteAllAddress, accountController.remove_account);
router.get('/', accountController.get_All);

module.exports = router;
