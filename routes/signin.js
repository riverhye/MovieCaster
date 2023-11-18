const express = require('express');
const signinRouter = express.Router();
const controller = require('../controller/CSignin');

signinRouter.get('/', controller.signin);
signinRouter.post('/', controller.user_signin);
signinRouter.get('/check-session', controller.session_check);

module.exports = signinRouter;
