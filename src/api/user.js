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
export function addUser (username, password, userType) {
  const data = {
    username,
    password
  }
  return request({
    url: '/user/user/',
    method: 'post',
    params: {userType},
    data: data
  })
}
