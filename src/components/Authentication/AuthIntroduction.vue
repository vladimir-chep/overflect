<template>
  <div class="introduction">
    <div class="introduction__preview">
      <h1 class="introduction__preview__title">OverFlect</h1>
      <p class="introduction__preview__text">
        OverFlect is a tool for monitoring your individual performance in
        <a
          href="https://playoverwatch.com/"
          target="_blank"
          rel="noopener nofollow"
          >Overwatch</a
        >`s competitive mode
      </p>
    </div>
    <div class="introduction__control">
      <button
        type="button"
        class="introduction__control__connect"
        @click.prevent="onNextSlide"
      >
        Connect
      </button>
      <a href="#" class="introduction__control__skip" @click.prevent="onSkip"
        >Watch without sign in</a
      >
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineEmits } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores';
import { paths } from '@/router/routes';

const router = useRouter();
const authStore = useAuthStore();
const { onSkipping } = authStore;

const emit = defineEmits<{
  (e: 'next'): void;
}>();

const onNextSlide = () => {
  emit('next');
};
const onSkip = () => {
  onSkipping().then(() => {
    router.push(paths.profile);
  });
};
</script>

<style lang="scss" scoped>
@import '~@/styles/config/variables';
@import '~@/styles/config/mixin';

.introduction {
  &__preview {
    display: flex;
    flex-direction: column;
    flex: 1 1 auto;
    justify-content: center;
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

  &__control {
    margin-bottom: 3rem;
    text-align: center;

    &__connect {
      @include transition-default('background-color');
      display: block;
      width: 100%;
      max-width: 380px;
      margin: 0 auto 1rem;
      padding: $spacing-x;
      border: none;
      border-radius: $border-radius;
      color: $theme-color;
      background-color: #fff;
      font-weight: bold;
      font-size: 1.8rem;
      text-transform: uppercase;
      cursor: pointer;

      &:hover {
        background-color: #eee7ff;
      }
    }

    &__skip {
      @include transition-default('color');
      display: inline-block;
      padding: 1rem;
      color: #fff;
      font-size: 1.4rem;
      text-decoration: underline;
      cursor: pointer;

      &:hover {
        color: #eee7ff;
      }
    }
  }
}
</style>
