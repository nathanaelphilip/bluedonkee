import { getGroupCategory, getGroupCategories } from '@/api'
import { GROUP_CATEGORIES_FETCH } from '@/store/mutation-types'

const state = {
  repository: []
}

const mutations = {
  [GROUP_CATEGORIES_FETCH] (state, items) {
    state.repository = [...state.repository, ...items]
  }
}

const actions = {
  async fetch ({ commit }, settings) {
    const { data } = await getGroupCategories(settings)
    commit(GROUP_CATEGORIES_FETCH, data.records)
  },

  async get ({ commit }, settings) {
    const { data } = await getGroupCategories(settings)
    commit(GROUP_CATEGORIES_FETCH, data.records)
    return data.records[0]
  },

  async getById ({ commit }, id) {
    const { data } = await getGroupCategory(id)
    commit(GROUP_CATEGORIES_FETCH, [data])
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
