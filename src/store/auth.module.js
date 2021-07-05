import axios from "axios";

const user = JSON.parse(localStorage.getItem('data')).user;
const initialState = user
  ? {status: {loggedIn: true}, user}
  : {status: {loggedIn: false}, user: null};

export const auth = {
  namespaced: true,
  state: initialState,
  actions: {
    login ({commit}, user) {
      return new Promise((resolve, reject) => {
        axios({url: process.env.VUE_APP_BACK + 'login', data: user, method: 'POST'})
          .then(resp => {
            const token = resp.data.token
            const user = resp.data.user
            localStorage.setItem('data', JSON.stringify({user: user, token: token}))
            axios.defaults.headers.common['Authorization'] = token
            commit('auth_success', user)
            resolve(resp)
          })
          .catch(err => {
            commit('auth_error')
            localStorage.removeItem('token')
            reject(err)
          })
      })
    },
    register ({commit}, user) {
      return new Promise((resolve, reject) => {
        axios({url: process.env.VUE_APP_BACK + 'register', data: user, method: 'POST'})
          .then(resp => {
            const token = resp.data.token
            const user = resp.data.user
            localStorage.setItem('data', JSON.stringify({user: user, token: token}))
            axios.defaults.headers.common['Authorization'] = token
            commit('auth_success', user)
            resolve(resp)
          })
          .catch(err => {
            commit('auth_error', err)
            localStorage.removeItem('token')
            reject(err)
          })
      })
    },
    logout ({commit}) {
      return new Promise((resolve) => {
        commit('logout')
        localStorage.removeItem('data')
        delete axios.defaults.headers.common['Authorization']
        resolve()
      })
    }
  },
  mutations: {
    auth_success (state, user) {
      state.status.loggedIn = true
      state.user = user
    },
    auth_error (state) {
      state.status.loggedIn = false
    },
    logout (state) {
      state.status.loggedIn = false
      state.user = {}
    },
  }
};
