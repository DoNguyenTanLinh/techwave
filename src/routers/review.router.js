const express = require('express');
const reviewController = require('../controller/review.controller');
const review = express.Router();
review.delete('/delete/:id', reviewController.delete_review)
review.get('/status/:status', reviewController.getReview_ByStaff);
review.post('/create', reviewController.create_review);
review.get('/:id', reviewController.getDetail_review);
review.get('/', reviewController.getReview_ByAdmin);
module.exports = review;