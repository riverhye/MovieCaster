// 환경 변수 설정
const dotenv = require("dotenv")
const path = require("path");
dotenv.config();
dotenv.config({path: path.join(__dirname, '../config/envs/key.env')});

const key = process.env.API_KEY;

exports.key = (req, res) => {
    res.send(key)
}


// main
exports.main = (req, res) => {
    res.render('main');
};



// header, footer
exports.header = (req, res) => {
    res.render('header');
};

exports.footer = (req, res) => {
    res.render('footer');
};
