const express = require("express");
const searchRouter = express.Router();
const controller = require("../controller/CSearch");

searchRouter.get('/', controller.search);

module.exports = searchRouter;