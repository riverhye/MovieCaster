const express = require('express');
const router = express.Router();
const controller = require('../controller/CUser');

router.get('/main', controller.main);
router.get('/mypage', controller.mypage);
router.get('/detail', controller.detail);
router.get('/search', controller.search);
router.get('/signin', controller.signin);
router.get('/signup', controller.signup);
router.get('/header', controller.header);
router.get('/footer', controller.footer);
