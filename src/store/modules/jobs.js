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
    const merged = unionBy(state.repository, items, 'id')
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
    commit(JOBS_FETCH, [data])
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

  getFetched: state => id => {
    if (typeof (state.fetched[id]) !== 'undefined') {
      return state.repository.filter(job => {
        return state.fetched[id].includes(job.id)
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
