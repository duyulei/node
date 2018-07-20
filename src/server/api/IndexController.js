/* eslint-disable */
var app = require('express')()
var server = require('http').createServer(app)
var io = require('socket.io')(server)
var responseData = {
    code: 0,
    message: ''
  }

exports.socket = function (req,res) {
    console.log(app.get('io'))
    res.json(responseData);
		return;
}