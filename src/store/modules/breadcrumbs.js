import {
  BREADCRUMBS_ADD,
  BREADCRUMBS_REMOVE
} from '@/store/mutation-types'

const state = {
  repository: []
}

const mutations = {
  [BREADCRUMBS_ADD] (state, { name, params }) {
    state.repository.push({ name, params })
  },

  [BREADCRUMBS_REMOVE] (state) {
    const current = state.repository
    current.splice(state.repository.length - 2, 2)
    state.repository = current
  }
}

const actions = {
  add ({ commit }, route) {
    commit(BREADCRUMBS_ADD, route)
  },

  remove ({ commit }) {
    commit(BREADCRUMBS_REMOVE)
  }
}

const getters = {
  current (state) {
    return state.repository[state.repository.length - 1]
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
