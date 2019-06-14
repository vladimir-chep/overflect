import Vue from 'vue';
import Router from 'vue-router';
import store from '@/store';
const fb = require('@/firebaseConfig');

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
        meta: {
            requiresAuth: true
        },
        component: Profile,
    },
    {
        path: '/progress',
        name: 'progress',
        meta: {
            requiresAuth: true
        },
        component: Progress,
    },
    {
        path: '/chart',
        name: 'chart',
        meta: {
            requiresAuth: true
        },
        component: Chart,
    },
    {
        path: '/settings',
        name: 'settings',
        meta: {
            requiresAuth: true
        },
        component: Settings,
    },
    {
        path: '/signup',
        name: 'signup',
        component: SignUp
    },
    {
        path: '/signin',
        name: 'signin',
        meta: {
            layout: 'login',
        },
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
    const isAuthenticated = fb.auth.currentUser;
    const skipStatus = store.getters['auth/isSkipped'];

    if (requiresAuth && !isAuthenticated && !skipStatus) {
        next('/signin');
    } else {
        next();
    }
});

export default router;