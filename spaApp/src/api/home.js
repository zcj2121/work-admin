import request from '@/utils/request'

// home API
export function getWorkAllList(params) { // 获取 全部任务列表
  return request({
    url: '/getWorkAllList',
    method: 'get',
    params
  })
}

