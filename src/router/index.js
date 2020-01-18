import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'jobs',
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
    path: '/group/category/:slug',
    name: 'groupCategory',
    component: () => import(/* webpackChunkName: "groupCategory" */ '../views/GroupCategory.vue')
  },
  {
    path: '/job/:slug',
    name: 'job',
    component: () => import(/* webpackChunkName: "job" */ '../views/Job.vue')
  },
  {
    path: '/job/category/:slug',
    name: 'workCategory',
    component: () => import(/* webpackChunkName: "workCategory" */ '../views/WorkCategory.vue')
  },
  {
    path: '/job/level/:slug',
    name: 'workLevel',
    component: () => import(/* webpackChunkName: "workLevel" */ '../views/WorkLevel.vue')
  },
  {
    path: '/job/type/:slug',
    name: 'workType',
    component: () => import(/* webpackChunkName: "workType" */ '../views/WorkType.vue')
  },
  {
    path: '/submit',
    name: 'submit',
    component: () => import(/* webpackChunkName: "submit" */ '../views/Submit.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
