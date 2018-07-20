/* eslint-disable */
var express = require('express');
var router = express.Router();
var controller = require('../api/RegistController');

/* GET users listing. */
router.post('/', controller.regist);
router.get('/getCaptcha', controller.getCaptcha);
router.post('/getCaptchaSms', controller.getCaptchaSms);

module.exports = router;
