import { unionBy } from 'lodash'
import Vue from 'vue'

import { getGroups, getGroup } from '@/api'
import {
  GROUPS_FETCH,
  GROUPS_FETCHED,
  GROUPS_LOADING,
  GROUPS_OFFSET,
  GROUPS_REMOVE,
  GROUPS_CLEAR
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
  },

  [GROUPS_CLEAR] (state, id) {
    Vue.delete(state.fetched, id)
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
  },

  async clear ({ commit }, id) {
    commit(GROUPS_CLEAR, id)
  }
}

const getters = {
  getById: state => id => {
    return state.repository.find(group => group.id === id)
  },

  getBySlug: state => slug => {
    return state.repository.find(group => group.fields.Slug === slug)
  },

  getFetched: (state, getters) => id => {
    if (typeof (state.fetched[id]) !== 'undefined') {
      const fetched = []

      for (var i = 0; i < state.fetched[id].length; i++) {
        fetched.push(state.repository.find(group => group.id === state.fetched[id][i]))
      }

      return fetched
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
