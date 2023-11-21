const { Movie_info, User, Comment } = require("../model");

Comment.belongsTo(User, { foreignKey: "useridx" });

exports.detail = (req, res) => {
  res.render("detail", { movieInfo: null });
};

exports.saveReview = async (req, res) => {
  console.log("aaaaaaaaaaaaaaaa");
  try {
    const { movieIdx } = req.params;
    const { rating, description } = req.body;
    const currentUserIdx = req.session.useridx;

    if (!currentUserIdx) {
      return res.status(401).json({ error: "사용자가 로그인하지 않았습니다." });
    }

    // Comment 모델을 사용하여 데이터베이스에 새로운 리뷰 저장
    const newReview = await Comment.create({
      movieidx: movieIdx,
      rate: rating,
      description: description,
      useridx: currentUserIdx,
    });

    // 클라이언트에 새로운 리뷰 데이터 전송
    res.status(200).json({ newReview });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "컨트롤러에서 저장실패" });
  }
};
