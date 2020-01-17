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
  }
}

const getters = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
