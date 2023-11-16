// 환경 변수 설정
const dotenv = require("dotenv")
const path = require("path");
dotenv.config();
dotenv.config({path: path.join(__dirname, '../config/envs/key.env')});

const key = process.env.API_KEY;

exports.key = (req, res) => {
    res.send(key)
}

// api DB 저장
const {Movie_info} = require('../model');
const apiMovies = require('./getMovies');
exports.getMovies = async (req, res) => {
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
    } catch (error) {
        console.log('err!');
    }
}

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
