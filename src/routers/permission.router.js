const express = require('express');
const permissionController = require('../controller/permission.controller');
const permission = express.Router();
permission.get('/', permissionController.getAll_permissions)
permission.put('/edit', permissionController.edit_permission)
module.exports = permission;