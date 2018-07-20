import Vue from 'vue'
import Router from 'vue-router'
import HomeView from '@/views/HomeView'
import LoginView from '@/views/LoginView'
import RegistView from '@/views/RegistView'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: '信息填写',
      component: HomeView,
      meta: {
        requireAuth: true// 添加该字段，表示进入这个路由是需要登录的
      }
    },
    {
      path: '/login',
      name: '登录',
      component: LoginView
    },
    {
      path: '/regist',
      name: '注册',
      component: RegistView
    }
  ]
})
