import { getCMSQuestions } from '@/api'
import { CMS_QUESTIONS_FETCH } from '@/store/mutation-types'

const state = {
  questions: []
}

const mutations = {
  [CMS_QUESTIONS_FETCH] (state, content) {
    state.questions = content
  }
}

const actions = {
  async fetch ({ commit }) {
    const { data } = await getCMSQuestions()
    commit(CMS_QUESTIONS_FETCH, data.records)
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
