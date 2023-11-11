const express = require("express");
const signinRouter = express.Router();
const controller = require("../controller/CSignin");

signinRouter.get('/', controller.signin);

module.exports = signinRouter;