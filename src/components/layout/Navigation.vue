<template>
    <nav id="nav">
        <!-- <svg class="navBackground"
             viewBox="0 0 375 60"
             fill="none"
             preserveAspectRatio="xMidYMin slice"
             xmlns="http://www.w3.org/2000/svg">
            <path d="M228 3.23057e-05C225.239 3.23057e-05 223.038 2.25142 222.648 4.98519C220.228 21.9539 205.638 35 188 35C170.362 35 155.772 21.9539 153.352 4.98519C152.962 2.25142 150.761 3.1833e-05 148 3.125e-05L0 0V60H375V3.23057e-05H228Z"
                  fill="white" />
        </svg> -->
        <svg class="navBackground" viewBox="0 0 374 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M227 3.23057e-05C224.239 3.23057e-05 222.038 2.25142 221.648 4.98519C219.228 21.9539 204.638 35 187 35C169.362 35 154.772 21.9539 152.352 4.98515C151.962 2.2514 149.761 1.78419e-05 147 0V0V60H227V3.23057e-05V3.23057e-05Z" fill="white"/>
    <rect width="147" height="60" fill="white"/>
    <rect x="227" width="147" height="60" fill="white"/>
    </svg>



        <!-- <svg width="375"
             height="128"
             viewBox="0 0 375 128"
             fill="none"
             class="navBackground"
             xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_dd)">
                <path d="M188 103C205.638 103 220.228 89.9539 222.648 72.9852C223.038 70.2514 225.239 68 228 68H367C371.418 68 375 71.5817 375 76V128H0V76C0 71.5817 3.58172 68 8 68H148C150.761 68 152.962 70.2514 153.352 72.9852C155.772 89.9539 170.362 103 188 103Z"
                      fill="white" />
            </g>
            <defs>
                <filter id="filter0_dd"
                        x="-50"
                        y="0"
                        width="475"
                        height="160"
                        filterUnits="userSpaceOnUse"
                        color-interpolation-filters="sRGB">
                    <feFlood flood-opacity="0"
                             result="BackgroundImageFix" />
                    <feColorMatrix in="SourceAlpha"
                                   type="matrix"
                                   values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                    <feOffset dy="-18" />
                    <feGaussianBlur stdDeviation="25" />
                    <feColorMatrix type="matrix"
                                   values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.025 0" />
                    <feBlend mode="normal"
                             in2="BackgroundImageFix"
                             result="effect1_dropShadow" />
                    <feColorMatrix in="SourceAlpha"
                                   type="matrix"
                                   values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
                    <feOffset dy="5" />
                    <feGaussianBlur stdDeviation="7.5" />
                    <feColorMatrix type="matrix"
                                   values="0 0 0 0 0.196078 0 0 0 0 0.196078 0 0 0 0 0.364706 0 0 0 0.05 0" />
                    <feBlend mode="normal"
                             in2="effect1_dropShadow"
                             result="effect2_dropShadow" />
                    <feBlend mode="normal"
                             in="SourceGraphic"
                             in2="effect2_dropShadow"
                             result="shape" />
                </filter>
            </defs>
        </svg> -->
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
.navBackground {
    width: 100%;
    position: absolute;
    top:0;
    left:0;
    path {
        /* fill: black; */
    }
}
</style>
