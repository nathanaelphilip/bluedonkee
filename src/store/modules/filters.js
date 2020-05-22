import hash from 'object-hash'

import {
  FILTERS_ACCEPT,
  FILTERS_CLEAR
} from '@/store/mutation-types'

const state = {
  accepted: {
    categories: [],
    locations: [],
    types: [],
    remote: false
  }
}

const mutations = {
  [FILTERS_ACCEPT] (state, { key, value }) {
    state.accepted[key] = value
  },

  [FILTERS_CLEAR] (state) {
    state.accepted = {
      categories: [],
      locations: [],
      types: []
    }
  }
}

const actions = {
  async accept ({ commit }, { key, value }) {
    commit(FILTERS_ACCEPT, { key, value })
  },

  async clear ({ commit }) {
    commit(FILTERS_CLEAR)
  }
}

const getters = {
  accepted: state => key => {
    return state.accepted[key]
  },

  count: state => {
    let count = 0
    const values = Object.values(state.accepted)

    values.map(array => {
      count += array.length ? 1 : 0
    })

    return count
  },

  filtered: state => {
    return state.accepted.categories.length || state.accepted.locations.length || state.accepted.types.length
  },

  filter: (state, getters, rootState) => {
    const categories = []
    const cities = []
    const types = []
    const filters = ['OR({Status} = \'Active\', {Status} = \'Promoted\')']

    if (state.accepted.categories.length) {
      for (let i = 0; i < state.accepted.categories.length; i++) {
        categories.push(`{Work Categories} = '${state.accepted.categories[i]}'`)
      }

      filters.push(`OR(${categories.join(',')})`)
    }

    if (state.accepted.locations.length) {
      const filtered = rootState.locations.repository.filter(location => {
        const stateId = location.fields.State || false
        return stateId ? state.accepted.locations.includes(stateId[0]) : false
      })

      for (let j = 0; j < filtered.length; j++) {
        const state = rootState.states.repository.find(state => {
          return state.id === filtered[j].fields.State[0]
        })

        cities.push(`FIND('${state.fields.Name}', {Location})`)
      }

      filters.push(`OR(${cities.join(',')})`)
    }

    if (state.accepted.types.length) {
      for (let k = 0; k < state.accepted.types.length; k++) {
        types.push(`{Work Types} = '${state.accepted.types[k]}'`)
      }

      filters.push(`OR(${types.join(',')})`)
    }

    return `AND(${filters.join(',')})`
  },

  key: state => {
    return hash(state.accepted)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
