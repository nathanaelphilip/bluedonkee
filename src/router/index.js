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
    path: '/locations/groups/:slug',
    name: 'locationGroup',
    component: () => import(/* webpackChunkName: "locationGroups" */ '../views/LocationGroups.vue')
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
    path: '/locations/jobs/:slug',
    name: 'locationJob',
    component: () => import(/* webpackChunkName: "locationJobs" */ '../views/LocationJobs.vue')
  },
  {
    path: '/submit',
    name: 'submit',
    component: () => import(/* webpackChunkName: "submit" */ '../views/Submit.vue'),
    meta: { layout: 'basic' }
  },
  {
    path: '/questions',
    name: 'questions',
    component: () => import(/* webpackChunkName: "questions" */ '../views/Questions.vue'),
    meta: { layout: 'basic' }
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
