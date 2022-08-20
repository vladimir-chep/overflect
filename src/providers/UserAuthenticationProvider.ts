import {
  InjectionKey,
  reactive,
  toRefs,
  readonly,
  provide,
  useSlots,
} from 'vue';
import type { User, AuthError } from 'firebase/auth';

export const UserAuthenticationStateSymbol: InjectionKey<UserAuthenticationState> =
  Symbol('UserAuthenticationState');
export const UserAuthenticationUpdateSymbol: InjectionKey<
  (user: User) => void
> = Symbol('UserAuthenticationUpdate');
type UserAuthenticationState = {
  user?: User;
  // isAuthenticated: boolean;
  error?: AuthError;
  skipping: boolean;
  loading: boolean;
};

export default {
  setup() {
    const state = reactive<UserAuthenticationState>({
      user: undefined,
      error: undefined,
      skipping: false,
      loading: false,
    });
    // provide(UserAuthenticationStateSymbol, toRefs(readonly(state)));
    provide(UserAuthenticationStateSymbol, readonly(state));

    // const update = (property: keyof UserAuthenticationState, value: typeof keyof UserAuthenticationState) => {
    //   state[property] = value;
    // };
    // const onManualSignIn = async (payload: {
    //   email: string;
    //   password: string;
    // }) => {
    //   try {
    //     const response = auth.signInWithEmailAndPassword(payload);
    //     console.log('response', response);
    //   } catch (error) {
    //     console.log('error', error);
    //   }
    // };
    const onUserUpdate = (user: User) => {
      state.user = user;
    };
    const onErrorUpdate = (error: AuthError) => {
      state.error = error;
    };
    const onSkippingUpdate = (skipping: boolean) => {
      state.skipping = skipping;
    };
    const onLoadingUpdate = (loading: boolean) => {
      state.loading = loading;
    };
    provide(UserAuthenticationUpdateSymbol, onUserUpdate);

    const slots = useSlots();
    const defaultSlot = slots.default?.();
    return () => defaultSlot;
  },
};
