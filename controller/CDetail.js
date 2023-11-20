const dotenv = require('dotenv');
const path = require('path');
dotenv.config();
dotenv.config({ path: path.join(__dirname, '../config/envs/key.env') });
const key = process.env.API_KEY;
exports.key = (req, res) => {
  res.send(key);
};
const { MovieInfo, User, Comment } = require('../model');

Comment.belongsTo(User, { foreignKey: 'useridx' });

exports.detail = (req, res) => {
  res.render('detail');
};
// 리뷰 3개 불러오기 선택된 인덱스는 임시이므로 수정해야함!
exports.getReviews = async (req, res) => {
  try {
    const page = req.query.page || 1;

    const maxRowsPerPage = 3;
    const offset = (page - 1) * maxRowsPerPage;
    const limit = maxRowsPerPage;

    const { count, rows: reviews } = await Comment.findAndCountAll({
      where: { movieidx: 1 },
      offset: offset,
      limit: limit,
      include: [
        {
          model: User,
          attributes: ['nickname'],
        },
      ],
    });

    const totalPages = Math.ceil(count / maxRowsPerPage);

    res.render('detail', { reviews, totalPages, currentPage: page });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Error' });
  }
};

// ejs에서 작성한 리뷰를 데이터에 저장하기. idx는 임시이므로 수정해야함!
exports.saveReview = async (req, res) => {
  try {
    const { review, rating } = req.body; // POST 요청으로부터 데이터를 받음

    // Comment 모델을 사용하여 데이터베이스에 새로운 리뷰를 추가
    const savedReview = await Comment.create({
      description: review,
      rate: rating,
      movieidx: 1, // movieidx를 1로 가정
      useridx: 1, // useridx를 1로 가정
      // 외래키값을 설정해서 연결하기!
    });

    res.status(201).json({ message: 'Review saved successfully', review: savedReview });
  } catch (error) {
    console.error('Error saving review:', error);
    res.status(500).json({ error: 'Failed to save review' });
  }
};

exports.getMovieInfo = async (req, res) => {
  try {
    // MovieInfo 테이블에서 movieidx가 1인 데이터 조회
    const movieInfo = await MovieInfo.findOne({ where: { movieidx: 1 } });

    if (!movieInfo) {
      return res.status(404).json({ error: 'Movie not found' });
    }
    res.json(movieInfo);
    // 영화 정보를 EJS 템플릿에 렌더링하기 위해 JSON 형태로 클라이언트에 응답
  } catch (error) {
    console.error('Error fetching movie information:', error);
    res.status(500).json({ error: 'Failed to fetch movie information' });
  }
};
