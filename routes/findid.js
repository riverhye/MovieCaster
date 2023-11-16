const express = require('express');
const findidRouter = express.Router();
const controller = require('../controller/CFindid');

findidRouter.get('/', controller.findid);
findidRouter.post('/', controller.user_findid);

module.exports = findidRouter;
