import Vue from 'vue'
import Vuex from 'vuex'

import campaigns from './modules/campaigns'
import cms from './modules/cms'
import groups from './modules/groups'
import groupCategories from './modules/groupCategories'
import jobs from './modules/jobs'
import locations from './modules/locations'
import offices from './modules/offices'
import states from './modules/states'
import workCategories from './modules/workCategories'
import workLevels from './modules/workLevels'
import workTypes from './modules/workTypes'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    campaigns,
    cms,
    groups,
    groupCategories,
    jobs,
    locations,
    offices,
    states,
    workCategories,
    workLevels,
    workTypes
  }
})
