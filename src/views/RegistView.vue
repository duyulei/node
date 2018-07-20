<template>
  <div class="regist-view">
    <nav-bar class="nav-box"></nav-bar>
    <div class="header">
      <el-steps :active="active" finish-status="success" align-center>
        <el-step title="注册"></el-step>
        <el-step title="信息填写"></el-step>
        <el-step title="进入工作台"></el-step>
      </el-steps>
    </div>
    <div class="con">
      <div class="con-list">
        <p>手机</p>
        <el-input
          placeholder="请输入手机号"
          v-model="form.phone">
        </el-input>
      </div>
      <div class="con-list">
        <p>验证码</p>
        <el-row>
          <el-col :span="14">
            <el-input
              placeholder="请输入验证码"
              v-model="form.code">
            </el-input>
          </el-col>
          <el-col :span="2">
            &nbsp;
          </el-col>
          <el-col :span="8">
            <!-- <el-button :disabled="phoneCaptchaBtn.disabled" class="capcha" @click="getCaptcha">{{phoneCaptchaBtn.disabled ? phoneCaptchaBtn.time + 'S后重发':'获取验证码'}}</el-button> -->
            <a @click="getCaptcha"><span class="capcha-img" v-if="!imgSrc">获取图片验证码</span><img class="capcha-img" v-else :src="imgSrc"></span></a>
          </el-col>
        </el-row>
      </div>
      <div class="con-list">
        <p>短信验证码</p>
        <el-row>
          <el-col :span="14">
            <el-input
              placeholder="请输入短信验证码"
              v-model="form.codeSms">
            </el-input>
          </el-col>
          <el-col :span="2">
            &nbsp;
          </el-col>
          <el-col :span="8">
            <el-button :disabled="phoneCaptchaBtn.disabled" class="capcha" @click="getCaptchaSms">{{phoneCaptchaBtn.disabled ? phoneCaptchaBtn.time + 'S后重发':'获取验证码'}}</el-button>
          </el-col>
        </el-row>
      </div>
      <div class="con-list">
        <p>密码</p>
        <el-input
          type="password"
          placeholder="请输入密码"
          v-model="form.password">
        </el-input>
      </div>
      <div class="con-list">
        <p>确认密码</p>
        <el-input
          type="password"
          placeholder="请确认密码"
          v-model="form.repass">
        </el-input>
      </div>
      <div class="con-list" style="text-align:center;">
        <el-button class="regist" @click="regist">注册</el-button>
      </div>
    </div>
    <div class="line"></div>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar'
export default {
  name: 'regist-view',
  components: { NavBar },
  data () {
    return {
      active: 0,
      form: {
        phone: '',
        code: '',
        codeSms: '',
        password: '',
        repass: '',
        type: 'register'
      },
      imgSrc: '',
      phoneCaptchaBtn: {
        disabled: false,
        time: 0
      }
    }
  },
  methods: {
    getCaptcha: function () {
      console.log('验证码进入')
      this.imgSrc = 'http://127.0.0.1/regist/getCaptcha?t=' + new Date()
    },
    getCaptchaSms: function () {
      console.log('短信验证码进入')
      this.$store.dispatch('getCaptchaSms', this.form).then(res => {
        console.log(res)
        if (res.data.code === 200) {
          this.$message({
            message: res.data.message,
            duration: 1000,
            center: true
          })
        } else {
          this.$message({
            message: res.data.message,
            duration: 1000,
            center: true
          })
        }
      })
    },
    regist: function () {
      this.$store.dispatch('regist', this.form).then(res => {
        console.log(res)
        if (res.data.code === 200) {
          this.$router.replace({path: '/login'})
          this.$message({
            message: res.data.message,
            duration: 1000,
            center: true
          })
        } else {
          this.$message({
            message: res.data.message,
            duration: 1000,
            center: true
          })
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.regist-view{
  width: 100%;
  min-height: 100vh;
  padding-bottom: 40px;
  background: #f0f4f7;
  position: relative;
}
.header{
  text-align: center;
  width: 850px;
  margin: 0 auto;
  padding: 50px 0 5px;
}
.con{
  width: 400px;
  height: auto;
  margin: 0px auto;
  background: #FFF;
  padding: 30px 150px;
}
.con .el-input{
  margin-bottom: 10px;
}
.capcha{
  width: 100%;
  background: #59d79f;
  color: #FFF;
}
.capcha-img{
  display: inline-block;
  text-align: center;
  line-height: 40px;
  height: 40px;
  width: 100%;
  border: 1px solid #dcdfe6;
  border-radius: 5px;
  cursor: pointer;
}
.capcha:hover{
  background: #31c281;
}
.regist{
  width: 150px;
  margin-top: 20px;
  text-align: center;
  color: #FFF;
  background: #59d79f;
}
.regist:hover{
  background: #31c281;
}
.con-list p{
  margin-bottom: 10px;
}
.line{
  height: 20px;
  width: 100%;
  position: absolute;
  bottom: 0;
  background: -webkit-linear-gradient(left, #4CB8FF , #53D89D); /* Safari 5.1 - 6.0 */
  background: -o-linear-gradient(right, #4CB8FF, #53D89D); /* Opera 11.1 - 12.0 */
  background: -moz-linear-gradient(right, #4CB8FF, #53D89D); /* Firefox 3.6 - 15 */
  background: linear-gradient(to right, #4CB8FF , #53D89D); /* 标准的语法 */
}
</style>
<style>
.el-step__title.is-process{
  color: #59d79f !important;
}
.el-step__head.is-process{
  color: #fff !important;
  border: #59d79f !important;
}
.el-step__icon.is-text{
  background-color: #767676 !important;
  color: #FFF !important;
  border: 1px solid #767676 !important;
}
.el-step__head.is-process .el-step__icon.is-text{
  background: #59d79f !important;
  border: 1px solid #59d79f !important;
}
.el-step__line {
  background-color: #767676 !important;
}
.el-step__title {
  font-size: 14px !important;
}
</style>
