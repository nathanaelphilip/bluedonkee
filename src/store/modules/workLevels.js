import { unionBy } from 'lodash'

import { getWorkLevel, getWorkLevels } from '@/api'
import { WORK_LEVELS_FETCH } from '@/store/mutation-types'

const state = {
  repository: []
}

const mutations = {
  [WORK_LEVELS_FETCH] (state, items) {
    const merged = unionBy(state.repository, items, 'id')
    state.repository = merged
  }
}

const actions = {
  async fetch ({ commit }, settings) {
    const { data } = await getWorkLevels(settings)
    commit(WORK_LEVELS_FETCH, data.records)
  },

  async getById ({ commit }, id) {
    const { data } = await getWorkLevel(id)
    commit(WORK_LEVELS_FETCH, [data])
    return data
  },

  async get ({ commit }, settings) {
    const { data } = await getWorkLevels(settings)
    commit(WORK_LEVELS_FETCH, data.records)
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
