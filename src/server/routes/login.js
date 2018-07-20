/* eslint-disable */
var express = require('express');
var router = express.Router();
var controller = require('../api/LoginController');

/* GET users listing. */
router.post('/', controller.login);

module.exports = router;
