import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import SignIn from '@/layouts/SignIn.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: {
      name: 'Profile',
    },
  },
  {
    path: '/sign-in',
    name: 'SignIn',
    meta: {
      layout: 'SignIn',
    },
    component: SignIn,
  },
  {
    path: '/profile',
    name: 'Profile',
    component: HomeView,
    meta: {
      requiresAuth: true,
    },
  },

  // {
  //   path: '/',
  //   name: 'home',
  //   component: HomeView,
  // },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
  // },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  // const currentUser = auth.currentUser;
  // const skipStatus = store.getters['auth/skip'];

  // if (requiresAuth && !currentUser && !skipStatus) {
  if (requiresAuth) {
    next('/sign-in');
  } else {
    next();
  }
});
export default router;
