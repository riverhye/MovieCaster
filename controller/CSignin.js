const { User } = require('../model');

exports.signin = (req, res) => {
  const user = req.session.user;
  const userIndex = req.session.userIndex;
  if (user) {
    res.render('main');
    console.log('userIndex:', userIndex);
    console.log('sessionUser:', user);
  } else {
    console.log('sessionUser:', user);
    res.render('signin');
  }
};

exports.user_signin = (req, res) => {
  User.findOne({ where: { userid: req.body.userid, pw: req.body.pw } }).then((user) => {
    let data;

    if (user) {
      req.session.user = user.dataValues.nickname; // 세션에 유저닉네임 저장
      req.session.userIndex = user.dataValues.useridx; // 세션에 유저인덱스 저장
      console.log('userIndex: ', user.dataValues.useridx);
      console.log('sessionUser: ', user.dataValues.nickname);
      data = { isSuccess: true };
    } else {
      data = { isSuccess: false };
    }
    res.send(data);
  });
};
