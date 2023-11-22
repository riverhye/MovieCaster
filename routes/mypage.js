const express = require('express');
const mypageRouter = express.Router();
const controller = require('../controller/CMypage');
const multer = require('multer');
const path = require('path');

// multer 설정
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const basename = path.basename(file.originalname, ext);
    const uniqueName = basename + '_' + ext + '_' + Date.now();
    cb(null, uniqueName);
  },
});
const upload = multer({ storage: storage });

mypageRouter.get('/', controller.mypage);

mypageRouter.get('/myfav', controller.myfav);
mypageRouter.get('/myinfo', controller.myinfo);
mypageRouter.get('/mymovielike', controller.mymovielike);
mypageRouter.get('/mycommentlike', controller.mycommentlike);
mypageRouter.get('/mycomment', controller.mycomment);
//회원 삭제하기 위한 라우터
mypageRouter.post('/', controller.delete_user);
//회원정보 수정하기 위한 라우터
mypageRouter.post('/mypage/update', upload.single('profileImage'), controller.update_profile);
//코멘트 삭제하기 위한 라루터
mypageRouter.delete('/mycomment/:id', controller.delete_comment);
//내가 좋아요 누른 코멘트 삭제하기 위한 라우터
mypageRouter.delete('/mycommentlike/:id', controller.delete_comment_like);
//내가 좋아요 누른 영화 삭제하기 위한 라우터
mypageRouter.delete('/mymovielike/:id', controller.delete_movie_like);
//인생영화 등록
mypageRouter.post('/myfav/add', controller.addFavMovie);
module.exports = mypageRouter;

// 메인에서 좋아요 한 코멘트 마이 페이지로 연결
mypageRouter.post('/mycommentlike', controller.maintomycommentlike);
