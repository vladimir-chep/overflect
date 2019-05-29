<template>
  <div>
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

<style>
</style>
