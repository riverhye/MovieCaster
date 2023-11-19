const { User } = require('../model');

exports.signin = (req, res) => {
  const user = req.session.user;
  const userIndex = req.session.userIndex;
  if (user) {
    res.render('main');
    console.log(`{sessionUser: ${user}, userIndex: ${userIndex}}`);
  } else {
    res.render('signin');
    console.log(`{sessionUser: ${user}, userIndex: ${userIndex}}`);
  }
};

exports.signout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('세션 삭제 중 에러:', err);
      res.status(500).send('세션 삭제 중 에러 발생');
    } else {
      res.redirect('/'); // 로그아웃 후 로그인 페이지로 리다이렉트
    }
  });
};

exports.user_signin = (req, res) => {
  User.findOne({ where: { userid: req.body.userid, pw: req.body.pw, del_user_ch: 'n' } }).then((user) => {
    // 회원탈퇴 된 유저가 로그인 되는 현상 발생 => where조건 추가
    let data;

    if (user) {
      req.session.user = user.dataValues.nickname; // 세션에 유저닉네임 저장
      req.session.userIndex = user.dataValues.useridx; // 세션에 유저인덱스 저장
      console.log('로그인 성공!');
      console.log(`{sessionUser: ${req.session.user}, userIndex: ${req.session.userIndex}}`);
      data = { isSuccess: true };
    } else {
      console.log('로그인 실패');
      console.log(`{sessionUser: ${req.session.user}, userIndex: ${req.session.userIndex}}`);
      data = { isSuccess: false };
    }
    res.send(data);
  });
};
