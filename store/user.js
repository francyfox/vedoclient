const url = 'http://127.0.0.1:8000/api/'

export const state = () => ({
  user: {}
})

export const getters = {
  getUser: (state) => {
    return state.user
  }
}

export const mutations = {
  setUser (state, user) {
    state.user = user
  }
}

export const actions = {
  getUserInfo ({ commit }) {
    return new Promise((resolve, reject) => {
      this.$axios.get(url + 'users/16')
        .then((response) => {
          commit('setUser', response.data)
          resolve()
        })
    })
  }
}
