<template>
  <div class="login-view">
    <nav-bar class="nav-box"></nav-bar>
    <div class="login-con">
      <div class="con-box">
        <div class="con">
          <div class="color-gray" style="text-align:left;font-size:16px;margin-bottom:15px;">登 录</div>
          <el-input @keyup.enter.native="login()"
            placeholder="请输入手机号"
            prefix-icon="iconfont icon-icon_shouji"
            v-model="form.username">
          </el-input>
          <el-input @keyup.enter.native="login()"
            type="password"
            placeholder="请输入密码"
            prefix-icon="iconfont icon-icon_mima"
            v-model="form.password">
          </el-input>
          <el-button @click="login()">登 录</el-button>
          <div class="regist-con"><span style="float:left" @click="goRegist()">注册</span><span style="float:right" @click="goForgetPsd()">忘记密码</span></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar'

export default {
  name: 'login-view',
  data () {
    return {
      form: {
        username: '',
        password: ''
      }
    }
  },
  components: { NavBar },
  created () {
  },
  methods: {
    login () {
      if (!this.form.username) {
        this.$message({
          message: '请输入手机号',
          duration: 1500,
          center: true
        })
        return false
      }
      if (!this.form.password) {
        this.$message({
          message: '请输入密码',
          duration: 1500,
          center: true
        })
        return false
      }
      this.$store.dispatch('login', this.form).then(res => {
        if (res.data.code === 200) {
          this.$router.replace({path: '/home'})
          this.$message({
            message: res.data.message,
            duration: 1500,
            center: true
          })
        } else {
          this.$message({
            message: res.data.message,
            duration: 1500,
            center: true
          })
        }
      })
    },
    goRegist () {
      this.$router.push({path: '/regist'})
    },
    goForgetPsd () {
      this.$router.push({path: '/forgetpsd'})
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
