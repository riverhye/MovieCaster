const express = require('express');
const app = express();
const PORT = 8000;

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const router = require('./user');

app.use('/main', router); //메인페이지
app.use('/mypage', router); //마이페이지
app.use('/detail', router); // 상세페이지
app.use('/search', router); // 검색페이지
app.use('/signin', router); // 로그인
app.use('/signup', router); // 회원가입
app.use('/header', router); // 헤더
app.use('/footer', router); // 푸터

app.listen(PORT, function () {
  console.log(`Server Open! 서버 주소: http://localhost:${PORT}`);
});
