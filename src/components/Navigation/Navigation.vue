<template>
    <nav class="navigationPanel">
        <div class="navigationPanel__wrapper">
            <NavigationList />
            <ActionCard />
        </div>
    </nav>
</template>

<script>
import NavigationList from '@/components/Navigation/NavigationList.vue';
import ActionCard from '@/components/Action/ActionCard.vue';

export default {
    name: 'Navigation',
    components: {
        NavigationList,
        ActionCard,
    },
};
</script>

<style lang="scss" scoped>
@import '~@/styles/setup/variables';

.navigationPanel {
    position: relative;
    height: 100%;
    max-height: 60px;
    box-shadow: $shadow-navigation;
    background: #fff;
    text-align: center;

    &__wrapper {
        position: relative;
        z-index: 200;
        width: 756px;
        max-width: 100%;
        height: 100%;
        margin: auto;
    }
}

</style>