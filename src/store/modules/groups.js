import { unionBy } from 'lodash'
import Vue from 'vue'

import { getGroups, getGroup } from '@/api'
import {
  GROUPS_FETCH,
  GROUPS_FETCHED,
  GROUPS_LOADING,
  GROUPS_OFFSET,
  GROUPS_REMOVE
} from '@/store/mutation-types'

const state = {
  loading: false,
  offset: {},
  repository: [],
  fetched: {}
}

const mutations = {
  [GROUPS_FETCH] (state, items) {
    const merged = unionBy(state.repository, items, 'id')
    state.repository = merged
  },

  [GROUPS_FETCHED] (state, { ids, id }) {
    const merged = unionBy(state.fetched[id], ids)
    Vue.set(state.fetched, id, merged)
  },

  [GROUPS_LOADING] (state, status) {
    state.loading = status
  },

  [GROUPS_OFFSET] (state, { id, offset }) {
    Vue.set(state.offset, id, offset)
  },

  [GROUPS_REMOVE] (state) {
    state.repository = []
  }
}

const actions = {
  async fetch ({ commit }, { id, ...settings }) {
    commit(GROUPS_LOADING, id)
    const { data } = await getGroups(settings)
    const ids = data.records.map(record => record.id)
    commit(GROUPS_FETCH, data.records)
    commit(GROUPS_FETCHED, { id, ids })
    commit(GROUPS_OFFSET, { id, offset: data.offset })
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

  async remove ({ commit }) {
    commit(GROUPS_REMOVE)
  }
}

const getters = {
  getById: (state) => (id) => {
    return state.repository.find(group => group.id === id)
  },

  getBySlug: (state) => (slug) => {
    return state.repository.find(group => group.fields.Slug === slug)
  },

  getFetched: state => id => {
    if (typeof (state.fetched[id]) !== 'undefined') {
      return state.repository.filter(group => {
        return state.fetched[id].includes(group.id)
      })
    }

    if (typeof (state.fetched[id]) === 'undefined') {
      return []
    }
  },

  getOffset: state => id => {
    if (typeof (state.offset[id]) !== 'undefined') {
      return state.offset[id]
    }

    if (typeof (state.offset[id]) === 'undefined') {
      return ''
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
