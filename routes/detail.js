const express = require('express');
const detailRouter = express.Router();
const controller = require('../controller/CDetail');

// 영화 정보 가져오기
detailRouter.get('/getMovieInfo/:movieidx', controller.getMovieInfo);

// 영화 리뷰 가져오기
detailRouter.get('/getReviews', controller.getReviews);

// 영화 리뷰 저장하기
detailRouter.post('/saveReview', controller.saveReview);

module.exports = detailRouter;
