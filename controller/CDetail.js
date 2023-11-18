const dotenv = require("dotenv");
const path = require("path");
dotenv.config();
dotenv.config({ path: path.join(__dirname, "../config/envs/key.env") });
const key = process.env.API_KEY;
exports.key = (req, res) => {
  res.send(key);
};
const { MovieInfo } = require("../model");
const { User } = require("../model");
const { Comment } = require("../model");
const { error } = require("console");

// const apiMovies = require("../model.getMovies");

exports.detail = (req, res) => {
  res.render("detail");
};
// model/comment에 저장된 리뷰 받기
exports.getReviews = async (req, res) => {
  try {
    // 데이터베이스에서 리뷰 데이터를 조회합니다. 이 부분은 실제로 데이터를 어떻게 조회하는지에 따라 코드가 달라질 수 있습니다.
    const reviews = await Comment.findAll(); // Comment 모델로부터 리뷰 데이터를 가져옵니다.

    // 클라이언트에 리뷰 데이터를 JSON 형식으로 응답합니다.
    res.json(reviews);
    console.log("reviewDataReceived: ", reviews);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Error" });
  }
};
// 작성한 리뷰 저장하기
exports.saveReview = async (req, res) => {
  try {
    const { description, rate } = req.body;

    const tempUserId = 1;
    const tempMovieId = 1;

    // 테스트 코드
    const savedReview = await Comment.create({
      description,
      rate,
      useridx: tempUserId, // 임시로 설정한 사용자 ID
      movieidx: tempMovieId, // 임시로 설정한 영화 ID
    });

    // 사용 코드
    // const savedReview = await Comment.create({
    //   description: description,
    //   rate: rate,
    // });
    res.status(201).json({ message: "Review saved successfully", review: savedReview });
  } catch (error) {
    console.error("Error saving review:", error);
    res.status(500).json({ error: "Failed to save review" });
  }
};
