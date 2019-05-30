<template>
  <div id="app" class="app">
    <router-view/>
    <navigation/>
  </div>
</template>

<script>
import Navigation from '@/components/Navigation.vue';

export default {
  data() {
    return {

    }
  },
  components:{
    Navigation,
  }
}
</script>

<style lang="scss">
.app{
  position: relative;
  width: 756px;
  margin: auto;
}
h1{
  text-align: center;
}
</style>
