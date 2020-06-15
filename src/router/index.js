import Vue from 'vue';
import Router from 'vue-router';
import { auth } from '@/firebase/config';
import store from '@/store';

import SignIn from '@/layouts/SignIn.vue';
import Profile from '@/views/Profile.vue';
import Progress from '../views/Progress.vue';
import Chart from '../views/Chart.vue';
import Settings from '../views/Settings.vue';

Vue.use(Router);

const routes = [
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
        component: Profile,
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: '/progress',
        name: 'Progress',
        component: Progress,
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: '/chart',
        name: 'Chart',
        component: Chart,
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: '/settings',
        name: 'Settings',
        component: Settings,
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: '*',
        redirect: '/',
    },
];

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
    const currentUser = auth.currentUser;
    const skipStatus = store.getters['auth/skip'];

    if (requiresAuth && !currentUser && !skipStatus) {
        next('/sign-in');
    } else {
        next();
    }
});

export default router;
