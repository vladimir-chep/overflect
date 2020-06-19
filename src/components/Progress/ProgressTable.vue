<template>
    <div class="progressTable">
        <div class="progressTable__header">
            <p class="progressTable__header__col">Plays ({{ numOfPlays }})</p>
            <p class="progressTable__header__col">Score</p>
            <p class="progressTable__header__col">Tier</p>
            <p class="progressTable__header__col">Diff</p>
            <p class="progressTable__header__details" v-if="!skip">
                Details
            </p>
        </div>
        <transition name="slide" mode="out-in">
            <div v-if="loading" class="loading">
                <li
                    v-for="(item, index, key) in 5"
                    :key="key"
                    class="loading__item"
                ></li>
            </div>
            <ul v-else-if="hasResults" class="progress__list">
                <ProgressItem
                    v-for="(item, index, key) in sorted"
                    :key="key"
                    :source="item"
                    :order-num="sorted.length - index"
                />
            </ul>
            <NotFound v-else />
        </transition>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import ProgressItem from '@/components/Progress/ProgressItem.vue';
import NotFound from '@/components/Common/NotFound.vue';

export default {
    name: 'ProgressTable',
    components: {
        ProgressItem,
        NotFound,
    },
    computed: {
        ...mapGetters('progress', [
            'loading',
            'currentRole',
            'numOfPlays',
            'currentResults',
            'tierScheme',
        ]),
        ...mapGetters('auth', ['skip']),
        hasResults() {
            return this.currentResults.length !== 0;
        },
        sorted() {
            return this.currentResults.map(e => e).reverse();
        },
    },
    beforeMount() {
        this.$store.dispatch('progress/switchRole', this.currentRole);
    },
    mounted() {
        // this.$store.dispatch('progress/switchRole', this.currentRole);
    },
    beforeDestroy() {
        this.$store.commit('progress/updateLoadingStatus', true);
    },
};
</script>

<style lang="scss" scoped>
@import "~@/styles/setup/variables";

@mixin cell {
    flex: 1 1 0;
    padding: $spacing-x 0;
    text-align: center;
}

.loading {
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center;

    &__item {
        display: block;
        width: 100%;
        height: 26px;
        margin: 14px auto;
        border-radius: 5px;
        color: transparent;
        background: linear-gradient(
            to right,
            rgba($theme-color, 0.2) 8%,
            rgba($theme-color, 0.4) 18%,
            rgba($theme-color, 0.2) 33%
        );
        background-size: 800px 104px;
        animation-name: placeHolderShimmer;
        animation-duration: 1.25s;
        animation-timing-function: linear;
        animation-iteration-count: infinite;
        animation-fill-mode: forwards;
    }
}

@keyframes placeHolderShimmer {
    0% {
        background-position: -468px 0;
    }

    100% {
        background-position: 468px 0;
    }
}

.progressTable {
    padding: $spacing-x;

    &__header {
        display: flex;
        margin-bottom: 5px;

        &__col,
        &__details {
            @include cell;
            color: $text-light;
            font-weight: bold;
            font-size: 1.4rem;
            text-align: center;
        }

        &__details {
            display: flex;
            justify-content: center;
        }
    }
}

.slide {
    &-leave-active,
    &-enter-active {
        transition: all 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }

    &-enter {
        opacity: 0;
        transform: translate(0, 10px);
    }

    &-leave-to {
        opacity: 0;
        transform: translate(0, -10px);
    }
}
</style>