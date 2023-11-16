const express = require("express");
const mypageRouter = express.Router();
const controller = require("../controller/CMypage");

mypageRouter.get('/', controller.mypage);
mypageRouter.get('/myfav', controller.myfav);
mypageRouter.get('/myinfo', controller.myinfo);
mypageRouter.get('/mymovielike', controller.mymovielike);
mypageRouter.get('/mycommentlike', controller.mycommentlike);
mypageRouter.get('/mycomment', controller.mycomment);
//코멘트 삭제하기 위한 루터
mypageRouter.delete('/mycomment/:id', controller.delete_comment);

module.exports = mypageRouter