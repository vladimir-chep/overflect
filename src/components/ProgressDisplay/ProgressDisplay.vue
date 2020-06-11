<template>
    <div>
        <div class="progressDisplay">
            <Roles />
            <slot v-if="isDisplayed"></slot>
            <NothingDisplay v-else />
        </div>
    </div>
</template>

<script>
import Roles from '@/components/ProgressDisplay/Roles.vue';
import NothingDisplay from '@/components/ProgressDisplay/NothingDisplay.vue';
export default {
    name: 'ProgressDisplay',
    components: {
        Roles,
        NothingDisplay,
    },
    computed: {
        isDisplayed() {
            return this.$store.getters['progress/getDisplayStatus'];
        },
    },
};
</script>

<style lang="scss">
.progressDisplay {
    background: #fff;
}
</style>
