import {
  GLOBAL_MODAL_TOGGLE,
  GLOBAL_SIDEBAR_TOGGLE
} from '@/store/mutation-types'

const state = {
  sidebar: false,
  modalOpen: false
}

const mutations = {
  [GLOBAL_MODAL_TOGGLE] (state, status) {
    state.modalOpen = status
  },

  [GLOBAL_SIDEBAR_TOGGLE] (state, status) {
    state.sidebar = status
  }
}

const actions = {
  modalOpen ({ commit }, status) {
    commit(GLOBAL_MODAL_TOGGLE, status)
  },

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
