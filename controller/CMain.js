// 환경 변수 설정
const dotenv = require("dotenv")
const path = require("path");
dotenv.config();
dotenv.config({path: path.join(__dirname, '../config/envs/key.env')});

const key = process.env.API_KEY;
const krKey = process.env.KR_API_KEY;

exports.key = (req, res) => {
    res.send({key, krKey})
}

// api DB 저장
const {Movie_info} = require('../model');
const apiMovies = require('../model/getMovies');
exports.get_api_movies = async (req, res) => {
    try {
        const movies = await apiMovies();
        for (const movieData of movies) {
            const existingMovie = await Movie_info.findOne({
                where: {
                    title: movieData.title
                }
            });
            if (!existingMovie) {
                await Movie_info.create({
                    title: movieData.title,
                    overview: movieData.overview,
                    release_date: movieData.release_date,
                    poster_path: movieData.poster_path
                })
            }
            }
        console.log('movie get!');
        res.json({msg: 'movie get'})
    } catch (err) {
        console.error('ERR :', err);
    }
}


// try : 장르명 api 따로 받아서 해볼까 하고..
// exports.getMovies = async (req, res) => {
//     try {
//         const {movieResults, genreResults} = await apiMovies();
//         for (const movieData of movieResults) {
//             const existingMovie = await Movie_info.findOne({
//                 where: {
//                     title: movieData.title
//                 }
//             });

//             if (!existingMovie) {
//                 const genreIds = movieData.genre_ids || []; // 장르 num
//                 const genres = []; // 장르명
//                 for (const genreId of genreIds) {
//                     const genre = genreResults.find((g) => g.id === genreId);
//                     genres.push(genre ? genre.name : '정보 없음');
//                 }

//                 await Movie_info.create({
//                     title: movieData.title,
//                     overview: movieData.overview,
//                     release_date: movieData.release_date,
//                     poster_path: movieData.poster_path,
//                     genre_ids: genreIds.join(', '),
//                     genres: genres.join(', ')
//                 });
//             }
//         }
//         res.send('movie get')
//     } catch (error) {
//         console.log('err!');
//     }
// }

// main
exports.main = (req, res) => {
    res.render('main');
};

// header, footer
exports.header = (req, res) => {
    res.render('header');
};

exports.footer = (req, res) => {
    res.render('footer');
};
