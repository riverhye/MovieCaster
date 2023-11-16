const express = require("express");
const detailRouter = express.Router();
const controller = require("../controller/CDetail");

detailRouter.get("/", controller.detail);
detailRouter.get("/", controller.comment);
detailRouter.post("/", controller.comment);
detailRouter.post("/", controller.movie_detail);

module.exports = detailRouter;
