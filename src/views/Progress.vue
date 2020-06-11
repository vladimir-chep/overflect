<template>
    <div class="pageContent">
        <Header>Progress</Header>
        <div class="pageCore">
            <div class="pageCore__wrap">
                <ProgressDisplay>
                    <ProgressTable />
                </ProgressDisplay>
            </div>
        </div>
    </div>
</template>

<script>
import Header from '@/components/layout/Header.vue';
import ProgressDisplay from '@/components/ProgressDisplay/ProgressDisplay.vue';
import ProgressTable from '@/components/ProgressDisplay/ProgressTable.vue';

export default {
    name: 'ProgressView',
    components: {
        Header,
        ProgressDisplay,
        ProgressTable,
    },
    computed: {
        pagePaused() {
            return this.$store.state['editModule'].visible;
        },
        selectedRole() {
            return this.$store.state['editModule'].selectedRole;
        },
        numOfPlays() {
            return this.$store.getters['progress/getNum'];
        },
        isSkipped() {
            return this.$store.getters['auth/isSkipped'];
        },
    },
};
</script>
