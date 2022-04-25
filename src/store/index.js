import { createStore } from 'vuex'

export default createStore({
  state () {
    return {
      token: null,
      acesso: null,
      nome: null
    }
  },
  getters: {
    isLogado (state) {
      return !!state.token
    }
  },
  mutations: {
    setUsuario (state, { login, accessToken, roles }) {
      state.token = accessToken
      state.acesso = roles
      state.nome = login
    },
    logout (state) {
      state.token = null
      state.acesso = null
      state.nome = null
    }
  },
  actions: {},
  modules: {}
})
