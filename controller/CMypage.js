const { User, Comment, Movie_like, Movie_info, Fav_movie, Comment_like } = require("../model");

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

<<<<<<< HEAD
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
=======
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
>>>>>>> develop
};

//인생영화 설정 페이지 이동
exports.myfav = (req, res) => {
<<<<<<< HEAD
    res.render("mypage/mypageFav", { root: "views" });
=======
  res.render("mypage/mypageFav", { root: "views" });
>>>>>>> develop
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

<<<<<<< HEAD
            if (result && result.length > 0) {
                movieInfo = result.map((movie) => ({
                    title: movie.title,
                    poster: movie.poster_path,
                    count: result.length,
                }));
            } else {
                movieInfo = [{ msg: "검색 결과가 없습니다." }];
            }
=======
      if (result && result.length > 0) {
        movieInfo = result.map((movie) => ({
          title: movie.title,
          poster: movie.poster_path,
          count: result.length,
        }));
      } else {
        movieInfo = [{ msg: "검색 결과가 없습니다." }];
      }
>>>>>>> develop

            res.json({ movie: movieInfo, searchInput: req.query.input });
        });
    }
};

//인생영화 등록하기
exports.addFavMovie = async (req, res) => {
    try {
        // req.body에는 클라이언트에서 전송한 검색한 영화의 정보가 포함되어 있어야 합니다.
        const { movieidx } = req.body;

        // fav_movie 테이블에 등록
        const result = await Fav_movie.create({
            useridx: req.session.useridx,
            movieidx: movieidx,
        });

<<<<<<< HEAD
        res.json({ success: true, result });
    } catch (error) {
        console.error("Error adding fav movie:", error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
=======
    res.json({ success: true, result });
  } catch (error) {
    console.error("Error adding fav movie:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
>>>>>>> develop
};

//내 정보 수정,삭제 이동
exports.myinfo = async (req, res) => {
<<<<<<< HEAD
    try {
        // const targetUserIdx = 1;
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
=======
  try {
    // const targetUserIdx = 1;
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
>>>>>>> develop
};

//좋아요 누른 영화 이동
exports.mymovielike = async (req, res) => {
    try {
        // const targetUserIdx = 1; // 원하는 사용자의 ID로 수정
        const targetUserIdx = req.session.useridx;
        const likedMovies = await Movie_like.findAll({
            where: { useridx: targetUserIdx },
        });

        const movieIndices = likedMovies.map((like) => like.movieidx);

        // Movie_info와의 관계를 활용하여 poster_path를 가져옴
        const userLikedMovies = await Movie_info.findAll({
            where: { movieidx: movieIndices },
        });

<<<<<<< HEAD
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
=======
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
>>>>>>> develop
};

//좋아요 누른 코멘트 이동
exports.mycommentlike = async (req, res) => {
    try {
        const targetUserIdx = req.session.useridx;

        // Comment_like 테이블에서 해당 사용자가 좋아요를 누른 코멘트 목록을 조회합니다.
        const likedComments = await Comment_like.findAll({
            where: { useridx: targetUserIdx },
        });

        // 좋아요를 누른 코멘트들의 commentid를 추출하여 배열을 생성합니다.
        const commentIndices = likedComments.map((like) => like.commentid);

<<<<<<< HEAD
        // Comment 테이블에서 commentIndices에 속하는 코멘트들을 조회하고, 작성자 정보와 영화 정보를 가져옵니다.
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
                    as: "CommentMovie", // 에일리어스 추가
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
=======
    // Comment 테이블에서 commentIndices에 속하는 코멘트들을 조회하고, 작성자 정보와 영화 정보를 가져옵니다.
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
          as: "CommentMovie", // 에일리어스 추가
        },
      ],
    });

    res.render("mypage/mypageCommentLike", {
      root: "views",
      data: userLikedComments,
      user: req.session.nickname,
    });
  } catch (error) {
    console.error("Error fetching liked comments:", error);
    res.status(500).send("Internal Server Error");
  }
>>>>>>> develop
};

//내가 작성한 코멘트 이동
exports.mycomment = async (req, res) => {
<<<<<<< HEAD
    try {
        const targetUserIdx = req.session.useridx;

        // Comment 테이블에서 해당 사용자가 작성한 코멘트 목록을 조회합니다.
        const userComments = await Comment.findAll({
            where: { useridx: targetUserIdx },
            include: [
                {
                    model: Movie_info,
                    attributes: ["poster_path"],
                    as: "CommentMovie", // Comment 모델과 Movie_info 모델 간의 에일리어스 일치
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
=======
  try {
    const targetUserIdx = req.session.useridx;

    // Comment 테이블에서 해당 사용자가 작성한 코멘트 목록을 조회합니다.
    const userComments = await Comment.findAll({
      where: { useridx: targetUserIdx },
      include: [
        {
          model: Movie_info,
          attributes: ["poster_path"],
          as: "CommentMovie", // Comment 모델과 Movie_info 모델 간의 에일리어스 일치
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
>>>>>>> develop
};

//내 프로필 수정하기
exports.update_profile = async (req, res) => {
<<<<<<< HEAD
    try {
        await User.update({ nickname: req.body.usersNickname, pw: req.body.usersPw, img: req.file.path }, { where: { useridx: req.session.useridx } });
        const user = await User.findOne({
            where: { useridx: req.session.useridx },
        });
        req.session.nickname = req.body.usersNickname;
        res.status(200).send({ user: user });
    } catch (error) {
        console.log(error);
        res.status(500).send("서버 에러");
    }
=======
  try {
    await User.update(
      { nickname: req.body.usersNickname, pw: req.body.usersPw, img: req.file.path },
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
>>>>>>> develop
};

//내 계정 삭제하기(update문으로 작성할 것!)
exports.delete_user = async (req, res) => {
<<<<<<< HEAD
    try {
        const result = await User.update(
            { del_user_ch: "y" }, // deleted user check(yes / no)
            { where: { useridx: req.session.useridx } }
        );
        req.session.destroy(function (err) {
            // 탈퇴한 회원의 session 삭제
            if (err) console.log(err);
        });
        res.status(200).send("회원탈퇴성공!");
    } catch (error) {
        res.status(500).send("서버 에러");
    }
=======
  try {
    const result = await User.update(
      { del_user_ch: "y" }, // deleted user check(yes / no)
      { where: { useridx: req.session.useridx } }
    );
    req.session.destroy(function (err) {
      // 탈퇴한 회원의 session 삭제
      if (err) console.log(err);
    });
    res.status(200).send("회원탈퇴성공!");
  } catch (error) {
    res.status(500).send("서버 에러");
  }
>>>>>>> develop
};

//내가 좋아요 누른 영화 삭제하기
exports.delete_movie_like = async (req, res) => {
<<<<<<< HEAD
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
=======
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
>>>>>>> develop
};

//내가 좋아요 누른 코멘트 삭제하기
exports.delete_comment_like = async (req, res) => {
    try {
        const targetUserIdx = req.session.useridx;
        const commentId = req.params.id;

        // 먼저 Comment_like 테이블에서 해당 commentId에 대한 레코드를 삭제합니다.
        await Comment_like.destroy({
            where: {
                commentid: commentId,
            },
        });

        // 그 후 Comment 테이블에서 해당 commentId에 대한 레코드를 삭제합니다.
        const result = await Comment.destroy({
            where: {
                useridx: targetUserIdx,
                commentid: commentId,
            },
        });

<<<<<<< HEAD
        if (result === 0) {
            return res.status(404).send({ error: "Comment not found" });
        }

        // 바로 삭제가 반영되도록 클라이언트에게 응답을 보냅니다.
        res.send({ result: true });
    } catch (error) {
        res.status(500).send({ error: "Internal Server Error" });
    }
=======
    if (result === 0) {
      return res.status(404).send({ error: "Comment not found" });
    }

    // 바로 삭제가 반영되도록 클라이언트에게 응답을 보냅니다.
    res.send({ result: true });
  } catch (error) {
    res.status(500).send({ error: "Internal Server Error" });
  }
>>>>>>> develop
};

//내가 작성한 코멘트 삭제하기 /mypage/mycomment/:id
exports.delete_comment = async (req, res) => {
    try {
        // const targetUserIdx = 1;
        const targetUserIdx = req.session.useridx;
        const commentId = req.params.id;

        // 먼저 Comment_like 테이블에서 해당 commentId에 대한 레코드를 삭제합니다.
        await Comment_like.destroy({
            where: {
                commentid: commentId,
            },
        });

        // 그 후 Comment 테이블에서 해당 commentId에 대한 레코드를 삭제합니다.
        const result = await Comment.destroy({
            where: {
                useridx: targetUserIdx,
                commentid: commentId,
            },
        });

<<<<<<< HEAD
        if (result === 0) {
            return res.status(404).send({ error: "Comment not found" });
        }

        res.send({ result: true });
    } catch (error) {
        console.error("Error deleting comment:", error);
        res.status(500).send({ error: "Internal Server Error" });
    }
=======
    if (result === 0) {
      return res.status(404).send({ error: "Comment not found" });
    }

    res.send({ result: true });
  } catch (error) {
    console.error("Error deleting comment:", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
>>>>>>> develop
};

// 메인에서 전달한 데이터
exports.maintomycommentlike = async (req, res) => {
<<<<<<< HEAD
    try {
        const useridx = req.session.useridx;
        const commentid = req.body.commentid;

        if (!useridx) {
            return res.send({ result: false, error: "로그인 후 이용가능한 기능입니다." });
        }

        // 해당 유저와 코멘트에 대한 레코드 조회
        const userLikeComment = await Comment_like.findOne({
            where: {
                useridx: useridx,
                commentid: commentid,
            },
        });

        if (userLikeComment) {
            // 이미 좋아요를 누른 상태인 경우, 레코드 삭제
            await Comment_like.destroy({
                where: {
                    useridx: useridx,
                    commentid: commentid,
                },
            });

            res.send({ result: true, likedCommentIds: [] });
        } else {
            // 좋아요를 누르지 않은 상태인 경우, 레코드 추가
            await Comment_like.create({
                useridx: useridx,
                commentid: commentid,
            });

            res.send({ result: true, likedCommentIds: [commentid] });
        }
    } catch (error) {
        console.error("Error in handleCommentLike:", error);
        res.status(500).send({ result: false, error: "서버 오류가 발생했습니다." });

        // 서버 컨트롤러
        exports.getMyCommentLikeStatus = async (req, res) => {
            const useridx = req.session.useridx;

            if (useridx) {
                try {
                    const likedComments = await Comment_like.findAll({
                        attributes: ["commentid"],
                        where: { useridx },
                        raw: true,
                    });

                    const likedCommentIds = likedComments.map((comment) => comment.commentid);
                    res.send({ result: true, likedCommentIds });
                } catch (error) {
                    console.error("좋아요 상태 가져오기 중 오류:", error);
                    res.send({ result: false, error: "좋아요 상태를 가져오는 중 오류가 발생했습니다." });
                }
            } else {
                res.send({ result: false, error: "로그인 후 이용가능한 기능입니다." });
            }
        };
    }
=======
  try {
    const useridx = req.session.useridx;
    const commentid = req.body.commentid;

    if (!useridx) {
      return res.send({ result: false, error: "로그인 후 이용가능한 기능입니다." });
    }

    // 해당 유저와 코멘트에 대한 레코드 조회
    const userLikeComment = await Comment_like.findOne({
      where: {
        useridx: useridx,
        commentid: commentid,
      },
    });

    if (userLikeComment) {
      // 이미 좋아요를 누른 상태인 경우, 레코드 삭제
      await Comment_like.destroy({
        where: {
          useridx: useridx,
          commentid: commentid,
        },
      });

      res.send({ result: true, likedCommentIds: [] });
    } else {
      // 좋아요를 누르지 않은 상태인 경우, 레코드 추가
      await Comment_like.create({
        useridx: useridx,
        commentid: commentid,
      });

      res.send({ result: true, likedCommentIds: [commentid] });
    }
  } catch (error) {
    console.error("Error in handleCommentLike:", error);
    res.status(500).send({ result: false, error: "서버 오류가 발생했습니다." });

    // 서버 컨트롤러
    exports.getMyCommentLikeStatus = async (req, res) => {
      const useridx = req.session.useridx;

      if (useridx) {
        try {
          const likedComments = await Comment_like.findAll({
            attributes: ["commentid"],
            where: { useridx },
            raw: true,
          });

          const likedCommentIds = likedComments.map((comment) => comment.commentid);
          res.send({ result: true, likedCommentIds });
        } catch (error) {
          console.error("좋아요 상태 가져오기 중 오류:", error);
          res.send({ result: false, error: "좋아요 상태를 가져오는 중 오류가 발생했습니다." });
        }
      } else {
        res.send({ result: false, error: "로그인 후 이용가능한 기능입니다." });
      }
    };
  }
>>>>>>> develop
};
