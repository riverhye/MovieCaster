const express = require('express');
const signoutRouter = express.Router();
const controller = require('../controller/CSignin');

signoutRouter.get('/', controller.signout);

module.exports = signoutRouter;
