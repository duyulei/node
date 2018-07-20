import axios from 'axios'

export default {
  state: {
    companyInfo: '',
    userInfo: '',
    username: ''
  },
  mutations: {
    setUserName (state, username) {
      state.username = username
    },
    setAccessToken (state, accessToken) {
      localStorage.setItem('accessToken', accessToken)
    },
    clearAccessToken (state) {
      localStorage.clear('accessToken')
    }
  },
  actions: {
    //  登录
    login ({commit}, form) {
      console.log(form)
      return new Promise((resolve, reject) => {
        axios({
          url: '/login',
          method: 'post',
          data: {
            username: form.username,
            password: form.password
          },
          transformRequest: [function (data) {
            // Do whatever you want to transform the data
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
          console.log(response)
          if (response.data.code === 200) {
            commit('setAccessToken', response.data.userInfo.accessToken)
            commit('setUserName', form.username)
          }
          resolve(response)
        }).catch(function (response) {
          reject(response)
        })
      })
    },
    //  注册
    regist ({commit}, form) {
      console.log(form)
      return new Promise((resolve, reject) => {
        axios({
          url: '/regist',
          method: 'post',
          data: {
            username: form.phone,
            password: form.password,
            password2: form.repass,
            codeSms: form.codeSms,
            capcha: form.code
          },
          transformRequest: [function (data) {
            // Do whatever you want to transform the data
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
          resolve(response)
        }).catch(function (response) {
          reject(response)
        })
      })
    },
    //  获取验证码
    getCaptcha ({commit}, form) {
      console.log(form)
      return new Promise((resolve, reject) => {
        axios({
          url: '/regist/getCaptcha',
          method: 'get',
          data: {
          },
          transformRequest: [function (data) {
            // Do whatever you want to transform the data
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
          resolve(response)
        }).catch(function (response) {
          reject(response)
        })
      })
    },
    //  获取短信验证码
    getCaptchaSms ({commit}, form) {
      console.log(form)
      return new Promise((resolve, reject) => {
        axios({
          url: '/regist/getCaptchaSms',
          method: 'post',
          data: {
            phone: form.phone
          },
          transformRequest: [function (data) {
            // Do whatever you want to transform the data
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
          resolve(response)
        }).catch(function (response) {
          reject(response)
        })
      })
    },
    //  发送消息
    sendMessage ({commit}, form) {
      console.log(form)
      return new Promise((resolve, reject) => {
        axios({
          url: '/socket',
          method: 'post',
          data: {
          },
          transformRequest: [function (data) {
            // Do whatever you want to transform the data
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
          resolve(response)
        }).catch(function (response) {
          reject(response)
        })
      })
    }
  }
}
