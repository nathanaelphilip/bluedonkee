import Vue from 'vue'
import VueMQ from 'vue-mq'
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
Vue.use(VueMQ, {
  breakpoints: {
    xsmall: 415,
    small: 769,
    medium: 1101,
    large: 1198,
    xlarge: 1379
  }
})

new Vue({
  router,
  store,
  render: h => h(App),
  mounted: () => document.dispatchEvent(new Event('x-app-rendered'))
}).$mount('#app')
