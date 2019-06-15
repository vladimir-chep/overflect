<template>
    <nav id="nav">
        <add-result v-if="showAddResult" />
        <router-link to="/profile">Profile</router-link>
        <!-- <router-link to="/about">About</router-link> -->
        <router-link to="/progress">Progress</router-link>
        <!-- <router-link to="/firebase">Firebase</router-link> -->
        <router-link to="/chart">Chart</router-link>
        <router-link to="/settings">Settings</router-link>
        <!-- <router-link to="/signup">SignUp</router-link> | -->
        <!-- <router-link to="/signin">{{ isAuthenticated ? 'Sign Out' : 'Sign In' }}</router-link> -->
    </nav>
</template>

<script>
import AddResult from "@/components/AddResult.vue";

export default {
    data() {
        return {
            showAddResult: true
        };
    },
    computed: {
        isAuthenticated() {
            return this.$store.getters['auth/isAuthenticated']
        }
    },
    components: {
        AddResult
    }
};
</script>

<style lang="scss">
#nav {
    position: relative;
    // position: fixed;
    // left: 0;
    // bottom: 0;
    width: 100%;
    padding: 20px;
    border-top: 3px solid #7b4bff;
    background: #fff;
    text-align: center;

    >a {
        text-decoration: none;
        color: #7b4bff;
        margin: auto 16px;
        display: inline-block;
        &.router-link-exact-active {
            font-weight: bold;
            text-decoration: underline;
        }
    }
}
</style>
