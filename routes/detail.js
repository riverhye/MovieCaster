const express = require("express");
const detailRouter = express.Router();
const controller = require("../controller/CDetail");

detailRouter.get('/', controller.detail);

module.exports = detailRouter;