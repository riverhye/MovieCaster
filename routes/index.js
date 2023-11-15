const express = require("express");
const router = express.Router();
const controller = require("../controller/CMain");

router.get("/", controller.main);

router.post("/", controller.key);
router.get("/header", controller.header);
router.get("/footer", controller.footer);

module.exports = router;
