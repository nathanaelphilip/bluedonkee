import { unionBy } from 'lodash'

import { getGroups, getGroup } from '@/api'
import { GROUPS_FETCH } from '@/store/mutation-types'

const state = {
  repository: []
}

const mutations = {
  [GROUPS_FETCH] (state, items) {
    const merged = unionBy(state.repository, items, 'id')
    state.repository = merged
  }
}

const actions = {
  async fetch ({ commit }, settings) {
    const { data } = await getGroups(settings)
    commit(GROUPS_FETCH, data.records)
  },

  async get ({ commit }, settings) {
    const { data } = await getGroups(settings)
    commit(GROUPS_FETCH, data.records)
    return data.records[0]
  },

  async getById ({ commit }, id) {
    const { data } = await getGroup(id)
    commit(GROUPS_FETCH, [data])
    return data
  }
}

const getters = {
  getById: (state) => (id) => {
    return state.repository.find(job => job.id === id)
  },

  getBySlug: (state) => (slug) => {
    return state.repository.find(job => job.fields.Slug === slug)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
