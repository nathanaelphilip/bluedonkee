import { getJobs } from '@/api'
import { JOBS_FETCH } from '@/store/mutation-types'

const state = {
  repository: []
}

const mutations = {
  [JOBS_FETCH] (state, items) {
    state.repository = [...state.repository, ...items]
  }
}

const actions = {
  async fetch ({ commit }, settings) {
    const { data } = await getJobs(settings)
    commit(JOBS_FETCH, data.records)
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
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
