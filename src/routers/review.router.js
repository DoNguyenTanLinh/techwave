const express = require('express');
const reviewController = require('../controller/review.controller');
const review = express.Router();
review.delete('/delete/:id', reviewController.delete_review)
review.get('/:id', reviewController.getDetail_review);
review.get('/', reviewController.getReview_ByStaff);
module.exports = review;