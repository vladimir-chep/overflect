<template>
<div id="app" class="app">
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
.app {
    position: relative;
    width: 756px;
    max-width: 100%;
    margin: auto;
}

h1 {
    text-align: center;
}
</style>
