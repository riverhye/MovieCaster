const express = require('express');
const router = express.Router();
const controller = require('../controller/CMain');
const api = require('../controller/CGetMovies');

router.get('/', controller.main);
router.post('/', controller.post_main);

// router.get("/header", controller.header);
// router.get("/footer", controller.footer);

router.get('/saveMovies', api.get_api_movies);

module.exports = router;
