<template>
  <div class="profile">
    <h1>Profile page</h1>
    <button @click="onSignOut">SignOut</button>
  </div>
</template>

<script lang="ts" setup>
import { useAuthStore } from '@/stores';

const authStore = useAuthStore();
const { onSignOut } = authStore;
</script>
