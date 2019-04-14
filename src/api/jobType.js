import request from '../utils/request'
export function getAllType () {
  return request({
    url: '/company/job-type/',
    method: 'get'
  })
}
