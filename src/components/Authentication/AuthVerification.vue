<template>
  <div class="verification">
    <a href="" class="verification__back" @click.prevent="prevSlide">
      <img src="@/assets/images/icon/ArrowBack.svg" alt="" />
    </a>
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
        :class="{ error: alert }"
        placeholder="Insert email here..."
        type="email"
        id="email"
        v-model="email"
      />
      <p class="form__title">Password</p>
      <input
        class="form__inputField"
        :class="{ error: alert }"
        placeholder="Insert password here..."
        type="password"
        id="password"
        v-model="password"
      />
      <transition name="error" mode="out-in">
        <p v-if="alert" class="verificationForm__error">
          {{ error }}
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
// import { mapState, mapGetters } from 'vuex';
import { ref, reactive, computed, watch, toRefs, defineEmits } from 'vue';
import SpinnerLoading from '@/components/Symbols/SpinnerLoading.vue';

const emit = defineEmits<{
  (e: 'prev'): void;
}>();

const state = reactive<{
  email: string;
  password: string;
  loading: boolean;
  alert: boolean;
  error: string;
  isAuthenticated: boolean;
}>({
  email: '',
  password: '',
  alert: false,
  // ...mapState('auth', ['loading', 'error']),
  // ...mapGetters('auth', ['isAuthenticated']),
  loading: false,
  error: '',
  isAuthenticated: false,
  // =========================================================
});
const disabled = computed(() => {
  const isEmpty = state.email === '' || state.password === '';
  // if ((isEmpty && !this.loading) || this.loading) return true;
  return false;
});

watch(
  () => state.error,
  (newVal) => {
    if (newVal) {
      // if (value) this.alert = true;
    }
  }
);
watch(
  () => state.alert,
  (newVal) => {
    // if (!value) this.$store.commit('auth/setError', null);
  }
);

const prevSlide = () => {
  emit('prev');
};
const onSubmit = () => {
  // this.$store.dispatch('auth/manualSignIn', {
  //   email: this.email,
  //   password: this.password,
  // });
};
const { email, password, alert, error, loading } = toRefs(state);
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
    border-radius: 50%;
    transition-duration: 0.15s;
    cursor: pointer;

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
    color: #c4c4c4;
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

.error-enter-active,
.error-leave-active {
  will-change: transform;
  transition: $transition-default;
  transition-timing-function: ease-in-out;
}

.error-enter {
  opacity: 0;
  transform: translate3d(0, 100%, 0);
}

.error-leave-active {
  opacity: 0;
  transform: translate3d(0, -100%, 0);
}
</style>
