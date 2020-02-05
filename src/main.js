import Vue from 'vue'
import App from './App.vue'
import PortalVue from 'portal-vue'
import VueClipboard from 'vue-clipboard2'
import VueCookies from 'vue-cookies'
import './registerServiceWorker'
import router from './router'
import store from './store'

import './scss/global.scss'

Vue.config.productionTip = false
Vue.use(PortalVue)
Vue.use(VueClipboard)
Vue.use(VueCookies)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
