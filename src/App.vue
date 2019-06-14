<template>
<div id="app" class="appContainer" :class="layout">
    <component :is="layout" class="wrapper"></component>
</div>
</template>

<script>
const defaultLayout = 'default';

export default {
    data() {
        return {

        }
    },
    computed: {
        layout() {
            return `layout-${this.$route.meta.layout || defaultLayout}`;
        }
    },
}
</script>

<style lang="scss">
</style>