<template>
    <div>
        <ViewHeader>Chart</ViewHeader>
        <ViewBody>
            <RoleTabs />
            <transition name="slide" mode="out-in">
                <div v-if="loading" class="loading">
                    <div class="halfCircleSpinner">
                        <span class="halfCircleSpinner__one"></span>
                        <span class="halfCircleSpinner__two"></span>
                    </div>
                </div>
                <ul v-else-if="hasResults" class="chart">
                    <LineChart :chartData="chartSource" />
                </ul>
                <NotFound v-else />
            </transition>
        </ViewBody>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import ViewHeader from '@/components/View/ViewHeader.vue';
import ViewBody from '@/components/View/ViewBody.vue';
import RoleTabs from '@/components/Common/RoleTabs.vue';
import LineChart from '@/components/Chart/Chart.vue';
import NotFound from '@/components/Common/NotFound.vue';

export default {
    name: 'Chart',
    components: {
        ViewHeader,
        ViewBody,
        RoleTabs,
        LineChart,
        NotFound,
    },
    computed: {
        ...mapGetters('progress', ['loading', 'currentRole', 'currentResults']),
        hasResults() {
            return this.currentResults.length !== 0;
        },
        chartSource() {
            const result = {
                order: [],
                score: [],
            };

            this.$store.getters['progress/currentResults'].forEach(
                (el, index) => {
                    result.order.push(index);
                    result.score.push(el.score);
                }
            );
            return result;
        },
    },
    beforeMount() {
        this.$store.dispatch('progress/switchRole', this.currentRole);
    },
    beforeDestroy() {
        this.$store.commit('progress/updateLoadingStatus', true);
    },
};
</script>

<style lang="scss" scoped>
@import '~@/styles/setup/variables';

.loading {
    padding: 80px $spacing-x;
}

.halfCircleSpinner {
    position: relative;
    width: 60px;
    height: 60px;
    margin: auto;
    border-radius: 100%;

    span {
        position: absolute;
        width: 100%;
        height: 100%;
        border: calc(60px / 10) solid transparent;
        border-radius: 100%;
        content: '';

        &__one {
            border-top-color: lighten($theme-color, 15%);
            animation: halfCircleSpinnerAnimation 1s infinite;
        }

        &__two {
            border-bottom-color: lighten($theme-color, 15%);
            animation: halfCircleSpinnerAnimation 1s infinite alternate;
        }
    }
}

.chart {
    padding: 14px;
}

</style>
