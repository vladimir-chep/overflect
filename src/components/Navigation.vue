<template>
    <nav id="nav">
        <div v-if="showAddResult">
            <add-result/>
        </div>
      <router-link to="/">Profile</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/progress">Progress</router-link> |
      <router-link to="/chart">Chart</router-link> |
      <router-link to="/settings">Settings</router-link>
    </nav>
</template>

<script>
import AddResult from '@/components/AddResult.vue';

export default {
    data() {
        return {
            showAddResult: true,
        }
    },
    components:{
        AddResult
    }
}
</script>

<style lang="sass">

</style>
