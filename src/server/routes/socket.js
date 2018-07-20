/* eslint-disable */
var express = require('express');
var router = express.Router();
var controller = require('../api/IndexController');

/* GET users listing. */
router.post('/', controller.socket);

module.exports = router;
