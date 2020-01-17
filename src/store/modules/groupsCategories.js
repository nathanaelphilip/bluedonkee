import { getGroupsCategories } from '@/api'
import { GROUPS_CATEGORIES_FETCH } from '@/store/mutation-types'

const state = {
  repository: []
}

const mutations = {
  [GROUPS_CATEGORIES_FETCH] (state, items) {
    state.repository = [...state.repository, ...items]
  }
}

const actions = {
  async fetch ({ commit }) {
    const { data } = getGroupsCategories()
    commit(GROUPS_CATEGORIES_FETCH, data.records)
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
