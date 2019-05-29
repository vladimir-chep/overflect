import Vue from 'vue';
import Router from 'vue-router';

import Profile from './views/Profile.vue';
import Progress from './views/Progress.vue';
import Chart from './views/Chart.vue';
import Settings from './views/Settings.vue';

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'profile',
      component: Profile
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/progress',
      name: 'progress',
      component: Progress
    },
    {
      path: '/chart',
      name: 'chart',
      component: Chart
    },
    {
      path: '/settings',
      name: 'settings',
      component: Settings
    }
  ]
})