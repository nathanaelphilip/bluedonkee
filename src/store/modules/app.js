import { GLOBAL_SIDEBAR_TOGGLE } from '@/store/mutation-types'

const state = {
  sidebar: false
}

const mutations = {
  [GLOBAL_SIDEBAR_TOGGLE] (state, status) {
    state.sidebar = status
  }
}

const actions = {
  sidebar ({ commit }, status) {
    commit(GLOBAL_SIDEBAR_TOGGLE, status)
  }
}

const getters = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
