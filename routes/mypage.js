const express = require('express');
const mypageRouter = express.Router();
const controller = require('../controller/CMypage');

mypageRouter.get('/', controller.mypage);
mypageRouter.get('/myfav', controller.myfav);
mypageRouter.get('/myinfo', controller.myinfo);
mypageRouter.get('/mymovielike', controller.mymovielike);
mypageRouter.get('/mycommentlike', controller.mycommentlike);
mypageRouter.get('/mycomment', controller.mycomment);
//회원 삭제하기 위한 라우터
mypageRouter.post('/', controller.delete_user);
//코멘트 삭제하기 위한 라루터
mypageRouter.delete('/mycomment/:id', controller.delete_comment);
//코멘트 수정하기 위한 루터
mypageRouter.put('/mycomment/:id', controller.update_comment);
//내가 좋아요 누른 코멘트 삭제하기 위한 루터
mypageRouter.delete('/mycommentlike/:id', controller.delete_comment_like);
//내가 좋아요 누른 영화 삭제하기 위한 루터
mypageRouter.delete('/mymovielike/:id', controller.delete_movie_like);
module.exports = mypageRouter;
