<template>
    <RouterLink
        :to="to"
        active-class="is-active"
        exact-active-class="is-activeExact"
        class="navigationItem"
    >
        <component :is="icon" :is-active="currentPage"></component>
    </RouterLink>
</template>

<script>
export default {
    name: 'NavigationItem',
    props: {
        to: {
            type: String,
            required: true,
        },
        icon: {
            type: String,
            required: true,
        },
    },
    components: {
        Profile: () => import('@/components/Symbols/Navigation/Profile.vue'),
        List: () => import('@/components/Symbols/Navigation/List.vue'),
        Graph: () => import('@/components/Symbols/Navigation/Graph.vue'),
        Settings: () => import('@/components/Symbols/Navigation/Settings.vue'),
    },
    computed: {
        currentPage() {
            return this.$route.path === this.to;
        },
    },
};
</script>

<style lang="scss">
@import "~@/styles/setup/variables";

.navigationItem {
    position: relative;
    flex: 1 1 0;
    display: flex;
    height: 100%;
    max-width: 50px;

    &.is-activeExact:before {
        content: "";
        display: block;
        background: $theme-color;
        width: 100%;
        height: 2px;
        position: absolute;
        top: 0;
        left: 0;
    }

    /* &--editModule {
            max-width: 80px;
        } */
}
</style>