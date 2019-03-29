import request from '../utils/request'

export function getAll () {
  return request({
    url: '/company/industry/',
    method: 'get'
  })
}
