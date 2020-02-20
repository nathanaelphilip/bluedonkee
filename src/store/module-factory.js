import { unionBy } from 'lodash'
import { api } from '@/api'

export default ({
  mutations: {
    FETCH: ''
  },
  endpoint: ''
}) => {
  const { FETCH } = mutations

  const state = {
    repository: []
  }

  const mutations = {
    [FETCH] (state, items) {
      const merged = unionBy(state.repository, items, 'id')
      state.repository = merged
    }
  }

  const actions = {
    async fetch ({ commit }, settings) {
      const { data } = await api.get(`${endpoint}`, settings)
      commit(FETCH, data.records)
    },

    async getById ({ commit }, id) {
      const { data } = await api.get(`${endpoint}/${id}`)
      commit(FETCH, [data])
      return data
    },

    async get ({ commit }, settings) {
      const { data } = await api.get(`${endpoint}`, settings)
      commit(FETCH, data.records)
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

  return {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
  }
}
