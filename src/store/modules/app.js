import {
  GLOBAL_MODAL_TOGGLE,
  GLOBAL_HEADING,
  GLOBAL_SIDEBAR_TOGGLE
} from '@/store/mutation-types'

const state = {
  heading: '',
  sidebar: false,
  modalOpen: false
}

const mutations = {
  [GLOBAL_MODAL_TOGGLE] (state, status) {
    state.modalOpen = status
  },

  [GLOBAL_SIDEBAR_TOGGLE] (state, status) {
    state.sidebar = status
  },

  [GLOBAL_HEADING] (state, heading) {
    state.heading = heading
  }
}

const actions = {
  modalOpen ({ commit }, status) {
    commit(GLOBAL_MODAL_TOGGLE, status)
  },

  sidebar ({ commit }, status) {
    commit(GLOBAL_SIDEBAR_TOGGLE, status)
  },

  setHeading ({ commit }, heading) {
    commit(GLOBAL_HEADING, heading)
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
