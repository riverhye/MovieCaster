const express = require("express");
const findpwRouter = express.Router();
const controller = require("../controller/CFindpw");

findpwRouter.get("/", controller.findpw);

module.exports = findpwRouter;
