import Vue from 'vue'
import Vuex from 'vuex'

import app from './modules/app'
import breadcrumbs from './modules/breadcrumbs'
import campaigns from './modules/campaigns'
import cms from './modules/cms'
import filters from './modules/filters'
import groups from './modules/groups'
import groupCategories from './modules/groupCategories'
import jobs from './modules/jobs'
import locations from './modules/locations'
import offices from './modules/offices'
import search from './modules/search'
import states from './modules/states'
import workCategories from './modules/workCategories'
import workLevels from './modules/workLevels'
import workTypes from './modules/workTypes'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    breadcrumbs,
    campaigns,
    cms,
    filters,
    groups,
    groupCategories,
    jobs,
    locations,
    offices,
    search,
    states,
    workCategories,
    workLevels,
    workTypes
  }
})
