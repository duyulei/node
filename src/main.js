// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import store from './store'

Vue.config.productionTip = false
axios.defaults.withCredentials = true

axios.defaults.baseURL = '/api'
axios.defaults.timeout = 10000

Vue.use(ElementUI)
/* eslint-disable no-new */
router.beforeEach(function (to, from, next) {
  if (to.meta.requireAuth) { // 判断该路由是否需要登录权限
    if (localStorage.getItem('accessToken')) { // 通过vuex state获取当前的token是否存在
      next()
    } else {
      next({
        path: '/login'
      })
    }
  } else { // 通过vuex state获取当前的token是否存在
    next()
  }
})

// http request 拦截器
axios.interceptors.request.use(
  config => {
    // 判断是否存在token，如果存在的话，则每个http header都加上token
    // config.headers.Authorization = `${store.state.user.accountToken}`;
    // config.data.accountToken = localStorage.getItem('accountToken')
    return config
  },
  err => {
    return Promise.reject(err)
  })

// http response 拦截器
axios.interceptors.response.use(
  response => {
    if (response) {
      switch (response.data.code) {
        case 403:
          // 返回 401 清除token信息并跳转到登录页面
          store.commit('clearAccessToken')
          router.replace({path: '/login'})
          break
        case '00001':
          router.replace({path: '/companyinfoedit '})
          break
        case '00004':
          router.replace({path: '/home/certfailed'})
          break
        case '00005':
          router.replace({path: '/home/authentic'})
          break
        case '00012':
          router.replace({path: '/comlogin'})
          break
        case '00013':
          axios({
            url: '/update/token',
            method: 'post',
            data: {
              accountToken: localStorage.getItem('accountToken')
            },
            transformRequest: [function (data) {
              let ret = ''
              for (let it in data) {
                ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
              }
              return ret
            }],
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            }
          }).then(function (response) {
            if (response.data.code === '200') {
              store.commit('setAccountToken', response.data.data)
              router.replace({path: '/comlogin'})
            }
          })
          break
      }
    }
    return response
  },
  err => {
    console.log(err)
    return Promise.reject(err)
  })

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
