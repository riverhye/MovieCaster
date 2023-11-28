const express = require('express');
const app = express();
const PORT = 8000;
const multer = require('multer');
const session = require('express-session');
const path = require('path');

app.set('view engine', 'ejs');

app.use(
  session({
    secret: 'secretKey', // envs에 세션키가 환경변수로 존재한다고 가정
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      secure: false,
    },
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isAuthenticated;
  res.locals.user = req.session.useridx;
  console.log('res.locals.user', res.locals.user);
  next();
});
app.use('/static', express.static('static'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const router = require('./routes');
app.use('/', router);

const detailRouter = require('./routes/detail');
app.use('/detail', detailRouter);

const mypageRouter = require('./routes/mypage');
app.use('/mypage', mypageRouter);
app.use('/delete_user', mypageRouter);

const searchRouter = require('./routes/search');
app.use('/search', searchRouter);

const signinRouter = require('./routes/signin');
app.use('/signin', signinRouter);
const signoutRouter = require('./routes/signout');
app.use('/signout', signoutRouter);

const signupRouter = require('./routes/signup');
app.use('/signup', signupRouter);

const findidRouter = require('./routes/findid');
app.use('/findid', findidRouter);

const findpwRouter = require('./routes/findpw');
app.use('/findpw', findpwRouter);

app.get("*", function(req, res){
    res.render("404");
})

app.listen(PORT, function () {
  console.log(`Server Open! 서버 주소: http://localhost:${PORT}`);
});
