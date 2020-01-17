import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "jobs" */ '../views/Jobs.vue')
  },

  {
    path: '/groups',
    name: 'groups',
    component: () => import(/* webpackChunkName: "groups" */ '../views/Groups.vue')
  },
  {
    path: '/group/:slug',
    name: 'group',
    component: () => import(/* webpackChunkName: "group" */ '../views/Group.vue')
  },
  {
    path: '/job/:slug',
    name: 'job',
    component: () => import(/* webpackChunkName: "job" */ '../views/Job.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
