const express = require('express');
const poster = express.Router();
const posterController = require('../controller/poster.controller')
poster.post('/create', posterController.create_poster)
poster.put('/edit/:id', posterController.update_poster)
poster.put('/approve/:id', posterController.approve_poster)
poster.put('/reject/:id', posterController.reject_poster)
poster.delete('/remove/:id', posterController.delete_poster)
poster.get('/approve', posterController.get_approve)
poster.get('/reject', posterController.get_reject)
poster.get('/:id', posterController.get_one)
poster.get('/', posterController.get_all)
module.exports = poster;