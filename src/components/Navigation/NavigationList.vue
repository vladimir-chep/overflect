<template>
    <div class="navigationList">
        <NavigationItem to="/profile" icon="profile" />
        <NavigationItem to="/progress" icon="list" />
        <ToggleButton />
        <NavigationItem to="/chart" icon="graph" />
        <NavigationItem to="/settings" icon="settings" />
    </div>
</template>

<script>
import NavigationItem from '@/components/Navigation/NavigationItem.vue';
import ToggleButton from '@/components/Action/ToggleButton.vue';

export default {
    name: 'NavigationList',
    components: {
        NavigationItem,
        ToggleButton,
    },
};
</script>

<style lang="scss" scoped>
@import '~@/styles/setup/variables';

.navigationList {
    display: flex;
    height: 100%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0 14px;
    list-style: none;
}

</style>