<template>
  <div class="nav-bar">
    <div class="nav-bar-left">
      <a style="cursor:pointer" @click="goToHome"><img height="70%" class="nav-bar-img" src="../assets/logo.png"></a>
      <ul class="nav-ul">
        <li class="nav-li" v-if="!phone && !avatar">未登录</li>
        <li class="nav-li" v-if="phone"><span>{{phone}}</span><br/><span @click="loginOut" style="color: #409EFF; cursor:pointer;">退出登录</span></li>
        <li style="float:right;" class="nav-li" v-if="avatar"><img style="border-radius: 50%;" width="40px" height="40px;" :src="avatar"/></li>
      </ul>
    </div>
    <div class="nav-line"></div>
  </div>
</template>

<script>
export default{
  name: 'nav-bar',
  data () {
    return {}
  },
  props: ['avatar', 'phone'],
  methods: {
    goToHome () {
      this.$router.replace({path: '/index/home'})
    },
    loginOut () {
      this.$store.dispatch('loginOut', localStorage.getItem('accessToken')).then(res => {
        if (res.data.code === 200) {
          this.$message({
            message: res.data.msg,
            duration: 1500,
            center: true
          })
          location.reload()
        } else {
          this.$message({
            message: res.data.msg,
            duration: 1500,
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
  .nav-bar{
    align-items: center;
    justify-content: center;
    background: #FFF;
    height: 10vh;
    line-height: 10vh;
    width: 100%;
    min-width: 1300px;
    position: relative;
  }
  .nav-line{
    width: 100%;
    height: 2px;
    background: #5AD79F;
    position: absolute;
    bottom: 0px;
  }
  .nav-bar-left{
    display: block;
    max-width: 1300px;
    margin: 0 auto;
  }
  .nav-bar-img{
    vertical-align:middle;
    width: 40px;
    height: 40px;
  }
  .nav-ul {
    list-style-type: none;
    display: inline-block;
    margin-left: 30px;
    float: right;
    line-height: 3vh;
    height: 6vh;
    padding: 2vh 0;
  }

  .search-icon{
    margin-right: 20px;
    padding: 0 15px;
  }
  .search-icon a {
    display: inline-block;
    transition:transform 1s;
    -moz-transition:transform 1s;
    -webkit-transition:transform 1s;
    -o-transition:-o-transform 1s;
  }
 .search-icon a:hover{
    color: #d86370;
    transform:scale(1.5,1.5);
    -moz-transform:scale(1.5,1.5);
    -webkit-transform:scale(1.5,1.5);
    -o-transform:scale(1.5,1.5);
  }
  .nav-li {
    display: inline-block;
    font-size: 12px;
    margin-left: 10px;
    text-align: right;
  }
  .nav-li a.router-link-exact-active,.nav-li a.router-link-active{
    color: #d86370;
    border-bottom: 3px solid #d86370;
  }
  a {
    padding: 7px 0;
    color: #000;
    text-decoration: none;
  }

  .triangle-postion{
    position: relative;
    top: 13px;
    left: 5px;
  }
  .triangle-down {
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 5px solid #333;
  }
  .triangle-up {
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 5px solid #333;
  }
  .el-dropdown-link{
    cursor: pointer;
  }
  .el-dropdown-menu{
    margin: 0;
    font: 14px;
    min-width: min-content;
  }
  .el-dropdown-menu__item{
    padding: 0px 15px;
    font-size: 14px;
  }
  .el-dropdown-menu__item:not(.is-disabled):hover {
    background-color: #d86370;
    color: #fff;
  }
</style>
<style>
.el-badge__content.is-fixed{
  text-align: center !important;
  position: absolute !important;
  top: 10px !important;
  left: -55px !important;
  height: 20px !important;
  width: 20px !important;
  background-color: #ff4946 !important;
  padding: 0px !important;
  border-radius: 50% !important;
  border: none !important;
}
</style>
