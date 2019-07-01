<template>
<div class="chartPage pageWrapper">
    <Header>Chart</Header>
    <div class="pageContent">
        <div class="Chart__list">
            <div class="Chart">
                <h1>This is a chart page</h1>
                <line-chart :data="dataChart" />
            </div>
        </div>
    </div>
</div>
</template>

<script>
import LineChart from '@/components/LineChart.vue';
import Header from '@/components/layout/Header.vue';

export default {
    name: 'Chart',
    components: {
        Header,
        LineChart,
    },
    data() {
        return {}
    },
    computed: {
        dataChart() {
            let result = {
                order: [],
                ranks: [],
            };

            this.$store.getters['progress/getResults'].forEach((el, index) => {
                result.order.push(index);
                result.ranks.push(el.rank);
            });
            return result;
        }
    },
}
</script>