<template>
<div id="app">
    <component :is="layout"></component>
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
            return `${this.$route.meta.layout || defaultLayout}-layout`;
        }
    },
}
</script>

<style lang="scss">
</style>
