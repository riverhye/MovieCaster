// 환경 변수 설정
const dotenv = require('dotenv');
const path = require('path');
dotenv.config();
dotenv.config({ path: path.join(__dirname, '../config/envs/key.env') });

const key = process.env.API_KEY;

exports.key = (req, res) => {
  res.send(key);
};

// main
exports.main = async (req, res) => {
  // upcoming(box office)
  try {
    const boxOfficeList = await Movie_info.findAll({
      order: [['release_date', 'DESC']],
      attributes: ['poster_path'],
      limit: 10,
    });

    res.render('main', { movie: boxOfficeList });
  } catch (err) {
    console.error('main err: ', err);
    res.render('main', { movie: null });
  }
};

// header, footer
exports.header = (req, res) => {
  res.render('header');
};

exports.footer = (req, res) => {
  res.render('footer');
};
