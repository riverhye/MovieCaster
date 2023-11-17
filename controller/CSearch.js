const {Movie_info} = require('../model')

exports.search_movie = (req, res) => {
    res.render('search', {data: null});
};

exports.search_movie_result = (req, res) => {
    console.log(req.query.input)
    // if (!req.query.input) {
    //     res.render('search', {data: null});
    // } else {
        // Movie_info.findOne({
        //     where: {
        //         title: req.query.input
        //     }
        // }).then((movie) => {
        //     // null값이면 예외처리
        //     const data = {
        //         title: movie.title,
        //         poster: movie.poster_path,
        //         count: movie.count
        //     }
        //     res.render('search', {data: data});
        // })

    // }
}