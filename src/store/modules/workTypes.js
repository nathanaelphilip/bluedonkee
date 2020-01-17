import { unionBy } from 'lodash'

import { getWorkType, getWorkTypes } from '@/api'
import { WORK_TYPES_FETCH } from '@/store/mutation-types'

const state = {
  repository: []
}

const mutations = {
  [WORK_TYPES_FETCH] (state, items) {
    const merged = unionBy(state.repository, items, 'id')
    state.repository = merged
  }
}

const actions = {
  async getById ({ commit }, id) {
    const { data } = await getWorkType(id)
    commit(WORK_TYPES_FETCH, [data])
    return data
  },

  async get ({ commit }, settings) {
    const { data } = await getWorkTypes(settings)
    commit(WORK_TYPES_FETCH, data.records)
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
