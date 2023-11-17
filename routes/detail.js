const express = require('express');
const detailRouter = express.Router();
const controller = require('../controller/CDetail');

detailRouter.get('/', controller.detail);

// row1: 리뷰 불러오기
detailRouter.get('/getReview', controller.getReviews);

// row1: 리뷰 저장하기

detailRouter.post('/saveReview', controller.saveReview);

// detailRouter.post('/', controller.saveRating);

// detailRouter.get("/", controller.comment);
// detailRouter.post('/', controller.comment);
// detailRouter.post("/", controller.movie_detail);

module.exports = detailRouter;
