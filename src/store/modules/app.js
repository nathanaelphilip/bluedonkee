import {
  GLOBAL_MODAL_TOGGLE,
  GLOBAL_HEADING,
  GLOBAL_INNER_HEIGHT,
  GLOBAL_MOBILE_NAVIGATION_TOGGLE,
  GLOBAL_MOBILE_SEARCH_TOGGLE,
  GLOBAL_SIDEBAR_TOGGLE
} from '@/store/mutation-types'

const state = {
  heading: '',
  innerHeight: false,
  sidebar: false,
  modalOpen: false,
  mobileNavOpen: false,
  mobileSearchOpen: false
}

const mutations = {
  [GLOBAL_MODAL_TOGGLE] (state, status) {
    state.modalOpen = status
  },

  [GLOBAL_MOBILE_NAVIGATION_TOGGLE] (state, status) {
    state.mobileNavOpen = status
  },

  [GLOBAL_MOBILE_SEARCH_TOGGLE] (state, status) {
    state.mobileSearchOpen = status
  },

  [GLOBAL_SIDEBAR_TOGGLE] (state, status) {
    state.sidebar = status
  },

  [GLOBAL_HEADING] (state, heading) {
    state.heading = heading
  },

  [GLOBAL_INNER_HEIGHT] (state, height) {
    state.innerHeight = height - 110 // this is the mobile nav height
  }
}

const actions = {
  modalOpen ({ commit }, status) {
    commit(GLOBAL_MODAL_TOGGLE, status)
  },

  mobileNavToggle ({ commit }, status) {
    commit(GLOBAL_MOBILE_NAVIGATION_TOGGLE, status)
  },

  mobileSearchToggle ({ commit }, status) {
    commit(GLOBAL_MOBILE_SEARCH_TOGGLE, status)
  },

  sidebar ({ commit }, status) {
    commit(GLOBAL_SIDEBAR_TOGGLE, status)
  },

  setHeading ({ commit }, heading) {
    commit(GLOBAL_HEADING, heading)
  },

  setInnerHeight ({ commit }, height) {
    commit(GLOBAL_INNER_HEIGHT, height)
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
