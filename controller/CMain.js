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
    const topRatedMovies = await getTopRatedMovies();

    // section 3: 평균 평점이 2.0~3.5 미만인 영화
    const lowerRatedMovies = await getLowerRatedMovies();

    console.log(lowerRatedMovies);

    res.render('main', { data: { sec1: latestMovies, sec2: topRatedMovies, sec3: lowerRatedMovies }, user: req.session.useridx });
  } catch(err) {
    console.error("section err: ", err);
  }
};

// header, footer
exports.header = (req, res) => {
  res.render('header');
};

exports.footer = (req, res) => {
  res.render('footer');
};

async function getTopRatedMovies() {
  const getMovieInfo = await Comment.findAll({
    attributes: [
      'movieidx',
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
    ],
  });

  const movieIds = getMovieInfo.map((movie) => movie.movieidx);

  const additionalDetails = await Comment.findAll({
    attributes: [
      'movieidx',
      [Sequelize.fn('MAX', Sequelize.col('rate')), 'maxRate'],
      [Sequelize.fn('GROUP_CONCAT', Sequelize.col('commentid')), 'commentIds'],
      [Sequelize.literal('(SELECT GROUP_CONCAT(DISTINCT nickname) FROM User WHERE User.userid = CommentUser.userid GROUP BY CommentUser.userid)'), 'nicknames'],
    ],
    where: {
      movieidx: movieIds,
    },
    include: [
      {
        model: User,
        as: 'CommentUser',
        attributes: ['userid'],
      },
    ],
    group: ['movieidx', 'CommentUser.userid'],
    raw: true,
  });

  const commentIds = additionalDetails.map((detail) => detail.commentIds.split(','));

  const descriptionDetails = await Comment.findAll({
    attributes: ['commentid', 'description'],
    where: {
      commentid: { [Op.in]: commentIds },
    },
    raw: true,
  });

  const topRatedMovies = getMovieInfo.map((movie) => {
    const movieDetails = additionalDetails.filter((detail) => detail.movieidx === movie.movieidx);
    const topDetail = movieDetails.reduce((prev, current) => (prev.maxRate > current.maxRate ? prev : current), {});
    const descriptions = descriptionDetails.filter((desc) => topDetail.commentIds.includes(desc.commentid));
    const description = descriptions.length > 0 ? descriptions[0].description : '';

    return {
      ...movie,
      CommentUser: {
        nickname: topDetail?.nicknames,
      },
      description: description,
    };
  });

  return topRatedMovies;
}

async function getLowerRatedMovies() {
  const lowerRatedMovies = await Comment.findAll({
    attributes: [
      'movieidx',
      [Sequelize.fn('ROUND', Sequelize.fn('AVG', Sequelize.col('rate')), 1), 'averageRate'], // 소수점 1자리까지 반올림
      ],
    group: ['movieidx'],
    having: Sequelize.literal('averageRate < 3.5 AND averageRate >= 2.0'),
    order: [[Sequelize.literal('averageRate'), 'DESC']],
    limit: 10,
    raw: true,
    include: [
      {
        model: Movie_info,
        as: 'CommentMovie',
        attributes: ['title', 'poster_path'],
      },
    ],
  });

  const resultLowerRated = await Promise.all(lowerRatedMovies.map(async (movie) => {
    const additionalDetails = await Comment.findAll({
      attributes: [
        'movieidx',
        [Sequelize.fn('MAX', Sequelize.col('rate')), 'maxRate'],
        [Sequelize.fn('GROUP_CONCAT', Sequelize.col('commentid')), 'commentIds'],
        [Sequelize.literal('(SELECT GROUP_CONCAT(DISTINCT nickname) FROM User WHERE User.userid = CommentUser.userid GROUP BY CommentUser.userid)'), 'nicknames'],
      ],
      where: {
        movieidx: movie.movieidx,
      },
      include: [
        {
          model: User,
          as: 'CommentUser',
          attributes: ['userid'],
        },
      ],
      group: ['movieidx', 'CommentUser.userid'],
      raw: true,
    });

    const commentIds = additionalDetails.map((detail) => detail.commentIds.split(','));

    const descriptionDetails = await Comment.findAll({
      attributes: ['commentid', 'description'],
      where: {
        commentid: { [Op.in]: commentIds },
      },
      raw: true,
    });

    const movieDetails = additionalDetails.filter((detail) => detail.movieidx === movie.movieidx);
    const topDetail = movieDetails.reduce((prev, current) => (prev.maxRate > current.maxRate ? prev : current), {});
    const descriptions = descriptionDetails.filter((desc) => topDetail.commentIds.includes(desc.commentid));
    const description = descriptions.length > 0 ? descriptions[0].description : '';

    return {
      ...movie,
      CommentUser: {
        nickname: topDetail?.nicknames,
      },
      description: description,
    };
  }));

  return resultLowerRated;
}