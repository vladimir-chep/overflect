<template>
  <transition name="signInFade" appear>
    <div class="sliderWrapper">
      <transition-group :name="slideAnim" mode="out-in">
        <AuthIntroduction
          v-if="activeSlideIndex === 0"
          :key="0"
          class="sliderWrapper__slide"
          @next="onNextSlide"
        />
        <AuthVerification
          v-else
          :key="1"
          class="sliderWrapper__slide"
          @prev="onPrevSlide"
        />
      </transition-group>
    </div>
  </transition>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import AuthIntroduction from '@/components/Authentication/AuthIntroduction.vue';
import AuthVerification from '@/components/Authentication/AuthVerification.vue';

const activeSlideIndex = ref(0);
const slideAnim = computed(() => {
  const direction = activeSlideIndex.value === 0 ? 'right' : 'left';
  return `slideAnim-${direction}`;
});

const onNextSlide = () => {
  activeSlideIndex.value = 1;
};
const onPrevSlide = () => {
  activeSlideIndex.value = 0;
};
</script>

<style lang="scss" scoped>
@import '~@/styles/config/variables';

.sliderWrapper {
  position: relative;
  width: $wrapper-width;
  max-width: 100%;
  height: 100%;
  overflow: hidden;
  margin: auto;
  // color: #fff;
  // background: $theme-color;

  &__slide {
    display: flex;
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    flex-direction: column;
    padding: $padding;
  }
}
</style>
