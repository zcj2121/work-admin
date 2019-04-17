import request from '@/utils/request'

// 获取 用户列表
export function getUserList(params) {
  return request({
    url: '/getUserList',
    method: 'get',
    params
  })
}

// 添加 新用户
export function addUser(data) {
  return request({
    url: '/addUser',
    method: 'post',
    data
  })
}

// 修改 用户信息
export function editUser(data) {
  return request({
    url: '/editUser',
    method: 'post',
    data
  })
}

// 修改密码
export function editPassword(data) {
  return request({
    url: '/editPassword',
    method: 'post',
    data
  })
}

