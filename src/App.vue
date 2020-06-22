<template>
    <div id="app" :class="['container', `container--${layout}`]">
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
        layout() {
            return `${this.$route.meta.layout || 'Default'}`;
        },
    },
};
</script>

<style lang="scss" scoped>
@import '~@/styles/setup/variables';

.container {
    height: 100%;
    overflow: hidden;

    &--SignIn {
        background: $theme-color;
    }
}

</style>
