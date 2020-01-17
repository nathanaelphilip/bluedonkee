import Vue from 'vue'
import Vuex from 'vuex'

import groups from './modules/groups'
import groupCategories from './modules/groupCategories'
import jobs from './modules/jobs'
import workCategories from './modules/workCategories'
import workLevels from './modules/workLevels'
import workTypes from './modules/workTypes'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    groups,
    groupCategories,
    jobs,
    workCategories,
    workLevels,
    workTypes
  }
})
