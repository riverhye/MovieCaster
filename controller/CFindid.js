const { User } = require('../model');

exports.findid = (req, res) => {
  res.render('findid');
};

exports.user_findid = (req, res) => {
  User.findOne({
    where: { email: req.body.email },
  }).then((user) => {
    let idFound;
    if (user) {
      idFound = user.userid;
      console.log('userid: ', idFound);
    }
    res.send(idFound);
  });
};
