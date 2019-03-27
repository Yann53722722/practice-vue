import request from '../utils/request'

export function getOne (id) {
  return request({
    url: '/company/' + id,
    method: 'get'
  })
}
