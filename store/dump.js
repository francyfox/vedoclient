export const state = () => ({
  dump: false
})
export const mutations = {
  dump_active (state) {
    state.dump = true
  }
}

export const actions = {
  dump_active (context) {
    context.commit('dump_active')
  }
}

export const getters = {
  dump_status: (state) => {
    return state.dump
  }
}
