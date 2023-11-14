const {User} = require('../model');

exports.signup = (req, res) => {
    res.render('signup');
};

exports.user_signup = (req, res) => {
    User.create(req.body).then((result) => {
        res.send(result);
        console.log("signup result", result);
    }).catch((err) => {res.status(500).send("오류 발생")});
}