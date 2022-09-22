<template>
  <div class="verification">
    <button type="submit" class="verification__back" @click.prevent="prevSlide">
      <img src="@/assets/images/icon/ArrowBack.svg" alt="Back" />
    </button>

    <div class="description">
      <h2 class="description__title">Sign In</h2>
      <p class="description__text">
        Enter your email and password to get access to edit mode
      </p>
    </div>
    <form class="form">
      <p class="form__title">Email</p>
      <input
        class="form__inputField"
        :class="{ error: isAlerted }"
        placeholder="Insert email here..."
        type="email"
        id="email"
        v-model="email"
      />
      <p class="form__title">Password</p>
      <input
        class="form__inputField"
        :class="{ error: isAlerted }"
        placeholder="Insert password here..."
        type="password"
        id="password"
        v-model="password"
      />
      <transition name="error" mode="out-in">
        <p v-if="isAlerted" class="form__error">
          {{ authState.error }}
        </p>
      </transition>

      <button
        type="submit"
        class="form__submit"
        @click.prevent="onSubmit"
        :disabled="disabled"
      >
        <SpinnerLoading v-if="loading" />
        <span v-else>Check it</span>
      </button>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { reactive, computed, watch, toRefs, defineEmits } from 'vue';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { auth } from '@/firebase/config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useAuthStore } from '@/stores';
import { paths } from '@/router/routes';
import SpinnerLoading from '@/components/Symbols/SpinnerLoading.vue';

const router = useRouter();
const authStore = useAuthStore();
const { state: authState } = storeToRefs(authStore);
const { onUserUpdate, onErrorUpdate } = authStore;

const emit = defineEmits<{
  (e: 'prev'): void;
}>();

type State = {
  email: string;
  password: string;
  loading: boolean;
  isAlerted: boolean;
};
const state = reactive<State>({
  email: '',
  password: '',
  isAlerted: false,
  loading: false,
});
const disabled = computed(() => {
  const isEmpty = state.email === '' || state.password === '';
  return isEmpty || state.loading;
});

watch(
  () => authState.value.error,
  (newVal) => {
    if (newVal) {
      state.isAlerted = true;
    }
  }
);
watch(
  () => state.isAlerted,
  (newVal) => {
    if (!newVal) onErrorUpdate(undefined);
  }
);

const prevSlide = () => {
  emit('prev');
};

const onSubmit = async () => {
  state.loading = true;
  await signInWithEmailAndPassword(auth, state.email, state.password)
    .then(({ user }) => {
      onUserUpdate(user);
      onErrorUpdate(undefined);
      router.push(paths.profile);
    })
    .catch((error) => {
      onErrorUpdate(error);
    })
    .finally(() => {
      state.loading = false;
    });
};
const { email, password, isAlerted, loading } = toRefs(state);
</script>

<style lang="scss" scoped>
@import '~@/styles/config/variables';
@import '~@/styles/config/mixin';

.verification {
  &__back {
    @include transition-default;
    display: flex;
    width: 32px;
    height: 32px;
    justify-content: center;
    align-items: center;
    padding: 6px;
    transition-duration: 0.15s;
    background: none;
    border: none;

    &:hover {
      background-color: rgba(#fff, 0.15);
    }

    img {
      width: 11px;
      height: 18px;
    }
  }
}

.description {
  margin: 3rem auto;
  text-align: center;

  &__title {
    margin-bottom: 2rem;
    font-weight: bold;
    font-size: 3rem;
  }

  &__text {
    line-height: 1.75;
    font-size: 1.6rem;

    a {
      color: #fff;

      &:hover {
        color: #fff;
      }
    }
  }
}

.form {
  width: 100%;
  max-width: 476px;
  margin: 0 auto auto;
  padding: $padding-card;
  border-radius: $border-radius;
  box-shadow: $shadow-card;
  background: #fff;

  &__title {
    margin-bottom: 0.3rem;
    color: $theme-color;
    font-weight: bold;
  }

  &__inputField {
    @include transition-default;
    display: block;
    width: 100%;
    height: 46px;
    line-height: 1;
    margin-bottom: 2rem;
    padding: 0 20px;
    border-width: 0;
    border-radius: $border-radius;
    box-shadow: inset 0 0 0 1px #f1f1f1;
    color: #5f5f5f;
    background-color: #f1f1f1;
    font-size: 1.6rem;
    text-align: center;
    transition-duration: 0.08s;
    outline-style: none;

    -webkit-appearance: none;
    appearance: none;

    &.error {
      box-shadow: inset 0 0 0 1px $error-color;
      color: $error-color;
    }

    &:hover {
      box-shadow: inset 0 0 0 1px $theme-color;
    }

    &:focus {
      box-shadow: inset 0 0 0 1px $theme-color;
      background-color: #fff;
    }
  }

  &__error {
    margin-bottom: 2rem;
    color: $error-color;
    font-weight: bold;
    text-align: center;
    transition: $transition-default;
    transition-timing-function: ease-in-out;
  }

  &__submit {
    @include transition-default;
    display: block;
    width: 100%;
    padding: $spacing-x;
    border: none;
    border-radius: $border-radius;
    color: #fff;
    background: $theme-color;
    font-weight: bold;
    font-size: 1.8rem;
    cursor: pointer;

    &:hover {
      background: darken($theme-color, 0.15);
    }

    &:disabled {
      border-color: transparent;
      background: lighten($theme-color, 30%);
    }
  }
}

.error {
  &-enter-active,
  &-leave-active {
    will-change: transform;
    transition: $transition-default;
    transition-timing-function: ease-in-out;
  }

  &-enter-from {
    opacity: 0;
    transform: translate3d(0, 100%, 0);
  }

  &-leave-active {
    opacity: 0;
    transform: translate3d(0, -100%, 0);
  }
}
</style>
