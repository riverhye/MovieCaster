const { User } = require('../model');

exports.findpw = (req, res) => {
  res.render('findpw');
};

exports.user_findpw = (req, res) => {
  User.findOne({
    where: { userid: req.body.userid, email: req.body.email },
  }).then((user) => {
    let pwFound;
    if (user) {
      pwFound = user.pw;
      console.log('pw: ', pwFound);
    }
    res.send(pwFound);
  });
};
