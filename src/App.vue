<template>
  <UserAuthenticationProvider>
    <AppLayout>
      <router-view />
    </AppLayout>
  </UserAuthenticationProvider>
</template>

<script lang="ts" setup>
import UserAuthenticationProvider from '@/providers/UserAuthenticationProvider';
// import { computed } from 'vue';
// import { useRoute } from 'vue-router';
// import LayoutDefault from '@/layouts/LayoutDefault.vue';
// import LayoutAuth from '@/layouts/LayoutAuth.vue';

// const route = useRoute();
// const layout = computed(() => {
//   // return `${route.meta.layout || 'Default'}`;
//   const layoutName = route.meta.layout || 'LayoutDefault';
//   console.log(route.meta.layout, layoutName);
//   // return () => import(`@/layouts/${layoutName}.vue`);
//   return `${route.meta.layout || 'LayoutDefault'}`;
// });

// export default {
// name: 'App',
// components: {
//   Default,
//   SignIn,
// },
// computed: {
//   layout() {
//     return `${this.$route.meta.layout || 'Default'}`;
//   },
// },
// };
</script>

<!-- <style lang="scss" scoped>
@import '~@/styles/config/varia
</style> -->
