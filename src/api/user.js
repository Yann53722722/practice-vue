import request from '../utils/request'

export function getUserInfoById (id) {
  return request({
    url: '/user/user/' + id,
    method: 'get'
  })
}

export function getUserInfoByToken () {
  return request({
    url: '/user/user/principal',
    method: 'get'
  })
}

export function getUserInfoByName (username) {
  return request({
    url: '/user/user/getByUsername',
    method: 'get',
    params: {username}
  })
}
