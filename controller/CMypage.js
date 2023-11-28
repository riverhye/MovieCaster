const {
  User,
  Comment,
  Movie_like,
  Movie_info,
  Fav_movie,
  Comment_like,
} = require("../model");

//마이페이지 메인 이동
exports.mypage = async (req, res) => {
  try {
    const targetUserIdx = req.session.useridx;
    const favMovies = await Fav_movie.findAll({
      where: { useridx: targetUserIdx },
    });

    const movieIndices = favMovies.map((like) => like.movieidx);

    const movies = await Movie_info.findAll({
      where: { movieidx: movieIndices },
    });

    const user = await User.findOne({
      where: { useridx: targetUserIdx },
    });

    res.render("mypage/mypage", {
      root: "views",
      data: movies,
      user: user,
      nickname: req.session.nickname,
      email: req.session.email,
    });
  } catch (error) {
    console.error("Error fetching fav movies:", error);
    res.status(500).send("Internal Server Error");
  }
};

//인생영화 설정 페이지 이동
exports.myfav = (req, res) => {
  res.render("mypage/mypageFav", { root: "views" });
};

//인생영화 검색 기능
exports.search_movie_result = (req, res) => {
  if (!req.query.input) {
    res.json({ data: null });
  } else {
    Movie_info.findAll({
      where: {
        title: { [Op.like]: `%${req.query.input}%` },
      },
    }).then((result) => {
      let movieInfo;

      if (result && result.length > 0) {
        movieInfo = result.map((movie) => ({
          title: movie.title,
          poster: movie.poster_path,
          count: result.length,
        }));
      } else {
        movieInfo = [{ msg: "검색 결과가 없습니다." }];
      }

      res.json({ movie: movieInfo, searchInput: req.query.input });
    });
  }
};

