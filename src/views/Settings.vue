<template>
<div class="settings">
    <Header>Settings</Header>
    <div class="innerWrapper">
        <ul>
            <li>
                <p>Dummy</p>
            </li>
            <li v-if="isAuthenticated">
                <button class="" @click.prevent="userSignOut">Sign Out</button>
            </li>
            <li v-else>
                <router-link to="/signin">Sign In</router-link>
            </li>
        </ul>
    </div>
</div>
</template>

<script>
import Header from '@/components/layout/Header.vue';

export default {
    name: 'Settings',
    components: {
        Header,
    },
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
