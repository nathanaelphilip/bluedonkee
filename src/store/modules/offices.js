import { unionBy } from 'lodash'

import { getOffice, getOffices } from '@/api'
import { OFFICES_FETCH } from '@/store/mutation-types'

const state = {
  repository: []
}

const mutations = {
  [OFFICES_FETCH] (state, items) {
    const merged = unionBy(state.repository, items, 'id')
    state.repository = merged
  }
}

const actions = {
  async fetch ({ commit }, settings) {
    const { data } = await getOffices(settings)
    commit(OFFICES_FETCH, data.records)
  },

  async getById ({ commit }, id) {
    const { data } = await getOffice(id)
    commit(OFFICES_FETCH, [data])
    return data
  },

  async get ({ commit }, settings) {
    const { data } = await getOffices(settings)
    commit(OFFICES_FETCH, data.records)
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
