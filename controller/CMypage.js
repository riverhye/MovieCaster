const { User, Comment, Movie_like, Movie_info, Fav_movie, Comment_like } = require('../model');

//마이페이지 메인 이동
exports.mypage = (req, res) => {
  res.render('mypage/mypage', { root: 'views' });
};

//인생영화 설정 페이지 이동
exports.myfav = (req, res) => {
  res.render('mypage/mypageFav', { root: 'views' });
};

//내 정보 수정,삭제 이동
exports.myinfo = async (req, res) => {
  try {
    const targetUserIdx = 1;
    const user = await User.findAll({
      where: { useridx: targetUserIdx },
    });
    res.render('mypage/mypageInfo', { root: 'views', data: user });
  } catch (error) {
    res.status(500).send('서버 에러');
  }
};

//좋아요 누른 영화 이동
exports.mymovielike = async (req, res) => {
  try {
    const targetUserIdx = 1; // 원하는 사용자의 ID로 수정
    const likedMovies = await Movie_like.findAll({
      where: { useridx: targetUserIdx },
    });

    const movieIndices = likedMovies.map((like) => like.movieidx);

    // Movie_info와의 관계를 활용하여 poster_path를 가져옴
    const userLikedMovies = await Movie_info.findAll({
     
      where: { movieidx: movieIndices },
    });

    res.render('mypage/mypageMovieLike', { root: 'views', data: userLikedMovies });
  } catch (error) {
    res.status(500).send('서버 에러');
  }
};

//좋아요 누른 코멘트 이동
exports.mycommentlike = async (req, res) => {
  try {
    const targetUserIdx = 1; 
    const likedComments = await Comment_like.findAll({
      where: { useridx: targetUserIdx },
    });
    const movieIndices = likedMovies.map((like) => like.movieidx);
    const userLikedComments = await Movie_info.findAll({
      where: { movieidx: movieIndices },
    });

    res.render('mypage/mypageCommentLike', { root: 'views', data: userLikedComments });
  } catch (error) {
    console.error('Error fetching liked comments:', error);
    res.status(500).send('Internal Server Error');
  }
};


//내가 작성한 코멘트 이동
exports.mycomment = async (req, res) => {
  try {
    const targetUserIdx = 1;
    const userComments = await Comment.findAll({
      where: { useridx: targetUserIdx },
    });

    res.render('mypage/mypageComment', { root: 'views', data: userComments });
  } catch (error) {
    res.status(500).send('서버 에러');
  }
};

//내 프로필 수정하기
exports.update_profile = (req, res) => {};

//내 계정 삭제하기(update문으로 작성할 것!)
exports.delete_user = async (req, res) => {
  try {
    const result = await User.update(
      { del_user_ch: 'y' }, // 업데이트할 필드와 값
      { where: { useridx: req.session.userIndex } }
    );
    req.session.destroy(function (err) {
      // 탈퇴한 회원의 session 삭제
      if (err) console.log(err);
    });
    res.status(200).send('회원탈퇴성공!');
  } catch (error) {
    res.status(500).send('서버 에러');
  }
};

//내 인생영화 수정하기
exports.manage_fav_movie = (req, res) => {};

//내가 좋아요 누른 영화 삭제하기 
exports.delete_movie_like = async (req, res) => {
  try {
    const targetUserIdx = 1; // 원하는 사용자의 ID로 수정
    const movieLikeId = req.params.id; // 사용자가 좋아요 누른 영화의 ID

    // 먼저 Movie_like 테이블에서 해당 movieLikeId에 대한 레코드를 삭제합니다.
    await Movie_like.destroy({
      where: {
        movieLikeIdx: movieLikeId,
        useridx: targetUserIdx,
      },
    });

    res.send({ result: true });
  } catch (error) {
    console.error('Error deleting movie like:', error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
};

//내가 좋아요 누른 코멘트 삭제하기
exports.delete_comment_like = async (req, res) => {
  try {
    const targetUserIdx = 1;
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

    if (result === 0) {
      return res.status(404).send({ error: 'Comment not found' });
    }

    res.send({ result: true });
  } catch (error) {
    res.status(500).send({ error: 'Internal Server Error' });
  }
};

//내가 작성한 코멘트 수정하기
exports.update_comment = (req, res) => {};

//내가 작성한 코멘트 삭제하기 /mypage/mycomment/:id
exports.delete_comment = async (req, res) => {
  try {
    const targetUserIdx = 1;
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

    if (result === 0) {
      return res.status(404).send({ error: 'Comment not found' });
    }

    res.send({ result: true });
  } catch (error) {
    console.error('Error deleting comment:', error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
};
