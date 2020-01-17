import { getGroups } from '@/api'
import { GROUPS_FETCH } from '@/store/mutation-types'

const state = {
  repository: []
}

const mutations = {
  [GROUPS_FETCH] (state, items) {
    state.repository = [...state.repository, ...items]
  }
}

const actions = {
  async fetch ({ commit }, settings) {
    const { data } = await getGroups(settings)
    commit(GROUPS_FETCH, data.records)
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
