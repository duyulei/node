<template>
  <div class="login-view">
    <input type="text" v-model="message" @keyup.enter="send"/>
    <button @click="send">发送</button>
    <p v-for="(item, index) in objList" :key="index">{{item.username}}说：{{item.message}}</p>
  </div>
</template>

<script>
import socketCon from 'socket.io'
import NavBar from '@/components/NavBar'

export default {
  name: 'login-view',
  data () {
    return {
      socket: {},
      message: '',
      objList: []
    }
  },
  components: { NavBar },
  created () {
    console.log(123)
    var _this = this
    this.socket = socketCon.connect('ws://127.0.0.1')
    this.socket.on('notice',function (obj) {
      _this.objList.push(obj)
      console.log(obj)
    })
  },
  methods: {
    send () {
      console.log('点击发送')
      var obj = {
        message: this.message,
        username: this.$store.state.user.username
      }
      // 发事件给单用户
      this.socket.emit('message', obj);
      // 发事件给所有用户
      // socket.broadcast.emit('hi','newData');
      this.message = ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login-con{
  width: 100%;
  margin: 0 auto;
  height: 90vh;
  background-size:  100% 100%;
}
.con-box{
  width: 70%;
  height: 60vh;
  position: relative;
  top: 15vh;
  left: 15%;
  background-size:  100% 100%;
}
.con{
  width: 250px;
  text-align: center;
  position: absolute;
  right: 150px;
  top: 10vh;
}
.con .el-input{
  margin-bottom: 30px;
}
.con button{
  margin-bottom: 30px;
  width: 100% !important;
  background: #59d79f;
  color: #FFF;
  height: 36px;
}
.con button:hover{
  background: #31c281;
  color: #FFF!important;
}
.con button:active {
    color: #FFF!important;
}
.regist-con span{
  color:#52b9fc;
  text-decoration: underline;
  cursor: pointer;
}
</style>
<style>
.login-view .el-input__inner{
  height:36px !important;
}
.login-view .el-input__inner:focus + .el-input__prefix{
  color: #5AD79F !important;
}
</style>
