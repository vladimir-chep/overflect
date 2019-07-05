<template>
<div class="pageContent">
    <Header>Settings</Header>
    <div class="pageCore">
        <div class="pageCore__wrap">
            <ul class="settingsMenu">
                <li class="settingsMenu__item">
                    <div class="settingsMenu__item__ttl">Status</div>
                    <div class="settingsMenu__item__content">
                        <span v-if="isAuthenticated">
                            Logged (<a href="#" @click.prevent="userSignOut">Sign Out</a>)
                        </span>
                        <span v-else>
                            Not logged (<router-link to="/signin">Sign In</router-link>)
                        </span>
                    </div>
                </li>
                <li class="settingsMenu__item">
                    <div class="settingsMenu__item__ttl">Author</div>
                    <div class="settingsMenu__item__content"><a href="https://github.com/vladimir-chep" target="_blank">vladimir-chep</a></div>
                </li>
                <li class="settingsMenu__item">
                    <div class="settingsMenu__item__ttl">Version</div>
                    <div class="settingsMenu__item__content">0.1</div>
                </li>
            </ul>
        </div>
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
@import '../styles/pages/settings.scss';
</style>
