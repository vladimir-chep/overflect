<template>
    <div id="app" class="container">
        <component :is="layout"></component>
    </div>
</template>

<script>
import Default from '@/layouts/Default.vue';
import SignIn from '@/layouts/SignIn.vue';

export default {
    name: 'App',
    components: {
        Default,
        SignIn,
    },
    computed: {
        // pagePaused() {
        //     return this.$store.state['editModule'].visible;
        // },
        layout() {
            return `${this.$route.meta.layout || 'Default'}`;
        },
    },
};
</script>

<style lang="scss" scoped>
@import "~@/styles/setup/variables";

.container {
    height: 100%;
    overflow: hidden;
    /* background: $theme-color; */
}

</style>
