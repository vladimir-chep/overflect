<template>
  <div class="spinnerLoading">
    <span class="spinnerLoading__dot"></span>
    <span class="spinnerLoading__dot"></span>
    <span class="spinnerLoading__dot"></span>
  </div>
</template>

<script>
export default {
  name: 'SpinnerLoading',
};
</script>

<style lang="scss" scoped>
@import '~@/styles/config/variables';
$size: 20px;

.spinnerLoading {
  width: calc(#{$size + $size} * 3);
  height: $size;
  margin: auto;

  &__dot {
    float: left;
    width: $size;
    height: $size;
    margin: 0 calc(#{$size} / 2);
    border: calc(#{$size} / 5) solid var(--app-text-color);
    border-radius: 50%;
    transform: scale(0);
    animation: spinnerLoading 1s ease infinite 0s;

    &:nth-child(1) {
      animation-delay: calc(0.3s * 1);
    }

    &:nth-child(2) {
      animation-delay: calc(0.3s * 2);
    }

    &:nth-child(3) {
      animation-delay: calc(0.3s * 3);
    }
  }
}

@keyframes spinnerLoading {
  50% {
    opacity: 1;
    transform: scale(1);
  }

  100% {
    opacity: 0;
  }
}
</style>
