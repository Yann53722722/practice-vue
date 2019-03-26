import request from '../utils/request'

export function login (username, password) {
  const data = {
    username,
    password
  }
  return request({
    url: '/user/user/login',
    method: 'post',
    data
  })
}
