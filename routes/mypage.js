const express = require("express");
const mypageRouter = express.Router();
const controller = require("../controller/CMypage");

mypageRouter.get('/', controller.mypage);
mypageRouter.get('/myfav', controller.myfav);
mypageRouter.get('/myinfo', controller.myinfo);
mypageRouter.get('/mymovielike', controller.mymovielike);
mypageRouter.get('/mycommentlike', controller.mycommentlike);
mypageRouter.get('/mycomment', controller.mycomment);

module.exports = mypageRouter