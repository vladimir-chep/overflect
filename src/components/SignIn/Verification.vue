<template>
  <div>
    <a class="slideBack" @click.prevent="backSlide">
      <img src="@/assets/images/icon/ArrowBack.svg" alt="" />
    </a>
    <div class="verification">
      <h2 class="verification__ttl">Sign In</h2>
      <p class="verification__txt">
        Enter your email and password to get access to edit mode
      </p>
    </div>
    <form class="verificationForm">
      <p class="verificationForm__inputTtl">Email</p>
      <input
        class="verificationForm__input"
        :class="{ error: alert }"
        placeholder="Insert email here..."
        type="email"
        id="email"
        v-model="email"
      />
      <p class="verificationForm__inputTtl">Password</p>
      <input
        class="verificationForm__input"
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
        class="verificationForm__btn"
        @click.prevent="signIn"
        :disabled="disabled"
      >
        <SpinnerLoading v-if="loading" />
        <span v-else>Check it</span>
      </button>
    </form>
  </div>
</template>

<script>
// import { mapState, mapGetters } from 'vuex';
import SpinnerLoading from '@/components/Symbols/SpinnerLoading.vue';

export default {
  name: 'SignInVerification',
  components: {
    SpinnerLoading,
  },
  data() {
    return {
      email: '',
      password: '',
      alert: false,
    };
  },
  computed: {
    // ...mapState('auth', ['loading', 'error']),
    // ...mapGetters('auth', ['isAuthenticated']),
    error() {
      return this.$store.state['auth'].error;
    },
    disabled() {
      const isEmpty = this.email === '' || this.password === '';

      if ((isEmpty && !this.loading) || this.loading) return true;
      return false;
    },
  },
  watch: {
    error(value) {
      if (value) this.alert = true;
    },
    alert(value) {
      if (!value) this.$store.commit('auth/setError', null);
    },
  },
  methods: {
    backSlide() {
      this.$emit('slide', true);
    },
    signIn() {
      this.$store.dispatch('auth/manualSignIn', {
        email: this.email,
        password: this.password,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/styles/setup/variables';

@import '~@/styles/setup/mixin';

.slideBack {
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

.verification {
  margin: 3rem auto;
  text-align: center;

  &__ttl {
    margin-bottom: 2rem;
    font-weight: bold;
    font-size: 3rem;
  }

  &__txt {
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

.verificationForm {
  width: 100%;
  max-width: 476px;
  margin: 0 auto auto;
  padding: $padding-card;
  border-radius: $border-radius;
  box-shadow: $shadow-card;
  background: #fff;

  &__inputTtl {
    margin-bottom: 0.3rem;
    color: $theme-color;
    font-weight: bold;
  }

  &__input {
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

  &__btn {
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
