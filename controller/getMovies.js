const dotenv = require("dotenv")
const path = require("path");
dotenv.config();
dotenv.config({path: path.join(__dirname, '../config/envs/key.env')});

const key = process.env.API_KEY;

const axios = require('axios');
const results = [];
async function apiMovies () {
    for (let i=1; i<200; i++) {
        const url = `https://api.themoviedb.org/3/movie/upcoming?api_key=${key}&language=ko-KR&page=${i}`;
        try {
            const response = await axios.get(url);
            results.push(...response.data.results);
        } catch (err) {
            console.error(err.message);
            throw err;
        };
    }

    return results
};

// upcoming : `https://api.themoviedb.org/3/movie/upcoming?api_key=${key}&language=ko-KR&page=${i}`
// top rated : `https://api.themoviedb.org/3/movie/top_rated?api_key=${key}&language=ko-KR&page=${i}`
// popular : `https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=ko-KR&page=${i}`
// nowplaying : `https://api.themoviedb.org/3/movie/now_playing?api_key=${key}&language=ko-KR&page=${i}`

module.exports = apiMovies;