const express = require('express');
const detailRouter = express.Router();
const controller = require('../controller/CDetail');
const {
  Movie_info,
  Comment,
  User,
  Movie_like,
  Comment_like,
} = require('../model');
const { Op } = require('sequelize');

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
      attributes: ['rate', 'description', 'commentid'],
      where: { movieidx: movieIdx },
      include: [
        {
          model: User,
          attributes: ['nickname'],
        },
      ],
    });
    console.log('comments info: ', comments);

    // 비슷한 장르의 영화 3개를 찾는 쿼리
    let similarMovies = [];
    if (movieInfo && movieInfo.genre) {
      const currentMovieGenres = movieInfo.genre.split(',');

      // 각 장르에 대해 비슷한 영화를 찾아서 배열에 추가하는 부분
      for (const genre of currentMovieGenres) {
        const moviesWithGenre = await Movie_info.findAll({
          attributes: ['title', 'poster_path', 'movieidx'],
          where: {
            genre: {
              [Op.like]: `%${genre}%`, // 해당 장르를 포함하는 영화 검색
            },
            movieidx: { [Op.not]: movieIdx },
          },
          limit: 3,
        });

        similarMovies = similarMovies.concat(moviesWithGenre);
      }

      // 중복된 영화 제거
      similarMovies = similarMovies.filter(
        (movie, index, self) =>
          index === self.findIndex((m) => m.movieidx === movie.movieidx)
      );
    }

    const isLoggedIn = !!req.session.useridx;

    // movieInfo, comments, similarMovies를 detail.ejs에 전달하여 렌더링
    res.render('detail', {
      movieInfo,
      comments,
      similarMovies,
      isLoggedIn,
      useridx: req.session.useridx,
    });
  } catch (error) {
    console.error('Error fetching movie information:', error);
    res.status(500).send('Error fetching movie information');
  }
});
detailRouter.post('/:movieIdx/movieLike', async (req, res) => {
  try {
    const { movieIdx, useridx } = req.body;

    // 사용자가 이미 해당 영화를 좋아요 했는지 확인
    const existingLike = await Movie_like.findOne({
      where: {
        useridx: useridx,
        movieidx: movieIdx,
      },
    });

    if (existingLike) {
      // 만약 좋아요가 이미 있다면 기존 데이터 삭제
      await Movie_like.destroy({
        where: {
          useridx: useridx,
          movieidx: movieIdx,
        },
      });

      // 기존 좋아요 삭제 확인 로그
      console.log('이미 좋아요를 눌렀습니다. 기존 데이터를 삭제했습니다.');
      res.status(200).json({
        message: '이미 좋아요를 눌렀습니다. 기존 데이터를 삭제했습니다.',
      });
    } else {
      // 좋아요가 없다면 새로운 데이터 추가
      await Movie_like.create({
        useridx: useridx,
        movieidx: movieIdx,
      });

      // 새로운 좋아요 추가 확인 로그
      console.log('새로운 좋아요를 추가했습니다.');
      res.status(200).json({ message: '새로운 좋아요를 추가했습니다.' });
    }
  } catch (error) {
    console.error('데이터 처리 중 오류:', error);
    res.status(500).json({ message: '데이터 처리 중 오류 발생' });
  }
});

detailRouter.post('/:movieIdx', controller.saveReview);

detailRouter.get('/', controller.detail);

module.exports = detailRouter;
