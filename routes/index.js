const express = require("express");
const router = express.Router();
const controller = require("../controller/CUser");

router.get('/', controller.main);

router.get('/header', controller.header);
router.get('/footer', controller.footer);

module.exports = router;