<template>
    <nav id="nav">
        <!-- <div class="bgResp">
            <svg
                class="navBackground"
                viewBox="0 0 80 80"
                fill="none"
                preserveAspectRatio="xMidYMin slice"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    class="center"
                    d="M227 3.23057e-05C224.239 3.23057e-05 222.038 2.25142 221.648 4.98519C219.228 21.9539 204.638 35 187 35C169.362 35 154.772 21.9539 152.352 4.98515C151.962 2.2514 149.761 1.78419e-05 147 0V0V60H227V3.23057e-05V3.23057e-05Z"
                    fill="white"
                />
            </svg>
        </div> -->
        <add-result v-if="showAddResult" />
        <router-link to="/profile">Profile</router-link>
        <router-link to="/progress">Progress</router-link>
        <router-link to="/chart">Chart</router-link>
        <router-link to="/settings">Settings</router-link>
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
            return this.$store.getters["auth/isAuthenticated"];
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
    width: 756px;
    max-height: 60px;
    height: 100%;
    /* padding: 20px; */
    /* border-top: 3px solid #7b4bff; */
    /* background: #fff; */
    text-align: center;

    > a {
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
.bgResp {
    position: relative;
}
.navBackground {
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    rect,
    path {
        fill: black;
    }
    .left {
        // display: block;
    }
    .center {
        /* fill: black; */
    }
    .right {
        // display: block;
    }
}
</style>
