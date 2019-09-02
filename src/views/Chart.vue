<template>
<div class="pageContent">
    <Header>Chart</Header>
    <div class="pageCore">
        <div class="pageCore__wrap">
            <line-chart :data="dataChart" />
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