const { User } = require('../model');

exports.findpw = (req, res) => {
  res.render('findpw');
};

exports.post_findpw = (req, res) => {
  User.findOne({
    where: { id: req.body.id, email: req.body.email },
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
