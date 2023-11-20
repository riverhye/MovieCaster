const { Movie_info, User, Comment, Sequelize } = require('../model');
const { Op } = require('sequelize');

// Main
exports.main = async (req, res) => {
  try {
    // section 1: 최신 영화
    const latestMovies = await Movie_info.findAll({
      where: {
        poster_path: { [Op.not]: 'url 없음' },
      },
      order: [['release_date', 'DESC']],
      limit: 10,
    });

    // section 2: 평점 높은 영화
    const topRatedMovies = await Comment.findAll({
      attributes: [
        'movieidx',
        [Sequelize.fn('ANY_VALUE', Sequelize.col('description')), 'description'],
        [Sequelize.fn('AVG', Sequelize.col('rate')), 'averageRate'],
      ],
      group: ['movieidx'],
      order: [[Sequelize.literal('averageRate'), 'DESC']],
      limit: 10,
      raw: true,
      include: [
        {
          model: Movie_info,
          as: 'CommentMovie',
          attributes: ['title', 'poster_path'],
        },
        {
          model: User,
          as: 'CommentUser',
          attributes: [],
        },
      ],
    });

    // Fetch additional details using the aggregated data
    const movieIds = topRatedMovies.map((movie) => movie.movieidx);
    const additionalDetails = await Comment.findAll({
      where: {
        movieidx: movieIds,
      },
      include: [
        {
          model: User,
          as: 'CommentUser',
          attributes: ['nickname'],
        },
      ],
      raw: true,
    });

    // Merge the additional details with the aggregated data
    const result = topRatedMovies.map((movie) => {
      const details = additionalDetails.find((detail) => detail.movieidx === movie.movieidx);
      return {
        ...movie,
        CommentUser: {
          nickname: details?.['CommentUser.nickname'],
        },
      };
    });

    console.log(result);
    

    res.render('main', { data: { sec1: latestMovies, sec2: topRatedMovies }, user: req.session.useridx });
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
