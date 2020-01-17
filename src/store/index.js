import Vue from 'vue'
import Vuex from 'vuex'

import groupsCategories from './modules/groupsCategories'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    groupsCategories
  }
})
