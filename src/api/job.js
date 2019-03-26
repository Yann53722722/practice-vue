import request from '../utils/request'

export function getList (query) {
  return request({
    url: '/company/job/list',
    method: 'get',
    params: query
  })
}
