import {createStore} from 'vuex'
import axios from "axios";

export default createStore({
  state: {
    status: '',
    token: localStorage.getItem('data') ? JSON.parse(localStorage.getItem('data')).token : '',
    user: localStorage.getItem('data') ? JSON.parse(localStorage.getItem('data')).user : {}
  },
  getters: {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
    currentUser: state => state.user
  },
  mutations: {
    auth_request (state) {
      state.status = 'loading'
    },
    auth_success (state, token, user) {
      state.status = 'success'
      state.token = token
      state.user = user
    },
    auth_error (state) {
      state.status = 'error'
    },
    logout (state) {
      state.status = ''
      state.token = ''
    },
  },
  actions: {
    login ({commit}, user) {
      return new Promise((resolve, reject) => {
        commit('auth_request')
        axios({url: 'http://localhost:3000/login', data: user, method: 'POST'})
          .then(resp => {
            const token = resp.data.token
            const user = resp.data.user
            localStorage.setItem('data', JSON.stringify({user: user, token: token}))
            axios.defaults.headers.common['Authorization'] = token
            commit('auth_success', token, user)
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
        commit('auth_request')
        axios({url: 'http://localhost:3000/register', data: user, method: 'POST'})
          .then(resp => {
            const token = resp.data.token
            const user = resp.data.user
            localStorage.setItem('data', JSON.stringify({user: user, token: token}))
            axios.defaults.headers.common['Authorization'] = token
            commit('auth_success', token, user)
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
  modules: {}
})
