const { MovieInfo, User, Comment } = require('../model');

Comment.belongsTo(User, { foreignKey: 'useridx' });

exports.detail = (req, res) => {
  res.render('detail');
};
exports.getReviews = async (req, res) => {
  try {
    const { movieidx } = req.query; // 클라이언트에서 전달한 영화 인덱스 값

    const page = req.query.page || 1;
    const maxRowsPerPage = 3;
    const offset = (page - 1) * maxRowsPerPage;
    const limit = maxRowsPerPage;

    const { count, rows: reviews } = await Comment.findAndCountAll({
      where: { movieidx }, // 클라이언트에서 전달된 영화 인덱스를 사용
      offset,
      limit,
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

// ejs에서 작성한 리뷰를 데이터에 저장하기
exports.saveReview = async (req, res) => {
  try {
    const { review, rating } = req.body; // POST 요청으로부터 데이터를 받음
    const { movieidx } = req.query; // 클라이언트에서 전달된 영화 인덱스

    // 세션에서 useridx 가져오기
    const useridx = req.session.useridx;

    // Comment 모델을 사용하여 데이터베이스에 새로운 리뷰를 추가
    const savedReview = await Comment.create({
      description: review,
      rate: rating,
      movieidx, // 클라이언트에서 전달된 영화 인덱스 사용
      useridx, // 세션에서 가져온 사용자 인덱스 사용
    });

    res.status(201).json({ message: 'Review saved successfully', review: savedReview });
  } catch (error) {
    console.error('Error saving review:', error);
    res.status(500).json({ error: 'Failed to save review' });
  }
};

exports.getMovieInfo = async (req, res) => {
  try {
    const { movieidx } = req.query; // 클라이언트에서 전달한 영화 인덱스 값

    // MovieInfo 테이블에서 클라이언트에서 전달된 영화 인덱스로 데이터 조회
    const movieInfo = await MovieInfo.findOne({ where: { movieidx } });

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
