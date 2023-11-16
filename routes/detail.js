const express = require('express');
const detailRouter = express.Router();
const controller = require('../controller/CDetail');

detailRouter.get('/', controller.detail);
// 아래로 미완
detailRouter.get('/', controller.one_line_comment);
detailRouter.post('/', controller.one_line_comment_new);
detailRouter.post('/', controller.movie_detail);

module.exports = detailRouter;
