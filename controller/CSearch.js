const {Movie_info} = require('../model')

exports.search_movie = (req, res) => {
    res.render('search', {data: null});
};

exports.search_movie_result = (req, res) => {
    if (!req.query.input) {
        res.json({data: null});
    } else {
        Movie_info.findAll({
            where: {
                title: req.query.input
            }
        }).then((result) => {
            // null값이면 예외처리
            const movieInfo = result.map(movie => ({
                title: movie.title,
                poster: movie.poster_path,
                count: result.length
            }))
            
            res.json({movie: movieInfo, searchInput: req.query.input});
        })

    }
}