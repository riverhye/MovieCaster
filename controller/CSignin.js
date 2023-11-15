const { User } = require('../model');

exports.signin = (req, res) => {
  res.render('signin');
};

exports.user_signin = (req, res) => {
  User.findOne({ where: { userid: req.body.userid, pw: req.body.pw } }).then((user) => {
    let data;

    if (user) {
      data = { isSuccess: true };
    } else {
      data = { isSuccess: false };
    }
    res.send(data);
  });
};
