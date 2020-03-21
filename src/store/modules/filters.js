import hash from 'object-hash'

import {
  FILTERS_ACCEPT,
  FILTERS_CLEAR
} from '@/store/mutation-types'

const state = {
  accepted: {
    categories: [],
    location: [],
    type: []
  }
}

const mutations = {
  [FILTERS_ACCEPT] (state, { key, items }) {
    state.accepted[key] = items
  },

  [FILTERS_CLEAR] (state) {
    state.accepted = {
      categories: [],
      location: [],
      type: []
    }
  }
}

const actions = {
  async accept ({ commit }, { key, items }) {
    commit(FILTERS_ACCEPT, { key, items })
  },

  async clear ({ commit }) {
    commit(FILTERS_CLEAR)
  }
}

const getters = {
  accepted: state => key => {
    return state.accepted[key]
  },

  filtered: state => {
    return state.accepted.categories.length || state.accepted.location.length || state.accepted.type.length
  },

  filter: state => {
    let categories = []

    if (state.accepted.categories.length) {
      for (var i = 0; i < state.accepted.categories.length; i++) {
        categories.push(`{Work Categories} = '${state.accepted.categories[i]}'`)
      }
    }

    return `OR(${categories.join(',')})`
  },

  key: state => {
    return hash(state.accepted)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
