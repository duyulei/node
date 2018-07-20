/*
封装socket.io,为了获取server以便监听.
2018年7月17日15:40:24
 */
/* eslint-disable */
var socketio = {};
var socket_io = require('socket.io');
 
//获取io
socketio.getSocketio = function(server){
 
	var io = socket_io.listen(server);
	io.on('connection',function (socket) {
		console.log('新用户登录');
		console.log(socket.id);
		//监听新用户加入
		socket.on('login',function (obj) {
			socket.name=obj.userid;
			//检查用户在线列表
			if(!onlineUser.hasOwnProperty(obj.userid)){
				onlineUser[obj.userid]=obj.username;
				//在线人数+1
				onlineCount++;
			}
			//广播消息
			io.emit('login',{onlineUser:onlineUser,onlineCount:onlineCount,user:obj});
			console.log(obj.username+"加入了聊天室");
		})
	
		//监听用户退出
		socket.on('disconnect',function () {
            console.log('退出吗');
			//将退出用户在在线列表删除
		})
	
		//监听用户发布聊天内容
		socket.on('message', function(obj){
            console.log('聊天');
            console.log(obj);
			//向所有客户端广播发布的消息
			io.emit('notice', obj);
            console.log(obj.username+'说：'+obj.message);
		});
	})
};
 
module.exports = socketio;