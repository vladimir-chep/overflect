<template>
  <!-- <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav>
  <router-view /> -->
  <!-- <div :class="['container', `container--${layout}`]"> -->
  <component :is="layout"></component>
  <!-- </div> -->
</template>

<script>
import Default from '@/layouts/Default.vue';
import SignIn from '@/layouts/SignIn.vue';

export default {
  name: 'App',
  components: {
    Default,
    SignIn,
  },
  computed: {
    layout() {
      return `${this.$route.meta.layout || 'Default'}`;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/styles/setup/variables';

.container {
  // height: 100%;
  // overflow: hidden;

  &--SignIn {
    // background: $theme-color;
  }
}
</style>

<!-- <style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style> -->
