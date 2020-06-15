<template>
    <nav class="navigationPanel">
        <div class="navigationPanel__wrapper">
            <NavigationList />
            <!-- <EditModule /> -->
        </div>
    </nav>
</template>

<script>
import NavigationList from '@/components/Navigation/NavigationList.vue';

export default {
    name: 'Navigation',
    components: {
        NavigationList,
    },
};
</script>

<style lang="scss">
@import "~@/styles/setup/variables";
.navigationPanel {
    position: relative;
    max-height: 60px;
    height: 100%;
    text-align: center;
    background: #fff;
    box-shadow: $shadow-navigation;

    &__wrapper {
        position: relative;
        width: 756px;
        max-width: 100%;
        height: 100%;
        margin: auto;
        z-index: 200;
    }
}
</style>