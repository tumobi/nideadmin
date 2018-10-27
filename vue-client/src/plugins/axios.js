import Vue from 'vue'
import axios from 'axios'
import iView from 'iview'
import helper from '../libs/helper'

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

let config = {
  // baseURL: process.env.baseURL || process.env.apiUrl || ""
  // timeout: 60 * 1000, // Timeout
  // withCredentials: true, // Check cross-site Access-Control
}

axios.defaults.headers.common['X-Admin-Version'] = '1.0.0'

const _axios = axios.create(config)

_axios.interceptors.request.use(
  async function (config) {
    let adminToken = ''
    try {
      adminToken = await helper.getStorage('admin_token')
    } catch (err) {
      adminToken = ''
    }
    config.headers['X-Admin-Token'] = adminToken
    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

// Add a response interceptor
_axios.interceptors.response.use(
  function (response) {
    // 正常处理
    const res = response.data
    if (res.code === 200) {
      return Promise.resolve(res.data)
    }

    // 未登录
    if (res.code === 401) {
      // 提示未登录
      iView.Message.error('请先登录...')
      window.location.href = '/login'
      return Promise.reject(res)
    }

    return Promise.reject(res)
  },
  function (error) {
    // Do something with response error
    return Promise.reject(error)
  }
)

Plugin.install = function (Vue, options) {
  Vue.axios = _axios
  window.axios = _axios
  Object.defineProperties(Vue.prototype, {
    axios: {
      get () {
        return _axios
      }
    },
    $axios: {
      get () {
        return _axios
      }
    }
  })
}

Vue.use(Plugin)

export default Plugin
