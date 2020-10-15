import hash from 'object-hash'
import { uniq } from 'lodash'

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
      types: [],
      remote: false
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
    return state.accepted.categories.length || state.accepted.locations.length || state.accepted.types.length || state.accepted.remote === true
  },

  filter: (state, getters, rootState) => {
    const categories = []
    const states = []
    const types = []
    const filters = ['OR({Status} = \'Active\', {Status} = \'Promoted\')']

    if (state.accepted.categories.length) {
      for (let i = 0; i < state.accepted.categories.length; i++) {
        categories.push(`FIND('${state.accepted.categories[i]}', {Work Categories})`)
      }

      filters.push(`OR(${categories.join(',')})`)
    }

    if (state.accepted.locations.length) {
      let hasDC = false

      const filtered = rootState.locations.repository.filter(location => {
        const stateId = location.fields.State || false
        return stateId ? state.accepted.locations.includes(stateId[0]) : false
      })

      for (let j = 0; j < filtered.length; j++) {
        const state = rootState.states.repository.find(state => {
          return state.id === filtered[j].fields.State[0]
        })

        if (state.fields.Name === 'District of Columbia') {
          hasDC = true
        }

        states.push(`FIND('${state.fields.Name}', {Location})`)
      }

      const uniqued = uniq(states)

      if (!hasDC) {
        filters.push(`AND(NOT(FIND('District of Columbia', {Location})), OR(${uniqued.join(',')}))`)
      } else {
        filters.push(`OR(${uniqued.join(',')})`)
      }
    }

    if (state.accepted.types.length) {
      for (let k = 0; k < state.accepted.types.length; k++) {
        types.push(`{Work Types} = '${state.accepted.types[k]}'`)
      }

      filters.push(`OR(${types.join(',')})`)
    }

    if (state.accepted.remote) {
      filters.push('OR({Remote} = 1)')
    }

    return `AND(${filters.join(',')})`
  },

  key: state => {
    return `${hash(state.accepted)}-${state.accepted.remote ? 'remote' : 'noremote'}`
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
