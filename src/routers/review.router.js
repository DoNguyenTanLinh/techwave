const express = require('express');
const reviewController = require('../controller/review.controller');
const review = express.Router();
review.delete('/delete/:id', reviewController.delete_review)
review.delete('/deleteResponse/:id', reviewController.delete_responseAdmin)
review.post('/create', reviewController.create_review);
review.get('/:id', reviewController.getDetail_review);
review.get('/', reviewController.getAll_Review);
module.exports = review;