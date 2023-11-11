const express = require("express");
const signupRouter = express.Router();
const controller = require("../controller/CSingup");

signupRouter.get('/', controller.signup);

module.exports = signupRouter;