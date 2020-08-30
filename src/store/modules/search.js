const UPDATE_QUERY = 'UPDATE_QUERY'

const state = {
  query: ''
}

const mutations = {
  [UPDATE_QUERY] (state, value) {
    state.query = value
  }
}

const actions = {
  updateQuery ({ commit }, value) {
    commit(UPDATE_QUERY, value)
  }
}

const getters = {
  query (state) {
    return state.query
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
