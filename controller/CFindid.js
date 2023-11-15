const { User } = require('../model');

exports.findid = (req, res) => {
  res.render('findid');
};

exports.post_findid = (req, res) => {
  User.findOne({
    where: { email: req.body.email },
  }).then((user) => {
    let data;

    if (user) {
      data = { isSuccess: true };
    } else {
      data = { isSuccess: false };
    }
    res.send(data);
  });
};
