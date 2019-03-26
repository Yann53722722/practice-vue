import {getToken, setToken} from '../../utils/token'

const user = {
  state: {
    token: getToken(),
    username: '',
    userId: ''
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, username) => {
      state.username = username
    }
  },
  actions: {
    HandleLogin ({ commit }, data) {
      return new Promise((resolve) => {
        commit('SET_TOKEN', data.data.jwt.access_token)
        setToken(data.data.jwt.access_token)
        resolve()
      })
    }
  }
}
export default user
