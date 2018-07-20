/* eslint-disable */
var Model = require('../data/db');
var jwt = require('jsonwebtoken');
var responseData = {
    code: 0,
    message: ''
  }

exports.login = function (req,res) {
    var username = req.body.username;
    var password = req.body.password;
    var crypto = require('crypto') // 加载加密文件
    var md5 = crypto.createHash('md5')
    md5.update(password)
    password = md5.digest('hex')
  
    Model.User.findOne({username: username,password: password}).then(function(userInfo){
      if(!userInfo){
        responseData.code = 1;
        responseData.message = '用户名或密码错误';
        res.json(responseData);
        return;
      }else{
        responseData.code = 200;
        responseData.message ='登录成功';
        var payload = {
          username: username
        };
        var accessToken = jwt.sign(payload, 'secret', {
          expiresIn: Math.floor(Date.now() / 1000) + 24 * 60 * 60 // 一天
        });
        responseData.userInfo = {
          _id: userInfo._id,
          username: userInfo.username,
          isAdmin: userInfo.isAdmin,
          accessToken: accessToken
        }
        res.json(responseData);
        return;
      }
    })
}