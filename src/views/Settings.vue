<template>
    <div>
        <ViewHeader>Setting</ViewHeader>
        <ViewBody>
            <SettingsItem title="Status">
                <span v-if="isAuthenticated">
                    Logged (<a href="#" @click.prevent="signOut">Sign Out</a>)
                </span>
                <span v-else>
                    Not logged (<router-link to="/sign-in">Sign In</router-link
                    >)
                </span>
            </SettingsItem>
            <SettingsItem title="Author">
                <a href="https://github.com/vladimir-chep" target="_blank"
                    >vladimir-chep</a
                >
            </SettingsItem>
            <SettingsItem title="Version">
                <span>1.0</span>
            </SettingsItem>
        </ViewBody>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import ViewHeader from '@/components/View/ViewHeader.vue';
import ViewBody from '@/components/View/ViewBody.vue';
import SettingsItem from '@/components/Settings/SettingsItem.vue';

export default {
    name: 'Settings',
    components: {
        ViewHeader,
        ViewBody,
        SettingsItem,
    },
    computed: {
        ...mapGetters('auth', ['isAuthenticated']),
    },
    methods: {
        signOut() {
            this.$store.dispatch('auth/manualSignOut');
        },
    },
};
</script>
