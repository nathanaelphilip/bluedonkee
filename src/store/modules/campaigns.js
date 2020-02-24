import { unionBy } from 'lodash'

import { getCampaigns, getCampaign } from '@/api'
import { CAMPAIGNS_FETCH } from '@/store/mutation-types'

const state = {
  repository: []
}

const mutations = {
  [CAMPAIGNS_FETCH] (state, items) {
    const merged = unionBy(state.repository, items, 'id')
    state.repository = merged
  }
}

const actions = {
  async fetch ({ commit }, settings) {
    const { data } = await getCampaigns(settings)
    commit(CAMPAIGNS_FETCH, data.records)
  },

  async get ({ commit }, settings) {
    const { data } = await getCampaigns(settings)
    commit(CAMPAIGNS_FETCH, data.records)
    return data.records[0]
  },

  async getById ({ commit }, id) {
    const { data } = await getCampaign(id)
    commit(CAMPAIGNS_FETCH, [data])
    return data
  }
}

const getters = {
  getById: (state) => (id) => {
    return state.repository.find(job => job.id === id)
  },

  getBySlug: (state) => (slug) => {
    return state.repository.find(job => job.fields.Slug === slug)
  },

  sortAlphabetically: state => {
    return state.repository.sort((a, b) => {
      return a.fields.Name > b.fields.Name ? 1 : -1
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
