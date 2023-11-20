const express = require('express');
const detailRouter = express.Router();
const controller = require('../controller/CDetail');

detailRouter.get('/', controller.getReviews);

detailRouter.get('/getMovieInfo', controller.getMovieInfo);

detailRouter.post('/saveReview', controller.saveReview);

module.exports = detailRouter;
