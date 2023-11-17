const express = require("express");
const searchRouter = express.Router();
const controller = require("../controller/CSearch");

searchRouter.get('/', controller.search_movie);
searchRouter.get('/result', controller.search_movie_result);

module.exports = searchRouter;