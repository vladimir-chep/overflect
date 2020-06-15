<template>
    <div>
        <ViewHeader>Setting</ViewHeader>
        <span v-if="isAuthenticated">
            Logged (<a href="#" @click.prevent="signOut">Sign Out</a>)
        </span>
        <span v-else>
            Not logged (<router-link to="/sign-in">Sign In</router-link>)
        </span>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import ViewHeader from '@/components/View/ViewHeader.vue';

export default {
    name: 'Settings',
    components: {
        ViewHeader,
    },
    computed: {
        ...mapGetters('auth', ['isAuthenticated']),
        // isAuthenticated() {
        //     return this.$store.getters['auth/isAuthenticated'];
        // },
    },
    methods: {
        signOut() {
            this.$store.dispatch('auth/manualSignOut');
        },
    },
};
</script>

<style lang="scss" scoped>
</style>
