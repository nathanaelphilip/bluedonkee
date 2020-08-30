import Vue from 'vue'
import VueMQ from 'vue-mq'
import App from './App.vue'
import PortalVue from 'portal-vue'
import VueClipboard from 'vue-clipboard2'
import VueCookies from 'vue-cookies'
import VueMeta from 'vue-meta'
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
    xxsmall: 380,
    xsmall: 415,
    small: 769,
    medium: 1101,
    large: 1198,
    xlarge: 1379
  }
})
Vue.use(VueMeta)

Vue.directive('click-outside', {
  bind: function (el, binding, vnode) {
    el.clickOutsideEvent = function (event) {
      // here I check that click was outside the el and his childrens
      if (!(el === event.target || el.contains(event.target))) {
        // and if it did, call method provided in attribute value
        vnode.context[binding.expression](event)
      }
    }
    document.body.addEventListener('click', el.clickOutsideEvent)
  },

  unbind: function (el) {
    document.body.removeEventListener('click', el.clickOutsideEvent)
  }
})

new Vue({
  router,
  store,
  render: h => h(App),
  mounted: () => document.dispatchEvent(new Event('x-app-rendered'))
}).$mount('#app')
