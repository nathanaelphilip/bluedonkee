import { getCMSQuestions, getCMSPages } from '@/api'
import { CMS_PAGES_FETCH, CMS_QUESTIONS_FETCH } from '@/store/mutation-types'

const state = {
  questions: [],
  pages: {}
}

const mutations = {
  [CMS_PAGES_FETCH] (state, { key, content }) {
    state.pages[key] = content
  },

  [CMS_QUESTIONS_FETCH] (state, content) {
    state.questions = content
  }
}

const actions = {
  async fetchQuestions ({ commit }) {
    const { data } = await getCMSQuestions()
    commit(CMS_QUESTIONS_FETCH, data.records)
  },

  async fetchPage ({ commit }, key) {
    const { data } = await getCMSPages({
      params: {
        filterByFormula: `{Key} = "${key}"`
      }
    })

    commit(CMS_PAGES_FETCH, { key, content: data.records[0] })
  }
}

const getters = {
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
