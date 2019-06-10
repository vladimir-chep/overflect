<template>
<div class="settings">
    <h1>This is a settings page</h1>
    <ul>
        <li>
            <p>Dummy</p>
        </li>
        <li v-if="isAuthenticated">
            <button class="" @click.prevent="userSignOut">Sign Out</button>
        </li>
    </ul>

</div>
</template>

<script>
export default {
    data() {
        return {

        }
    },
    computed: {
        isAuthenticated() {
            return this.$store.getters['auth/isAuthenticated'];
        },
    },
    methods: {
        userSignOut() {
            this.$store.dispatch('auth/userSignOut');
        }
    },
}
</script>

<style lang="scss">

</style>
