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

// try : 장르명 api 따로 받아서 해볼까 하고..
// {
//     // const axios = require('axios');
//     // async function apiMovies () {
//     //     for (let i=1; i<200; i++) {
//     //         const movieResults = [];
//     //         const url = `https://api.themoviedb.org/3/movie/upcoming?api_key=${key}&language=ko-KR&page=${i}`;
//     //         const genreResults = [];
//     //         const genreUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${key}&language=ko-KR`
//     //         try {
//     //             const response = await axios.get(url);
//     //             movieResults.push(...response.data.results);
//     //             const genreResponse = await axios.get(genreUrl);
//     //             genreResults.push(...genreResponse.data.genres);
//     //         } catch (err) {
//     //             throw err;
//     //         };
//     //     }
        
//     //     return movieResults, genreResults
//     // };
// }

// upcoming : `https://api.themoviedb.org/3/movie/upcoming?api_key=${key}&language=ko-KR&page=${i}`
// top rated : `https://api.themoviedb.org/3/movie/top_rated?api_key=${key}&language=ko-KR&page=${i}`
// popular : `https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=ko-KR&page=${i}`
// nowplaying : `https://api.themoviedb.org/3/movie/now_playing?api_key=${key}&language=ko-KR&page=${i}`

module.exports = apiMovies;