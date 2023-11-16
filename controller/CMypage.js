const { User, Comment, Movie_like, Movie_info } = require('../model'); 

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
  try{
    const targetUserIdx = 1;
    const user = await User.findAll({
      where: { useridx: targetUserIdx },
    });
    res.render('mypage/mypageInfo', { root: 'views', data: user });
  } catch(error) {
    res.status(500).send('서버 에러')
  }
};

//좋아요 누른 영화 이동
exports.mymovielike = async (req, res) => {
  try {
    const targetUserIdx = 1;
    const likedMovies = await Movie_like.findAll({
      where: { useridx: targetUserIdx },
    });
    const movieIndices = likedMovies.map((like) => like.movieidx);
    const userLikedMovies = await Movie_info.findAll({ // Update MovieInfo to Movie_info
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
    const likedMovies = await Movie_like.findAll({
      where: { useridx: targetUserIdx },
    });
    const movieIndices = likedMovies.map((like) => like.movieidx);
    const userLikedComments = await Movie_info.findAll({ 
      where: { movieidx: movieIndices },
    });

    res.render('mypage/mypageCommentLike', { root: 'views', data: userLikedComments });
  } catch (error) {
    res.status(500).send('서버 에러');
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

//내 프로필 가져오기
exports.get_profile = (req, res) => {
};

//내 프로필 수정하기
exports.update_profile = (req, res) => {
};

//내 계정 삭제하기(update문으로 작성할 것!)
exports.delete_user = (req, res) => {
};

//내 인생영화 수정하기
exports.manage_fav_movie = (req, res) => {
};

//내가 좋아요 누른 영화 삭제하기 
exports.delete_movie_like= (req, res) => {
};

//내가 좋아요 누른 코멘트 삭제하기
exports.delete_comment_like = (req, res) => {
};

//내가 작성한 코멘트 수정하기
exports.write_rate_comment = (req, res) => {
};

//내가 작성한 코멘트 삭제하기
exports.delete_comment = (req, res) => {
};