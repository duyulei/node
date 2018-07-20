/* eslint-disable */
var Model = require('../data/db');
var svgCaptcha = require('svg-captcha');
var captchapng = require('captchapng');
var responseData = {
    code: 0,
    message: ''
  }
var date = new Date(),
  yy = date.getFullYear(),
  MM = date.getMonth() + 1,
  dd = date.getDate(),
  hh = date.getHours(),
  mm = date.getMinutes(),
  ss = date.getSeconds();

exports.regist = function (req,res) {
	var crypto = require('crypto') // 加载加密文件
	var md5 = crypto.createHash('md5')
	var username = req.body.username;
	var password = req.body.password;
	var password2 = req.body.password2;
	var codeSms = req.body.codeSms;
	if(!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(username))){
		responseData.code = 4;
		responseData.message ='请输入正确手机号';
		res.json(responseData);
		return;
	}
	if(!codeSms){
		responseData.code = 4;
		responseData.message ='请输入手机验证码';
		res.json(responseData);
		return;
	}		
	if(password != password2 || password == '' || password == null || password == undefined){
		responseData.code = 3;
		responseData.message ='输入密码有误';
		res.json(responseData);
		return;
	}
	var capcha = req.body.capcha;
	md5.update(password)
	password = md5.digest('hex')
	var newUser = {
	  username: username,
	  password: password,
	  time : yy + '-' + MM + '-' + dd + ' ' + hh + ':' + mm + ':' + ss
	}
	if(capcha != req.session.capcha){
		responseData.code = 2;
		responseData.message ='验证码输入有误';
		res.json(responseData);
		return;
	}
	Model.User.findOne({username: username}).then(function(userInfo){
	  if(userInfo){
			responseData.code = 1;
			responseData.message ='用户名已被注册';
			res.json(responseData);
			return;
		}
		if(newUser.username){
			Model.PhoneCode.findOne({phone: username,code: codeSms}).then(function(doc){
				if(!doc){
					responseData.code = 4;
					responseData.message ='请输入正确手机验证码嘛';
					res.json(responseData);
					return;
				}else{
					Model.User.create(newUser).then(function(newUserInfo){
						responseData.code = 200;
						responseData.message = '注册成功';
						res.json(responseData);
					})
				}
			})
		}else{
			responseData.code = 0;
			responseData.message ='请求接口出错';
			res.json(responseData);
		}
	})
}
exports.getCaptcha = function (req,res) {
	console.log(req.query);
	var option = req.query;
	// 验证码，有两个属性，text是字符，data是svg代码
	var code = svgCaptcha.create(option);
	// 保存到session,忽略大小写
	req.session["capcha"] = code.text.toLowerCase();
	// 返回数据直接放入页面元素展示即可
	res.setHeader('Content-Type', 'image/svg+xml');
	res.write(String(code.data));
  res.end();
}
exports.getCaptchaSms = function (req,res) {
	// /**
	//  * 云通信基础能力业务短信发送、查询详情以及消费消息示例，供参考。
	//  * Created on 2017-07-31
	//  */
	// const SMSClient = require('@alicloud/sms-sdk')
	// // ACCESS_KEY_ID/ACCESS_KEY_SECRET 根据实际申请的账号信息进行替换
	// const accessKeyId = 'LTAI0eQiQoo4UBwl'
	// const secretAccessKey = 'M8eto0CBRosiWHYdDyz2hYxeoMoEHd'
	// //初始化sms_client
	// let smsClient = new SMSClient({accessKeyId, secretAccessKey})
	// //发送短信
	// smsClient.sendSMS({
	// 		PhoneNumbers: '15528354143',
	// 		SignName: '微租优房',
	// 		TemplateCode: 'SMS_137810282',
	// 		TemplateParam: '{"code":"12345"}'
	// }).then(function (res) {
	// 	console.log(res)
	// 		let {Code}=res
	// 		if (Code === 'OK') {
	// 			//处理返回参数
	// 			console.log(res)
	// 		}
	// }, function (err) {
	// 	console.log(err.data)
	// })
	var phone = req.body.phone;
	var codeSms = '';
	for(var i=0;i<4;i++){  
		codeSms+=Math.floor(Math.random()*10)  
	}
	if(phone == '' || phone == null || phone == undefined){
		responseData.code = 3;
		responseData.message ='输入手机号啊！';
		res.json(responseData);
		return;
	}
	if(!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(phone))){
		responseData.code = 4;
		responseData.message ='输入正确手机号啊！';
		res.json(responseData);
		return;
	}
	var QcloudSms = require("qcloudsms_js");
	var appid = 1400059389;
	var appkey = "a5f151b3abfb9c3bb0f10439b26be3e5";
	var phoneNumbers = [phone];
	var templId = 144820;
	var params = [codeSms, "1"];
	var qcloudsms = QcloudSms(appid, appkey);
	var ssender = qcloudsms.SmsSingleSender();
	ssender.sendWithParam(86, phoneNumbers[0], templId,
	params, "", "", "",
	function callback(err, resp, resData) {
		if (err)
			console.log("err: ", err);
		else
			console.log("response data: ", resData);
			if(resData.errmsg == 'OK'){
				Model.PhoneCode.find({phone: phone},function (error,docs) {
					console.log(docs.length)
					if(docs.length != 0){
						//短信验证码更新数据库
						Model.PhoneCode.update({phone: phone}, {$set: {code: codeSms}}).then(function(newUserInfo){
						})
					} else {
						//短信验证码存入数据库
						Model.PhoneCode.create({phone: phone,code: codeSms,time : yy + '-' + MM + '-' + dd + ' ' + hh + ':' + mm + ':' + ss}).then(function(newUserInfo){
						})
					}
					responseData.code = 200;
					responseData.message = '短信发送成功';
					res.json(responseData);
				})
			}else{
				responseData.code = 200;
				responseData.message = resData.errmsg;
				res.json(responseData);
			}
	});
}