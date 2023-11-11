const express = require("express");
const findidRouter = express.Router();
const controller = require("../controller/CFindid");

findidRouter.get("/", controller.findid);

module.exports = findidRouter;
