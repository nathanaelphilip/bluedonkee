import { unionBy } from 'lodash'

import { getJob, getJobs } from '@/api'
import { JOBS_FETCH } from '@/store/mutation-types'

const state = {
  repository: []
}

const mutations = {
  [JOBS_FETCH] (state, items) {
    const merged = unionBy(state.repository, items, 'id')
    state.repository = merged
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
      return a.fields.Created > b.fields.Created ? 1 : -1
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
