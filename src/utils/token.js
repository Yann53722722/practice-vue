import Cookies from 'js-cookie'

const TokenKey = 'User-Token'
export function getToken () {
  return Cookies.get(TokenKey)
}
export function setToken (token) {
  return Cookies.set(TokenKey, token)
}
export function removeToken () {
  return Cookies.remove(TokenKey)
}
export function setlocalStorage (key, value) {
  return localStorage.setItem(key, value)
}
export function getlocalStorage (key) {
  return localStorage.getItem(key)
}
export function removelocalStorage (key) {
  return localStorage.setItem(key, null)
}
