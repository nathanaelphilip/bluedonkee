import Vue from 'vue'
import Vuex from 'vuex'

import groups from './modules/groups'
import groupsCategories from './modules/groupsCategories'
import jobs from './modules/jobs'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    groups,
    groupsCategories,
    jobs
  }
})