//인생영화 등록하기
exports.addFavMovie = async (req, res) => {
  try {
    const { movieidx } = req.body;
    const result = await Fav_movie.create({
      useridx: req.session.useridx,
      movieidx: movieidx,
    });

    res.json({ success: true, result });
  } catch (error) {
    console.error("Error adding fav movie:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

//내 정보 수정,삭제 이동
exports.myinfo = async (req, res) => {
  try {
    const targetUserIdx = req.session.useridx;
    const user = await User.findOne({
      where: { useridx: targetUserIdx },
    });
    res.render("mypage/mypageInfo", {
      root: "views",
      user: user,
      nickname: req.session.nickname,
      email: req.session.email,
    });
  } catch (error) {
    res.status(500).send("서버 에러");
  }
};

//좋아요 누른 영화 이동
exports.mymovielike = async (req, res) => {
  try {
    const targetUserIdx = req.session.useridx;
    const likedMovies = await Movie_like.findAll({
      where: { useridx: targetUserIdx },
    });

    const movieIndices = likedMovies.map((like) => like.movieidx);
    const userLikedMovies = await Movie_info.findAll({
      where: { movieidx: movieIndices },
    });

    const img = await User.findOne({
      where: { useridx: targetUserIdx },
    });
    res.render("mypage/mypageMovieLike", {
      root: "views",
      data: userLikedMovies,
      nickname: req.session.nickname,
      img: img,
    });
  } catch (error) {
    console.error("Error fetching liked movies:", error);
    res.status(500).send("Internal Server Error");
  }
};

//좋아요 누른 코멘트 이동
exports.mycommentlike = async (req, res) => {
  try {
    const targetUserIdx = req.session.useridx;
    const likedComments = await Comment_like.findAll({
      where: { useridx: targetUserIdx },
    });

    const commentIndices = likedComments.map((like) => like.commentid);

    const userLikedComments = await Comment.findAll({
      where: { commentid: commentIndices },
      include: [
        {
          model: User,
          attributes: ["useridx", "nickname", "email"],
        },
        {
          model: Movie_info,
          attributes: ["title", "poster_path"],
          as: "CommentMovie",
        },
      ],
    });

    const img = await User.findOne({
      where: { useridx: targetUserIdx },
    });

    res.render("mypage/mypageCommentLike", {
      root: "views",
      data: userLikedComments,
      user: req.session.nickname,
      img: img,
    });
  } catch (error) {
    console.error("Error fetching liked comments:", error);
    res.status(500).send("Internal Server Error");
  }
};

//내가 작성한 코멘트 이동
exports.mycomment = async (req, res) => {
  try {
    const targetUserIdx = req.session.useridx;
    const userComments = await Comment.findAll({
      where: { useridx: targetUserIdx },
      include: [
        {
          model: Movie_info,
          attributes: ["poster_path"],
          as: "CommentMovie",
        },
      ],
    });

    const user = await User.findOne({
      where: { useridx: targetUserIdx },
    });

    res.render("mypage/mypageComment", {
      root: "views",
      data: userComments,
      nickname: req.session.nickname,
      user: user,
    });
  } catch (error) {
    res.status(500).send("서버 에러");
  }
};

//내 프로필 수정하기
exports.update_profile = async (req, res) => {
  try {
    await User.update(
      {
        nickname: req.body.usersNickname,
        pw: req.body.usersPw,
        img: req.file.path,
      },
      { where: { useridx: req.session.useridx } }
    );
    const user = await User.findOne({
      where: { useridx: req.session.useridx },
    });
    req.session.nickname = req.body.usersNickname;
    res.status(200).send({ user: user });
  } catch (error) {
    console.log(error);
    res.status(500).send("서버 에러");
  }
};

//내 계정 삭제하기(update문으로 작성할 것!)
exports.delete_user = async (req, res) => {
  try {
    const result = await User.update(
      { del_user_ch: "y" },
      { where: { useridx: req.session.useridx } }
    );
    req.session.destroy(function (err) {
      if (err) console.log(err);
    });
    res.status(200).send("회원탈퇴성공!");
  } catch (error) {
    res.status(500).send("서버 에러");
  }
};

//내가 좋아요 누른 영화 삭제하기
exports.delete_movie_like = async (req, res) => {
  try {
    const targetUserIdx = req.session.useridx;
    const movieLikeIdx = req.params.id;

    console.log("Target User Index:", targetUserIdx);
    console.log("Movie Like Index:", movieLikeIdx);

    await Movie_like.destroy({
      where: {
        movielikeidx: movieLikeIdx,
        useridx: targetUserIdx,
      },
    });

    res.send({ result: true });
  } catch (error) {
    console.error("Error deleting movie like:", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
};

//내가 좋아요 누른 코멘트 삭제하기
exports.delete_comment_like = async (req, res) => {
  try {
    const targetUserIdx = req.session.useridx;
    const commentId = req.params.id;

    await Comment_like.destroy({
      where: {
        commentid: commentId,
      },
    });

    const result = await Comment.destroy({
      where: {
        useridx: targetUserIdx,
        commentid: commentId,
      },
    });

    if (result === 0) {
      return res.status(404).send({ error: "Comment not found" });
    }

    res.send({ result: true });
  } catch (error) {
    res.status(500).send({ error: "Internal Server Error" });
  }
};

//내가 작성한 코멘트 삭제하기 /mypage/mycomment/:id
exports.delete_comment = async (req, res) => {
  try {
    const targetUserIdx = req.session.useridx;
    const commentId = req.params.id;

    await Comment_like.destroy({
      where: {
        commentid: commentId,
      },
    });

    const result = await Comment.destroy({
      where: {
        useridx: targetUserIdx,
        commentid: commentId,
      },
    });

    if (result === 0) {
      return res.status(404).send({ error: "Comment not found" });
    }

    res.send({ result: true });
  } catch (error) {
    console.error("Error deleting comment:", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
};

// 메인에서 전달한 데이터
exports.maintomycommentlike = async (req, res) => {
  try {
    const useridx = req.session.useridx;
    const commentid = req.body.commentid;

    if (!useridx) {
      return res.send({
        result: false,
        error: "로그인 후 이용가능한 기능입니다.",
      });
    }

    const userLikeComment = await Comment_like.findOne({
      where: {
        useridx: useridx,
        commentid: commentid,
      },
    });

    if (userLikeComment) {
      await Comment_like.destroy({
        where: {
          useridx: useridx,
          commentid: commentid,
        },
      });

      res.send({ result: true, likedCommentIds: [] });
    } else {
      await Comment_like.create({
        useridx: useridx,
        commentid: commentid,
      });

      res.send({ result: true, likedCommentIds: [commentid] });
    }
  } catch (error) {
    console.error("Error in handleCommentLike:", error);
    res.status(500).send({ result: false, error: "서버 오류가 발생했습니다." });

    exports.getMyCommentLikeStatus = async (req, res) => {
      const useridx = req.session.useridx;

      if (useridx) {
        try {
          const likedComments = await Comment_like.findAll({
            attributes: ["commentid"],
            where: { useridx },
            raw: true,
          });

          const likedCommentIds = likedComments.map(
            (comment) => comment.commentid
          );
          res.send({ result: true, likedCommentIds });
        } catch (error) {
          console.error("좋아요 상태 가져오기 중 오류:", error);
          res.send({
            result: false,
            error: "좋아요 상태를 가져오는 중 오류가 발생했습니다.",
          });
        }
      } else {
        res.send({ result: false, error: "로그인 후 이용가능한 기능입니다." });
      }
    };
  }
};
