// main
const { Movie_info, User, Comment } = require('../model');
const { Op } = require('sequelize');

exports.main = async (req, res) => {
  try {
    // section 1 : 최신 영화
    const latestMovies = await Movie_info.findAll({
      where: {
        poster_path: { [Op.not]: 'url 없음' },
      },
      order: [['release_date', 'DESC']],
      limit: 10,
    });

    // section 2 : 평점 높은 영화
    // const topRatedMovies = await Comment.findAll({
    //   order: [['rate', 'DESC']],
    //   limit: 10,
    //   include: [
    //     {
    //       model: Movie_info,
    //       as: 'CommentMovie',
    //       attributes: ['title'],
    //     },
    //     {
    //       model: User,
    //       as: 'CommentUser',
    //       attributes: ['nickname'],
    //     },
    //   ],
    // });

    res.render('main', { data: { sec1: latestMovies } });
  } catch (err) {
    console.error('section err: ', err);
  }
};

// header, footer
exports.header = (req, res) => {
  res.render('header');
};

exports.footer = (req, res) => {
  res.render('footer');
};
