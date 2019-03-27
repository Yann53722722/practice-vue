import request from '../utils/request'

export function getList (query) {
  return request({
    url: '/company/job/list',
    method: 'get',
    params: query
  })
}
export function getOneById (id) {
  return request({
    url: '/company/job/' + id,
    method: 'get'
  })
}
