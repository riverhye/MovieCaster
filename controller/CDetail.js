const { MovieInfo } = require('../model');
const { User } = require('../model');
const { Comment } = require('../model');

exports.detail = (req, res) => {
  res.render('detail');
};

// 한줄평 3개 나열
// 미완. 크롤링 할거면 Comment에서 가져오기x
exports.one_line_comment = (req, res) => {
  Comment.findOne({
    where: {},
  });
};

// 한줄평 작성
// 미완
exports.one_line_comment_new = (req, res) => {
  User.create(req.body).then((user) => {
    res.send({ user });
  });
};

// 영화 상세내용 넣기
// 미완
exports.movie_detail = (req, res) => {
  MovieInfo.findOne({
    where: {
      movieidx: req.body.movieidx,
      title: req.body.title,
      description: req.body.description,
      date: req.body.date,
      pic: req.body.pic1,
      genre: req.body.genre,
    },
    // 이렇게 하는거 맞는지 물어보기
  }).then((result) => {
    let data = movieTitle,
      movieDescription,
      movieDate,
      moviePic,
      movieGenre;
    if (result) {
      movieTitle = result.title;
      movieDescription = result.description;
      movieDate = result.date;
      moviePic = result.pic;
      movieGenre = result.genre;
    }
    res.send(data);
  });
};
