import {getToken, removelocalStorage, removeToken, setlocalStorage, setToken} from '../../utils/token'
import {getUserInfoByName, getUserInfoByToken} from '../../api/user'

const user = {
  state: {
    token: getToken(),
    username: '',
    userId: '',
    roles: []
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
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
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
    },
    getUserInfo ({ commit }) {
      return new Promise((resolve, reject) => {
        getUserInfoByToken().then(response => {
          getUserInfoByName(response.name).then(res => {
            commit('SET_NAME', res.data.username)
            commit('SET_ID', res.data.id)
            resolve(res)
          })
        })
      })
    },
    handleLogout ({ commit }) {
      return new Promise((resolve) => {
        removeToken()
        removelocalStorage('username')
        removelocalStorage('userId')
        commit('SET_NAME', '')
        commit('SET_ID', '')
        resolve()
      })
    }
  }
}
export default user
