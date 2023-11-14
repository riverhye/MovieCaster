const express = require("express");
const signupRouter = express.Router();
const controller = require("../controller/CSingup");

signupRouter.get('/', controller.signup);
signupRouter.post('/', controller.user_signup);

module.exports = signupRouter;