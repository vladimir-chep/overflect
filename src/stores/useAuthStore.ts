import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import type { User, AuthError } from 'firebase/auth';
import { signOut } from 'firebase/auth';
import { paths } from '@/router/routes';
import { router } from '@/router';
import { auth } from '@/firebase/config';

const INIT_STATE = {
  user: undefined,
  error: undefined,
  loading: false,
  skipped: false,
};
type UserAuthenticationState = {
  user?: User;
  error?: AuthError;
  loading: boolean;
  skipped: boolean;
};

export const useAuthStore = defineStore('auth', () => {
  const state = ref<UserAuthenticationState>(INIT_STATE);

  const isAuthenticated = computed(() => {
    return !!state.value.user;
  });

  const onUserUpdate = (user: User) => {
    state.value.user = user;
  };
  const onErrorUpdate = (error?: AuthError) => {
    state.value.error = error;
  };
  const onSignOut = () => {
    signOut(auth)
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        state.value = INIT_STATE;
        router.push(paths.auth);
      });
  };
  const onSkipping = async () => {
    state.value.skipped = true;
    router.push(paths.profile);
  };

  return {
    state,
    isAuthenticated,
    onUserUpdate,
    onErrorUpdate,
    onSignOut,
    onSkipping,
  };
});
