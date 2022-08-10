<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />

    <p>{{ state.count }}</p>
    <button @click="increment">increment</button>
  </div>
</template>

<!-- <script lang="ts">
import { defineComponent } from "vue";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src

export default defineComponent({
  name: "HomeView",
  components: {
    HelloWorld,
  },
});
</script> -->
<script lang="ts" setup>
import { reactive } from 'vue';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src

const state = reactive({ count: 0 });

const increment = () => {
  state.count++;
};
</script>
