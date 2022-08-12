<template>
  <component :is="layoutComponent">
    <slot />
  </component>
</template>

<script lang="ts" setup>
import { shallowRef, markRaw, watch } from 'vue';
import { useRoute } from 'vue-router';
import LayoutDefault from '@/layouts/LayoutDefault.vue';

const layouts = {
  default: 'default',
  auth: 'auth',
} as const;
// type Layout = typeof layouts[keyof typeof layouts];
const layoutAttr = 'layout';

const route = useRoute();

const layoutComponent = shallowRef({});
layoutComponent.value = markRaw(LayoutDefault);
// const layout = ref<Layout>(layouts.default);

watch(
  () => route.meta,
  async (meta) => {
    try {
      const isLayoutAuth = meta.layout === layouts.auth;
      const htmlElement = document.documentElement;
      htmlElement.setAttribute(
        layoutAttr,
        isLayoutAuth ? layouts.auth : layouts.default
      );

      const componentName = isLayoutAuth ? 'LayoutAuth' : 'LayoutDefault';
      const component = await import(`@/layouts/${componentName}.vue`);
      layoutComponent.value = component?.default || LayoutDefault;
    } catch (e) {
      layoutComponent.value = LayoutDefault;
    }
  },
  { immediate: true }
);
</script>

<style lang="scss">
@import '~@/styles/config/variables';
body {
  background-color: var(--app-background-color);
  color: var(--app-text-color);
}
</style>
