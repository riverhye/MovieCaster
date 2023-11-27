const { Movie_info, User, Comment, Comment_like, Sequelize } = require('../model');
const { Op } = require('sequelize');

let useridx;
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

    useridx = req.session.useridx;

    // section 2: 평점 높은 영화
    const topRatedMovies = await getTopRatedMovies();
    // section 3: 평균 평점이 2.0~3.5 미만인 영화
    const lowerRatedMovies = await getLowerRatedMovies();

    res.render('main', { data: { sec1: latestMovies, sec2: topRatedMovies, sec3: lowerRatedMovies } });
  } catch (err) {
    console.error('section err: ', err);
  }
};

// header, footer
exports.header = (req, res) => {
  res.send('header', { user: req.session.isAuthenticated });
};

exports.footer = (req, res) => {
  res.render('footer');
};

async function getTopRatedMovies() {
  const getMovieInfo = await Comment.findAll({
    attributes: [
      'movieidx',
      [Sequelize.fn('AVG', Sequelize.col('rate')), 'averageRate'],
      [Sequelize.fn('MAX', Sequelize.col('timestamp')), 'timestamp'],
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
        attributes: [
          [Sequelize.fn('MAX', Sequelize.col('nickname')), 'nickname']
        ],
      },
    ],
  });

  const movieIds = getMovieInfo.map((movie) => movie.movieidx);

  const additionalDetails = await Comment.findAll({
    attributes: [
      'movieidx',
      [Sequelize.fn('MAX', Sequelize.col('rate')), 'maxRate'],
      [Sequelize.fn('GROUP_CONCAT', Sequelize.col('commentid')), 'commentIds'],
      [
        Sequelize.literal(
          '(SELECT GROUP_CONCAT(DISTINCT nickname) FROM User WHERE User.userid = CommentUser.userid GROUP BY CommentUser.userid)'
        ),
        'nicknames',
      ],
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

  const tRatedMovies = getMovieInfo.map(async (movie) => {
    const movieDetails = additionalDetails.filter((detail) => detail.movieidx === movie.movieidx);
    const topDetail = movieDetails.reduce(
      (prev, current) => (prev.maxRate > current.maxRate ? prev : current),
      {}
    );
    const descriptions = descriptionDetails.filter((desc) => topDetail.commentIds.includes(desc.commentid));
    const description = descriptions.length > 0 ? descriptions[0].description : '';
    
    const commentids = descriptionDetails.filter((desc) => topDetail.commentIds.includes(desc.commentid));
    const commentid = commentids.length > 0 ? commentids[0].commentid : '';


    return {
      ...movie,
      CommentUser: {
        nickname: topDetail?.nicknames,
      },
      description: description,
      commentid: commentid,
    };
  });

  const topRatedMovies = await Promise.all(tRatedMovies);

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

  const resultLowerRated = await Promise.all(
    lowerRatedMovies.map(async (movie) => {
      const additionalDetails = await Comment.findAll({
        attributes: [
          'movieidx',
          [Sequelize.fn('MAX', Sequelize.col('rate')), 'maxRate'],
          [Sequelize.fn('GROUP_CONCAT', Sequelize.col('commentid')), 'commentIds'],
          [
            Sequelize.literal(
              '(SELECT GROUP_CONCAT(DISTINCT nickname) FROM User WHERE User.userid = CommentUser.userid GROUP BY CommentUser.userid)'
            ),
            'nicknames',
          ],
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
      const topDetail = movieDetails.reduce(
        (prev, current) => (prev.maxRate > current.maxRate ? prev : current),
        {}
      );
      const descriptions = descriptionDetails.filter((desc) => topDetail.commentIds.includes(desc.commentid));
      const description = descriptions.length > 0 ? descriptions[0].description : '';

      return {
        ...movie,
        CommentUser: {
          nickname: topDetail?.nicknames,
        },
        description: description,
      };
    })
  );

  return resultLowerRated;
}
