const express = require("express");
const mypageRouter = express.Router();
const controller = require("../controller/CMypage");

mypageRouter.get('/', controller.mypage);

module.exports = mypageRouter