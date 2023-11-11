exports.main = (req, res) => {
    res.render('main');
};

// UI 확인용으로 임시 렌더할 거라 따로 컨트롤러 작성 안 했습니다.
exports.header = (req, res) => {
    res.render('header');
};

exports.footer = (req, res) => {
    res.render('footer');
};