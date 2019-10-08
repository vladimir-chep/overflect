<template>
<div>
    <div class="progressDisplay">
        <Roles />
        <slot v-if="isDisplayed"></slot>
        <NothingDisplay v-else/>
    </div>
</div>
</template>

<script>
// import Seasons from '@/components/Progress/Seasons.vue';
import Roles from '@/components/ProgressDisplay/Roles.vue';
import NothingDisplay from '@/components/ProgressDisplay/NothingDisplay.vue';
export default {
    name: 'ProgressDisplay',
    components: {
        Roles,
        NothingDisplay,
    },
    computed: {
        // selectedRole(){
        //     return this.$store.state['editModule'].selectedRole;
        // },
        // masterList() {
        //     return this.$store.getters['progress/getMasterList'];
        // },
        // seasons() {
        //     return this.$store.getters['progress/getSeasons'];
        // },
        // selectedSeason() {
        //     return this.$store.getters['progress/getSelectedSeason'];
        // },
        // displayList(){
        //     return this.masterList[this.selectedSeason];
        // },
        isDisplayed(){
            return this.$store.getters['progress/getDisplayStatus'];
        },
    },
}
</script>

<style lang="scss">
.progressDisplay {
    background: #fff;
}
</style>
