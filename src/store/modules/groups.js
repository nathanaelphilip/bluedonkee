import { unionBy } from 'lodash'

import { getGroups, getGroup } from '@/api'
import { GROUPS_FETCH, GROUPS_RELATED_FETCH } from '@/store/mutation-types'

const state = {
  repository: [],
  related: {}
}

const mutations = {
  [GROUPS_FETCH] (state, items) {
    const merged = unionBy(state.repository, items, 'id')
    state.repository = merged
  },

  [GROUPS_RELATED_FETCH] (state, { ids, id }) {
    state.related[id] = ids
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
  },

  async fetchRelated ({ commit }, { params, id }) {
    const { data } = await getGroups({ params })
    const ids = data.records.map(record => record.id)
    commit(GROUPS_FETCH, data.records)
    commit(GROUPS_RELATED_FETCH, { id, ids })
    return ids
  }
}

const getters = {
  getById: (state) => (id) => {
    return state.repository.find(job => job.id === id)
  },

  getBySlug: (state) => (slug) => {
    return state.repository.find(job => job.fields.Slug === slug)
  },

  sortAlphabetically: state => {
    return state.repository.sort((a, b) => {
      return a.fields.Name > b.fields.Name ? 1 : -1
    })
  },

  getRelated: state => id => {
    if (state.related[id]) {
      return state.repository.filter(group => {
        return state.related[id].includes(group.id)
      })
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
