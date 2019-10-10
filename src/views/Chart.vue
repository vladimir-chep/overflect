<template>
<div class="pageContent">
    <Header>Chart</Header>
    <div class="pageCore">
        <div class="pageCore__wrap">
            <div class="card">
                <Roles />
                <div class="progressTable" v-if="isDisplayed">
                    <line-chart :chartData="getChartData" />
                </div>
                <NothingDisplay v-else />
            </div>
        </div>
    </div>
</div>
</template>

<script>
import Header from '@/components/layout/Header.vue';
import Roles from '@/components/ProgressDisplay/Roles.vue';
import LineChart from '@/components/LineChart.vue';
import NothingDisplay from '@/components/ProgressDisplay/NothingDisplay.vue';

export default {
    name: 'Chart',
    components: {
        Header,
        LineChart,
        Roles,
        NothingDisplay,
    },
    data() {
        return {}
    },
    computed: {
        masterList() {
            return this.$store.getters['progress/getMasterList'];
        },
        selectedSeason() {
            return this.$store.getters['progress/getSelectedSeason'];
        },
        displayList(){
            return this.masterList[this.selectedSeason];
        },
        isDisplayed() {
            return this.displayList && this.displayList.length ? true : false;
        },
        getChartData() {
            let result = {
                order: [],
                ranks: [],
            };

            this.$store.getters['progress/getMasterList'][0].forEach((el, index) => {
                result.order.push(index);
                result.ranks.push(el.rank);
            });
            return result;
        },

    },
}
</script>
