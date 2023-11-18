// 태그 검색
const Sequelize = require('sequelize');
const { Op } = require('sequelize');

exports.tag_2000 = async (req, res) => {
    try {
        const search2000 = await Movie_info.findAll({
            where: {
                release_date: {
                    [Op.gte]: '2000-01-01',
                    [Op.lt]: '2009-12-31'
                }
            },
            attributes: ['title', 'poster_path'],
            limit: 5
        });
    
        res.json({data: search2000});

    } catch(err) {
        console.error("err: ", err)
    }
}

exports.tag_comedy = async (req, res) => {
    try {
        const searchComedy = await Movie_info.findAll({
            where: {
                genre: {
                    [Op.like]: '%코미디%'
                }
            },
            attributes: ['title', 'poster_path'],
            limit: 5
        });
    
        res.json({data: searchComedy});

    } catch(err) {
        console.error("err: ", err)
    }
}

exports.tag_horror = async (req, res) => {
    try {
        const searchHorror = await Movie_info.findAll({
            where: {
                genre: {
                    [Op.like]: '%공포%'
                }
            },
            attributes: ['title', 'poster_path'],
            limit: 5
        });
    
        res.json({data: searchHorror});

    } catch(err) {
        console.error("err: ", err)
    }
}

let rdDramaMovie;

exports.tag_drama = async (req, res) => {
    try {
        if(!rdDramaMovie) {
            const searchDrama = await Movie_info.findAll({
                order: Sequelize.fn('RAND'),
                where: {
                    overview: {
                        [Op.or]: [
                            { [Op.like]: '%일상%' },
                            { [Op.like]: '%눈부신%' },
                            { [Op.like]: '%행복%' },
                        ]
                    }
                },
                attributes: ['title', 'poster_path'],
                limit: 5
            });

            rdDramaMovie = searchDrama

        }

        res.json({data: rdDramaMovie});

    } catch(err) {
        console.error("err: ", err)
    }
}

exports.tag_thriller = async (req, res) => {
    try {
        const searchThriller = await Movie_info.findAll({
            where: {
                genre: {
                    [Op.or]: {
                        [Op.like]: '%스릴러%',
                        [Op.like]: '%범죄%'
                    }
                }
            },
            attributes: ['title', 'poster_path'],
            limit: 5
        });
    
        res.json({data: searchThriller});

    } catch(err) {
        console.error("err: ", err)
    }
}

// 검색 결과
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
            console.log("search re", result);
            const movieInfo = result.map(movie => ({
                title: movie.title,
                poster: movie.poster_path,
                count: result.length
            }))
            
            res.json({movie: movieInfo, searchInput: req.query.input});
        })

    }
}