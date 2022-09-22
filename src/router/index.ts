import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/stores';
import { auth } from '@/firebase/config';

import { routes, paths } from './routes';

export const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const { currentUser } = auth;
  // const skipStatus = store.getters['auth/skip'];
  const isWithoutAuth = authStore.state.skipped;
  console.log(
    'BeforeEach Cond',
    {
      one: requiresAuth,
      two: !currentUser,
      three: !isWithoutAuth,
    },
    {
      requiresAuth,
      currentUser,
      isWithoutAuth,
    }
  );

  if (requiresAuth && !currentUser && !isWithoutAuth) {
    console.log('BeforeEach: Auth needed!');

    next(paths.auth);
  } else {
    console.log('BeforeEach: OK');
    next();
  }
});
export default router;
