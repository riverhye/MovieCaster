const express = require("express");
const detailRouter = express.Router();
const controller = require("../controller/CDetail");
const { Movie_info, Comment, User } = require("../model");
const { Op } = require("sequelize");

// detailRouter.get('/:movieidx', controller.getMovieInfo);

// '/detail/:movieidx'에 대한 GET 요청 처리
detailRouter.get("/:movieidx", async (req, res) => {
  try {
    const movieIdx = req.params.movieidx;
    console.log("요청한 무비 인덱스: ", movieIdx);

    const movieInfo = await Movie_info.findByPk(movieIdx, {
      attributes: ["title", "overview", "release_date", "poster_path", "genre"],
    });

    // 댓글과 사용자 정보를 가져오는 쿼리
    const comments = await Comment.findAll({
      attributes: ["rate", "description"],
      where: { movieidx: movieIdx },
      include: [
        {
          model: User,
          attributes: ["nickname"],
        },
      ],
    });

    // 비슷한 장르의 영화 3개를 찾는 쿼리
    let similarMovies = [];
    if (movieInfo && movieInfo.genre) {
      const currentMovieGenres = movieInfo.genre.split(",");

      // 각 장르에 대해 비슷한 영화를 찾아서 배열에 추가하는 부분
      for (const genre of currentMovieGenres) {
        const moviesWithGenre = await Movie_info.findAll({
          attributes: ["title", "poster_path", "movieidx"],
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
        (movie, index, self) => index === self.findIndex((m) => m.movieidx === movie.movieidx)
      );
    }

    // movieInfo, comments, similarMovies를 detail.ejs에 전달하여 렌더링
    res.render("detail", {
      movieInfo,
      comments,
      similarMovies,
      useridx: req.session.useridx,
    });
  } catch (error) {
    console.error("Error fetching movie information:", error);
    res.status(500).send("Error fetching movie information");
  }
});

detailRouter.post("/:movieIdx", controller.saveReview);

detailRouter.get("/", controller.detail);

module.exports = detailRouter;
