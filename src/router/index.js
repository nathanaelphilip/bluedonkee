import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import(/* webpackChunkName: "jobs" */ '../views/Container.vue'),
    redirect: '/jobs'
  },
  {
    path: '/jobs',
    component: () => import(/* webpackChunkName: "jobs" */ '../views/Container.vue'),
    children: [{
      path: '',
      name: 'jobs',
      component: () => import(/* webpackChunkName: "jobs" */ '../views/Jobs.vue')
    },
    {
      path: 'remote',
      name: 'workRemote',
      component: () => import(/* webpackChunkName: "remote" */ '../views/WorkRemote.vue')
    },
    {
      path: ':slug',
      name: 'job',
      component: () => import(/* webpackChunkName: "job" */ '../views/Job.vue')
    },
    {
      path: 'category/:slug',
      name: 'workCategory',
      component: () => import(/* webpackChunkName: "workCategory" */ '../views/WorkCategory.vue')
    },
    {
      path: 'level/:slug',
      name: 'workLevel',
      component: () => import(/* webpackChunkName: "workLevel" */ '../views/WorkLevel.vue')
    },
    {
      path: 'type/:slug',
      name: 'workType',
      component: () => import(/* webpackChunkName: "workType" */ '../views/WorkType.vue')
    },
    {
      path: 'locations/:slug',
      name: 'locationJob',
      component: () => import(/* webpackChunkName: "locationJobs" */ '../views/LocationJobs.vue')
    }]
  },
  {
    path: '/campaigns',
    component: () => import(/* webpackChunkName: "jobs" */ '../views/Container.vue'),
    children: [{
      path: '',
      name: 'campaigns',
      component: () => import(/* webpackChunkName: "campaigns" */ '../views/Campaigns.vue')
    },
    {
      path: ':slug',
      name: 'campaign',
      component: () => import(/* webpackChunkName: "campaign" */ '../views/Campaign.vue')
    },
    {
      path: 'office/:slug',
      name: 'office',
      component: () => import(/* webpackChunkName: "offices" */ '../views/Offices.vue')
    },
    {
      path: 'locations/:slug',
      name: 'locationCampaign',
      component: () => import(/* webpackChunkName: "locationCampaigns" */ '../views/LocationCampaigns.vue')
    }]
  },
  {
    path: '/groups',
    component: () => import(/* webpackChunkName: "jobs" */ '../views/Container.vue'),
    children: [
      {
        path: '',
        name: 'groups',
        component: () => import(/* webpackChunkName: "groups" */ '../views/Groups.vue')
      },
      {
        path: ':slug',
        name: 'group',
        component: () => import(/* webpackChunkName: "group" */ '../views/Group.vue')
      },
      {
        path: 'category/:slug',
        name: 'groupCategory',
        component: () => import(/* webpackChunkName: "groupCategory" */ '../views/GroupCategory.vue')
      },
      {
        path: 'locations/:slug',
        name: 'locationGroup',
        component: () => import(/* webpackChunkName: "locationGroups" */ '../views/LocationGroups.vue')
      }
    ]
  },
  {
    path: '/post/job',
    name: 'postJob',
    component: () => import(/* webpackChunkName: "submit" */ '../views/PostJob.vue'),
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
  routes,
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})

export default router
