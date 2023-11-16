const { MovieInfo } = require("../model");
const { User } = require("../model");
const { Comment } = require("../model");

exports.detail = (req, res) => {
  res.render("detail");
};

exports.comment = (req, res) => {
  Comment.findOne({
    where: {
      movieidx: req.body.movieidx,
      useridx: req.body.useridx,
      rate: req.body.rate,
      description: req.body.description,
    },
  }).then((result) => {});
};

exports.comment = (req, res) => {
  Comment.create(req.body).then((user) => {
    res.send({ user });
  });
};

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
