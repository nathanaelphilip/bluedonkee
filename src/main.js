import Vue from 'vue'
import App from './App.vue'
import PortalVue from 'portal-vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

import './scss/global.scss'

Vue.config.productionTip = false
Vue.use(PortalVue)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
