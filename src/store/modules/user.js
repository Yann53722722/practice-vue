import {getlocalStorage, getToken, setlocalStorage, setToken} from '../../utils/token'

const user = {
  state: {
    token: getToken(),
    username: getlocalStorage('username'),
    userId: getlocalStorage('userId')
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, username) => {
      state.username = username
    },
    SET_ID: (state, userId) => {
      state.userId = userId
    }
  },
  actions: {
    HandleLogin ({ commit }, data) {
      return new Promise((resolve) => {
        commit('SET_TOKEN', data.data.jwt.access_token)
        commit('SET_NAME', data.data.user.username)
        commit('SET_ID', data.data.user.id)
        setToken(data.data.jwt.access_token)
        setlocalStorage('username', data.data.user.username)
        setlocalStorage('userId', data.data.user.id)
        resolve()
      })
    }
  }
}
export default user
