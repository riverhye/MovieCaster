const { User } = require('../model');

exports.signup = (req, res) => {
  res.render('signup');
};

exports.user_signup = (req, res) => {
  User.create(req.body).then((user) => {
    res.send({ user: true });
    console.log('signup result', user);
  });
};
