export const state = () => ({
  current: {
    id: 0,
    name: 'empty'
  }
})
export const mutations = {
  set_current (state, options) {
    state.current.id = options.id
    state.current.name = options.name
  }
}

export const getters = {
  getCurrentGroup: (state) => {
    return state.current
  }
}
