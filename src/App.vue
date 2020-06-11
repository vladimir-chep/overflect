<template>
    <div id="app" class="appContainer" :class="layout">
        <component :class="{ isPaused: pagePaused }" :is="layout"></component>
    </div>
</template>

<script>
const defaultLayout = 'default';

export default {
    data() {
        return {};
    },
    computed: {
        pagePaused() {
            return this.$store.state['editModule'].visible;
        },
        layout() {
            return `layout-${this.$route.meta.layout || defaultLayout}`;
        },
    },
};
</script>

<style lang="scss">
</style>