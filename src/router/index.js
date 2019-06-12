import Vue from 'vue';
import Router from 'vue-router';
import firebase from 'firebase';

import Profile from '@/views/Profile.vue';
import Progress from '@/views/Progress.vue';
import Chart from '@/views/Chart.vue';
import Settings from '@/views/Settings.vue';

import SignUp from '@/components/Signup.vue';
import SignIn from '@/components/Signin.vue';
import NotFound from '@/components/NotFound.vue';

import Firebase from '@/views/Firebase.vue';

const routes = [{
        path: '/',
        redirect: '/profile',
    },
    {
        path: '/profile',
        name: 'profile',
        component: Profile,
        meta: {
            requiresAuth: true
        },
    },
    {
        path: '/about',
        name: 'about',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import( /* webpackChunkName: "about" */ '@/views/About.vue')
    },
    {
        path: '/progress',
        name: 'progress',
        component: Progress,
        meta: {
            requiresAuth: true
        },
    },
    {
        path: '/chart',
        name: 'chart',
        component: Chart,
        meta: {
            requiresAuth: true
        },
    },
    {
        path: '/settings',
        name: 'settings',
        component: Settings,
        meta: {
            requiresAuth: true
        },
    },
    {
        path: '/signup',
        name: 'signup',
        component: SignUp
    },
    {
        path: '/signin',
        name: 'signin',
        component: SignIn
    },
    {
      path: '/firebase',
      name: 'firebase',
      component: Firebase
  },
    {
        path: '*',
        component: NotFound
    },
];

Vue.use(Router);

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    const isAuthenticated = firebase.auth().currentUser;
    if (requiresAuth && !isAuthenticated) {
        next('/signin');
    } else {
        next();
    }
});

export default router;