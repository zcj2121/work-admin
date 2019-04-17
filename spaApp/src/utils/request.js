import axios from 'axios'
import router from '@/router'
import { Message } from 'element-ui'
// import store from '../store'
// import { getToken } from '@/utils/auth'
import cookie from 'js-cookie'
import store from "../store";
// 创建axios实例
// let changeUrl = 'http://127.0.0.1:3001'
let changeUrl = ''
const service = axios.create({
  // withCredentials: true,
  // credentials: 'include',
  // baseURL: process.env.BASE_API, // api 的 base_url
  baseURL: changeUrl, // api 的 base_url
  timeout: 5000, // 请求超时时间
  cache: false
})

service.interceptors.request.use(config => {
  config.headers['Authorization'] = cookie.get('assent_token') || '' // 设置assent_token
  return config
},
    error => {
  console.log(error) // for debug
})

// respone拦截器
service.interceptors.response.use(
  response => {
    const res = response.data
    const msg = (msg, type) => {
      Message({
        message: msg,
        type: type,
        duration: 2 * 1000
      })
    }
    if (res.state == 0) {
      msg(res.msg, 'error')
      return response.data
    } if (res.state == 1004) {
      store.dispatch('FedLogOut').then(() => {
        router.push({ name: 'login' })
      })
    } else {
      return response.data
    }
  },
  error => {
    // Message({
    //   message: '服务器响应失败，请重试！',
    //   type: 'error',
    //   duration: 2 * 1000
    // })
    return Promise.reject(error)
  }
)

export default service
// respone拦截器

//  操作接口 公共方法
axios.baseURL = changeUrl
export function alertBox(_this, msg, url, params) {
  _this.$confirm(msg, '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    axios.get(axios.baseURL + url, { params: params })
      .then(function(response) {
        if (response.data.state === 1 || response.data.state === '1') {
          _this.$message({
            type: 'success',
            message: response.data.msg
          })
          _this.fetchData()
        } else {
          _this.$message({
            type: 'error',
            message: response.data.msg
          })
        }
      })
      .catch(function(response) {
        _this.$message({
          type: 'error',
          message: '操作失败!'
        })
      })
  }).catch(() => {
    // _this.$message({
    //   type: 'info',
    //   message: '已取消操作'
    // })
  })
}

// export function downURL() {
//   return changeUrl
// }
//  操作接口 公共方法

