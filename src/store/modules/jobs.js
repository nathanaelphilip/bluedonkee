import { unionBy } from 'lodash'

import { getJob, getJobs } from '@/api'
import {
  JOBS_FETCH,
  JOBS_PROMOTED_FETCH,
  JOBS_RELATED_FETCH
} from '@/store/mutation-types'

const state = {
  repository: [],
  promoted: [], // ids of promoted jobs
  related: {} // prefix: 'job/{id}', 'group/{id}' – returns array of ids
}

const mutations = {
  [JOBS_FETCH] (state, items) {
    const merged = unionBy(state.repository, items, 'id')
    state.repository = merged
  },

  [JOBS_PROMOTED_FETCH] (state, ids) {
    state.promoted = ids
  },

  [JOBS_RELATED_FETCH] (states, { ids, id }) {
    state.related[id] = ids
  }
}

const actions = {
  async fetch ({ commit }, settings) {
    const { data } = await getJobs(settings)
    commit(JOBS_FETCH, data.records)
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
  },

  async fetchPromoted ({ commit }, settings) {
    const { data } = await getJobs(settings)
    const ids = data.records.map(record => record.id)
    commit(JOBS_FETCH, data.records)
    commit(JOBS_PROMOTED_FETCH, ids)
    return ids
  },

  async fetchRelated ({ commit }, { params, id }) {
    const { data } = await getJobs({ params })
    const ids = data.records.map(record => record.id)
    commit(JOBS_FETCH, data.records)
    commit(JOBS_RELATED_FETCH, { id, ids })
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

  sortByDate: state => {
    return state.repository.sort((a, b) => {
      return a.fields.Created < b.fields.Created ? 1 : -1
    })
  },

  getPromoted: (state) => {
    return state.repository.filter(job => {
      return state.promoted.includes(job.id)
    })
  },

  getRelated: state => id => {
    if (state.related[id]) {
      return state.repository.filter(job => {
        return state.related[id].includes(job.id)
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
