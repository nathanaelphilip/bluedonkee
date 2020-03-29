import { unionBy } from 'lodash'

import { getState, getStates } from '@/api'
import { STATES_FETCH } from '@/store/mutation-types'

const state = {
  repository: []
}

const mutations = {
  [STATES_FETCH] (state, items) {
    const merged = unionBy(state.repository, items, 'id')
    state.repository = merged
  }
}

const actions = {
  async fetch ({ commit }, settings) {
    const { data } = await getStates(settings)
    commit(STATES_FETCH, data.records)
  },

  async getById ({ commit }, id) {
    const { data } = await getState(id)
    commit(STATES_FETCH, [data])
    return data
  },

  async get ({ commit }, settings) {
    const { data } = await getStates(settings)
    commit(STATES_FETCH, data.records)
    return data.records[0]
  }
}

const getters = {
  getById: (state) => (id) => {
    return state.repository.find(item => item.id === id)
  },

  getBySlug: (state) => (slug) => {
    return state.repository.find(item => item.fields.Slug === slug)
  },

  sortAlphabetically: state => {
    return state.repository.sort((a, b) => {
      return a.fields.Name > b.fields.Name ? 1 : -1
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
