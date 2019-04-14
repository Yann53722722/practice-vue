import request from '../utils/request'

export function getOne (id) {
  return request({
    url: '/company/' + id,
    method: 'get'
  })
}
export function getByUserId (userId) {
  return request({
    url: '/company/getByUserId',
    method: 'get',
    params: { userId }
  })
}
export function updateOne (company) {
  return request({
    url: '/company/',
    method: 'put',
    data: company
  })
}
export function getUncheckList () {
  return request({
    url: '/company/getUncheckCompanyList',
    method: 'get'
  })
}
export function checkCompany (id) {
  return request({
    url: '/company/' + id,
    method: 'patch'
  })
}
