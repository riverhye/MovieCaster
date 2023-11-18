const dotenv = require("dotenv")
const path = require("path");
dotenv.config();
dotenv.config({path: path.join(__dirname, '../config/envs/key.env')});

const key = process.env.API_KEY;

const axios = require('axios');
async function apiMovies () {
    const movieResults = [];
    const genreResults = [];

    const genreUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${key}&language=ko-KR`
    const genreResponse = await axios.get(genreUrl);
    genreResults.push(...genreResponse.data.genres);

    for (let i=1; i<300; i++) {
        const urlHead = `https://api.themoviedb.org/3/movie`
        // url 종류 : top_rated / popular / now_playing
        const url = `${urlHead}/upcoming?api_key=${key}&language=ko-KR&page=${i}`;

        try {
            const response = await axios.get(url);
            movieResults.push(...response.data.results);
        } catch (err) {
            throw err;
        };
    }
    
    return {movieResults, genreResults}
};

module.exports = apiMovies;