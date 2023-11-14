const express = require("express");
const signupRouter_db = express.Router()
const controller = require("../controller/CSingup");


signupRouter_db.post('/', controller.user_signup)
module.exports = signupRouter_db