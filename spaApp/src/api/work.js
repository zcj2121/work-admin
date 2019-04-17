import request from '@/utils/request'

// 任务 API
export function getWorkList(params) { // 获取 全部任务列表
  return request({
    url: '/getWorkList',
    method: 'get',
    params
  })
}

export function getMyWorkList(params) { // 获取 我的任务列表
  return request({
    url: '/getMyWorkList',
    method: 'get',
    params
  })
}

export function addWork(data) { // 添加 任务
  return request({
    url: '/addWork',
    method: 'post',
    data
  })
}

export function editWork(data) { // 修改 任务
  return request({
    url: '/editWork',
    method: 'post',
    data
  })
}

export function delayWork(data) { // 延时 任务
  return request({
    url: '/delayWork',
    method: 'post',
    data
  })
}

export function auditWork(data) { // 延时 任务
  return request({
    url: '/auditWork',
    method: 'post',
    data
  })
}

export function finishWork(data) { // 完成 任务
  return request({
    url: '/finishWork',
    method: 'post',
    data
  })
}

export function scoreWork(data) { // 打分 任务
  return request({
    url: '/scoreWork',
    method: 'post',
    data
  })
}
