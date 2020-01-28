import Vue from 'vue'
import Vuex from 'vuex'

import groups from './modules/groups'
import groupCategories from './modules/groupCategories'
import jobs from './modules/jobs'
import locations from './modules/locations'
import states from './modules/states'
import workCategories from './modules/workCategories'
import workLevels from './modules/workLevels'
import workTypes from './modules/workTypes'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    groups,
    groupCategories,
    jobs,
    locations,
    states,
    workCategories,
    workLevels,
    workTypes
  }
})
