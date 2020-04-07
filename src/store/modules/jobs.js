import { unionBy } from 'lodash'
import Vue from 'vue'

import { getJob, getJobs } from '@/api'
import {
  JOBS_FETCH,
  JOBS_FETCHED,
  JOBS_LOADING,
  JOBS_OFFSET
} from '@/store/mutation-types'

const state = {
  fetched: {},
  loading: false,
  offset: {},
  repository: [],
  promoted: [],
  related: {}
}

const mutations = {
  [JOBS_FETCH] (state, items) {
    const merged = unionBy(items, state.repository, 'id')
    state.repository = merged
  },

  [JOBS_LOADING] (state, status) {
    state.loading = status
  },

  [JOBS_OFFSET] (state, { id, offset }) {
    Vue.set(state.offset, id, offset)
  },

  [JOBS_FETCHED] (state, { id, ids }) {
    const merged = unionBy(state.fetched[id], ids)
    Vue.set(state.fetched, id, merged)
  }
}

const actions = {
  async fetch ({ commit }, { id, ...settings }) {
    commit(JOBS_LOADING, id)
    const { data } = await getJobs(settings)
    const ids = data.records.map(record => record.id)
    commit(JOBS_FETCH, data.records)
    commit(JOBS_FETCHED, { id, ids })
    commit(JOBS_OFFSET, { id, offset: data.offset })
    commit(JOBS_LOADING, false)
  },

  async getById ({ commit }, id) {
    const { data } = await getJob(id)
    const { Status } = data.fields

    if (Status === 'Active' || Status === 'Promoted') {
      commit(JOBS_FETCH, [data])
    }

    return data
  },

  async get ({ commit }, settings) {
    const { data } = await getJobs(settings)
    commit(JOBS_FETCH, data.records)
    return data.records[0]
  }
}

const getters = {
  getById: (state) => (id) => {
    return state.repository.find(job => job.id === id)
  },

  getBySlug: (state) => (slug) => {
    return state.repository.find(job => job.fields.Slug === slug)
  },

  getByEntityAndSlug: (state, getters, rootState) => ({ entity, entityType, slug }) => {
    return state.repository.find(job => {
      const type = job.fields[entityType] ? job.fields[entityType].Slug : ''
      return job.fields.Slug === slug && type === entity
    })
  },

  getFetched: (state, getters) => id => {
    if (typeof (state.fetched[id]) !== 'undefined') {
      const fetched = []

      for (var i = 0; i < state.fetched[id].length; i++) {
        fetched.push(state.repository.find(job => job.id === state.fetched[id][i]))
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
