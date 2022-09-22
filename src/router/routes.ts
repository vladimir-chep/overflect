import { RouteRecordRaw } from 'vue-router';
import AuthenticationView from '@/views/AuthenticationView.vue';
import ProfileView from '@/views/ProfileView.vue';
// import SignIn from '@/layouts/SignIn.vue';
// import LayoutAuth from '@/layouts/LayoutAuth.vue';
export const paths = {
  default: '/',
  auth: '/auth',
  profile: '/profile',
} as const;

export const routes: RouteRecordRaw[] = [
  // TODO: look at this redirect one more time
  {
    path: paths.default,
    redirect: {
      name: 'Profile',
    },
  },
  {
    path: paths.auth,
    name: 'AuthenticationView',
    meta: {
      // layout: 'LayoutAuth',
      layout: 'auth',
    },
    component: AuthenticationView,
  },
  {
    path: paths.profile,
    name: 'Profile',
    component: ProfileView,
    meta: {
      requiresAuth: true,
    },
  },
];
