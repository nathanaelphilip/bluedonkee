import { unionBy } from 'lodash'

import { getWorkCategory, getWorkCategories } from '@/api'
import { WORK_CATEGORIES_FETCH } from '@/store/mutation-types'

const state = {
  repository: []
}

const mutations = {
  [WORK_CATEGORIES_FETCH] (state, items) {
    const merged = unionBy(state.repository, items, 'id')
    state.repository = merged
  }
}

const actions = {
  async fetch ({ commit }, settings) {
    const { data } = await getWorkCategories(settings)
    commit(WORK_CATEGORIES_FETCH, data.records)
  },

  async getById ({ commit }, id) {
    const { data } = await getWorkCategory(id)
    commit(WORK_CATEGORIES_FETCH, [data])
    return data
  },

  async get ({ commit }, settings) {
    const { data } = await getWorkCategories(settings)
    commit(WORK_CATEGORIES_FETCH, data.records)
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
