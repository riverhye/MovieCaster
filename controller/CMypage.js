exports.mypage = (req, res) => {
    res.render('mypage/mypage', { root: 'views' });
};

exports.myfav = (req, res) => {
    res.render('mypage/mypageFav', { root: 'views' });
};

exports.myinfo = (req, res) => {
    res.render('mypage/mypageInfo', { root: 'views' });
};

exports.mymovielike = (req, res) => {
    res.render('mypage/mypageMovieLike', { root: 'views' });
};

exports.mycommentlike = (req, res) => {
    res.render('mypage/mypageCommentLike', { root: 'views' });
};

exports.mycomment = (req, res) => {
    res.render('mypage/mypageComment', { root: 'views' });
};


