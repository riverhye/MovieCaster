const express = require('express');
const detailRouter = express.Router();
const controller = require('../controller/CDetail');
const { Movie_info, Comment, User, Op } = require('../model');

// detailRouter.get('/:movieidx', controller.getMovieInfo);

// '/detail/:movieidx'에 대한 GET 요청 처리
detailRouter.get('/:movieidx', async (req, res) => {
  try {
    const movieIdx = req.params.movieidx;
    console.log('요청한 무비 인덱스: ', movieIdx);

    const movieInfo = await Movie_info.findByPk(movieIdx, {
      attributes: ['title', 'overview', 'release_date', 'poster_path', 'genre'],
    });

    // 댓글과 사용자 정보를 가져오는 쿼리
    const comments = await Comment.findAll({
      attributes: ['rate', 'description'],
      where: { movieidx: movieIdx },
      include: [
        {
          model: User,
          attributes: ['nickname'],
        },
      ],
    });

    // 비슷한 장르의 영화 3개를 찾는 쿼리
    let similarMovies = [];
    if (movieInfo && movieInfo.genre) {
      similarMovies = await Movie_info.findAll({
        attributes: ['title', 'poster_path'],
        where: {
          genre: movieInfo.genre,
          movieidx: { $not: movieIdx }, // 현재 영화와 같은 영화는 제외. field에 포함된 장르가 모두 일치해야해서 하나도 못불러오는건가?? 내일 해보기.
        },
        limit: 3,
      });
    }

    // movieInfo, comments, similarMovies를 detail.ejs에 전달하여 렌더링
    res.render('detail', { movieInfo, comments, similarMovies });
  } catch (error) {
    console.error('Error fetching movie information:', error);
    res.status(500).send('Error fetching movie information');
  }
});

detailRouter.post('/:movieIdx', controller.saveReview);

detailRouter.get('/', controller.detail);

module.exports = detailRouter;
