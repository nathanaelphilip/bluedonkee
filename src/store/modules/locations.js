import { unionBy } from 'lodash'

import { getLocation, getLocations } from '@/api'
import { LOCATIONS_FETCH } from '@/store/mutation-types'

const state = {
  repository: []
}

const mutations = {
  [LOCATIONS_FETCH] (state, items) {
    const merged = unionBy(state.repository, items, 'id')
    state.repository = merged
  }
}

const actions = {
  async fetch ({ commit }, settings) {
    const { data } = await getLocations(settings)
    commit(LOCATIONS_FETCH, data.records)
  },

  async getById ({ commit }, id) {
    const { data } = await getLocation(id)
    commit(LOCATIONS_FETCH, [data])
    return data
  },

  async get ({ commit }, settings) {
    const { data } = await getLocations(settings)
    commit(LOCATIONS_FETCH, data.records)
    return data.records[0]
  }
}

const getters = {
  getById: (state) => (id) => {
    return state.repository.find(item => item.id === id)
  },

  getBySlug: (state) => (slug) => {
    return state.repository.find(item => item.fields.Slug === slug)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
