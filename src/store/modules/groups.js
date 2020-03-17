import { unionBy } from 'lodash'

import { getGroups, getGroup } from '@/api'
import {
  GROUPS_FETCH,
  GROUPS_LOADING,
  GROUPS_OFFSET,
  GROUPS_RELATED_FETCH,
  GROUPS_REMOVE
} from '@/store/mutation-types'

const state = {
  loading: false,
  offset: '',
  repository: [],
  related: {}
}

const mutations = {
  [GROUPS_FETCH] (state, items) {
    const merged = unionBy(state.repository, items, 'id')
    state.repository = merged
  },

  [GROUPS_LOADING] (state, status) {
    state.loading = status
  },

  [GROUPS_OFFSET] (state, offset) {
    state.offset = offset
  },

  [GROUPS_RELATED_FETCH] (state, { ids, id }) {
    state.related[id] = ids
  },

  [GROUPS_REMOVE] (state) {
    state.repository = []
  }
}

const actions = {
  async fetch ({ commit }, settings) {
    commit(GROUPS_LOADING, 'groups')
    const { data } = await getGroups(settings)
    commit(GROUPS_FETCH, data.records)
    commit(GROUPS_OFFSET, data.offset)
    commit(GROUPS_LOADING, false)
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
  },

  async remove ({ commit }) {
    commit(GROUPS_REMOVE)
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
