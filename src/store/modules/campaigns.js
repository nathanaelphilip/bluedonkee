import { unionBy } from 'lodash'
import Vue from 'vue'

import { getCampaigns, getCampaign } from '@/api'
import {
  CAMPAIGNS_FETCH,
  CAMPAIGNS_FETCHED,
  CAMPAIGNS_LOADING,
  CAMPAIGNS_OFFSET,
  CAMPAIGNS_CLEAR
} from '@/store/mutation-types'

const state = {
  loading: false,
  offset: {},
  repository: [],
  fetched: {}
}

const mutations = {
  [CAMPAIGNS_FETCH] (state, items) {
    const merged = unionBy(state.repository, items, 'id')
    state.repository = merged
  },

  [CAMPAIGNS_LOADING] (state, status) {
    state.loading = status
  },

  [CAMPAIGNS_OFFSET] (state, { id, offset }) {
    Vue.set(state.offset, id, offset)
  },

  [CAMPAIGNS_FETCHED] (state, { ids, id }) {
    const merged = unionBy(state.fetched[id], ids)
    Vue.set(state.fetched, id, merged)
  },

  [CAMPAIGNS_CLEAR] (state, id) {
    Vue.delete(state.fetched, id)
  }
}

const actions = {
  async fetch ({ commit }, { id, ...settings }) {
    commit(CAMPAIGNS_LOADING, id)
    const { data } = await getCampaigns(settings)
    const ids = data.records.map(record => record.id)
    commit(CAMPAIGNS_FETCH, data.records)
    commit(CAMPAIGNS_FETCHED, { id, ids })
    commit(CAMPAIGNS_OFFSET, { id, offset: data.offset })
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

  async clear ({ commit }, id) {
    commit(CAMPAIGNS_CLEAR, id)
  }
}

const getters = {
  getById: state => id => {
    return state.repository.find(campaign => campaign.id === id)
  },

  getBySlug: state => slug => {
    return state.repository.find(campaign => campaign.fields.Slug === slug)
  },

  getFetched: (state, getters) => id => {
    if (typeof (state.fetched[id]) !== 'undefined') {
      const fetched = []

      for (var i = 0; i < state.fetched[id].length; i++) {
        fetched.push(state.repository.find(campaign => campaign.id === state.fetched[id][i]))
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
