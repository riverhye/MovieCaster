const express = require('express');
const findpwRouter = express.Router();
const controller = require('../controller/CFindpw');

findpwRouter.get('/', controller.findpw);
findpwRouter.post('/', controller.user_findpw);

module.exports = findpwRouter;
