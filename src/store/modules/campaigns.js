import { unionBy } from 'lodash'

import { getCampaigns, getCampaign } from '@/api'
import {
  CAMPAIGNS_FETCH,
  CAMPAIGNS_LOADING,
  CAMPAIGNS_OFFSET,
  CAMPAIGNS_RELATED_FETCH
} from '@/store/mutation-types'

const state = {
  loading: false,
  offset: '',
  repository: [],
  related: {}
}

const mutations = {
  [CAMPAIGNS_FETCH] (state, items) {
    const merged = unionBy(state.repository, items, 'id')
    state.repository = merged
  },

  [CAMPAIGNS_LOADING] (state, status) {
    state.loading = status
  },

  [CAMPAIGNS_OFFSET] (state, offset) {
    state.offset = offset
  },

  [CAMPAIGNS_RELATED_FETCH] (state, { ids, id }) {
    state.related[id] = ids
  }
}

const actions = {
  async fetch ({ commit }, settings) {
    commit(CAMPAIGNS_LOADING, 'campaigns')
    const { data } = await getCampaigns(settings)
    commit(CAMPAIGNS_FETCH, data.records)
    commit(CAMPAIGNS_OFFSET, data.offset)
    commit(CAMPAIGNS_LOADING, false)
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
  },

  async fetchRelated ({ commit }, { params, id }) {
    const { data } = await getCampaigns({ params })
    const ids = data.records.map(record => record.id)
    commit(CAMPAIGNS_FETCH, data.records)
    commit(CAMPAIGNS_RELATED_FETCH, { id, ids })
    return ids
  }
}

const getters = {
  getById: (state) => (id) => {
    return state.repository.find(campaign => campaign.id === id)
  },

  getBySlug: (state) => (slug) => {
    return state.repository.find(campaign => campaign.fields.Slug === slug)
  },

  sortAlphabetically: state => {
    return state.repository.sort((a, b) => {
      return a.fields.Name > b.fields.Name ? 1 : -1
    })
  },

  getRelated: state => id => {
    if (state.related[id]) {
      return state.repository.filter(campaign => {
        return state.related[id].includes(campaign.id)
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
