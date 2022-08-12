<template>
  <router-view />
</template>

<!-- <script>
// import FrontSlide from '@/components/SignIn/FrontSlide.vue';
// import Verification from '@/components/SignIn/Verification.vue';

export default {
  name: 'LayoutAuth',
  // components: {
  //   FrontSlide,
  //   Verification,
  // },
  data() {
    return {
      fronted: true,
    };
  },
  computed: {
    slideAnim() {
      const direction = this.fronted ? 'right' : 'left';
      return `slideAnim-${direction}`;
    },
  },
  mounted() {
    console.log('LayoutAuth mounted');
  },
  methods: {
    changeSlide(value) {
      this.fronted = value;
    },
  },
};
</script> -->

<!-- <style lang="scss" scoped>
@use '~@/styles/config/variables';
body {
  background: red;
}
</style> -->
