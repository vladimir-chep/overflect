<template>
    <div class="navigationList">
        <NavigationItem to="/profile" icon="profile" />
        <NavigationItem to="/progress" icon="list" />
        <ActionButton />
        <NavigationItem to="/chart" icon="graph" />
        <NavigationItem to="/settings" icon="settings" />
    </div>
</template>

<script>
import NavigationItem from '@/components/Navigation/NavigationItem.vue';
import ActionButton from '../Navigation/ActionButton/ActionButton.vue';

export default {
    name: 'NavigationList',
    components: {
        NavigationItem,
        ActionButton,
    },
};
</script>

<style lang="scss" scoped>
@import "~@/styles/setup/variables";

.navigationList {
    display: flex;
    flex-direction: row;
    list-style: none;
    height: 100%;
    align-items: center;
    padding: 0 14px;
    justify-content: space-between;
}
</style>