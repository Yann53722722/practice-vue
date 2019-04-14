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
export function addJob (job) {
  return request({
    url: '/company/job/',
    method: 'post',
    data: job
  })
}
export function deleteJob (id) {
  return request({
    url: '/company/job/' + id,
    method: 'delete'
  })
}
export function editJob (job) {
  return request({
    url: '/company/job/',
    method: 'put',
    data: job
  })
}
export function getUncheckList () {
  return request({
    url: '/company/job/getUncheckJobList',
    method: 'get'
  })
}
export function checkJob (id) {
  return request({
    url: '/company/job/' + id,
    method: 'patch'
  })
}
