const express = require('express');
const searchRouter = express.Router();
const controller = require('../controller/CSearch');

searchRouter.get('/', controller.search_movie);

searchRouter.get('/result', controller.search_movie_result);

searchRouter.get('/tag2000', controller.tag_2000);
searchRouter.get('/tagcomedy', controller.tag_comedy);
searchRouter.get('/taghorror', controller.tag_horror);
searchRouter.get('/tagdrama', controller.tag_drama);
searchRouter.get('/tagthriller', controller.tag_thriller);

module.exports = searchRouter;
