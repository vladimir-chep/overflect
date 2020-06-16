<template>
    <div>
        <div class="header">
            <div class="header__wrapper">
                <transition name="slide" mode="out-in">
                    <LoadingHeader v-if="loading" />
                    <div v-else class="profileHeader">
                        <div class="profileHeader__logo">
                            <img
                                :src="info.icon"
                                alt=""
                                class="profileHeader__logo__img"
                            />
                        </div>
                        <p class="profileHeader__name">{{ info.name }}</p>
                        <p class="profileHeader__label">{{ info.rating }}</p>
                        <div class="profileHeader__tabs">
                            <a
                                :class="[
                                    'profileHeader__tabs__item',
                                    { 'is-active': activeTab === 0 }
                                ]"
                                @click="activeTab = 0"
                                >Overview</a
                            >
                            <a
                                :class="[
                                    'profileHeader__tabs__item',
                                    { 'is-active': activeTab === 1 }
                                ]"
                                @click="activeTab = 1"
                                >Stats</a
                            >
                        </div>
                    </div>
                </transition>
            </div>
        </div>
        <div class="details">
            <div class="details__wrapper">
                <transition name="slide" mode="out-in">
                    <LoadingDetails v-if="loading" />
                    <div v-else>
                        <div v-if="activeTab === 0">
                            <ProfileStats
                                :source="[
                                    ['Level', info.level],
                                    ['Prestige', info.prestige],
                                    ['Endorsement', info.endorsement]
                                ]"
                            />
                            <CompetitiveStats
                                v-if="info.ratings.length !== 0"
                                :ratings-data="info.ratings"
                            />
                        </div>
                        <div v-if="activeTab === 1">
                            <ProfileStats
                                :source="[
                                    ['Level', info.level],
                                    ['Prestige', info.prestige],
                                    ['Endorsement', info.endorsement],
                                    ['Total Wins', info.gamesWon],
                                    [
                                        'QuickPlay Wins',
                                        info.quickPlayStats.games.won
                                    ],
                                    [
                                        'Competitive Win',
                                        info.competitiveStats.games.won
                                    ]
                                ]"
                            />
                        </div>
                    </div>
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import LoadingHeader from '@/components/Profile/LoadingHeader.vue';
import LoadingDetails from '@/components/Profile/LoadingDetails.vue';
import ProfileStats from '@/components/Profile/ProfileStats.vue';
import CompetitiveStats from '../components/Profile/CompetitiveStats.vue';

export default {
    name: 'Profile',
    components: {
        LoadingHeader,
        LoadingDetails,
        ProfileStats,
        CompetitiveStats,
    },
    data() {
        return {
            activeTab: 0,
            panel: 1,
        };
    },
    beforeMount() {
        if (!this.hasData) {
            this.$store.dispatch('profile/getData');
        }
    },
    computed: {
        ...mapGetters('profile', ['info', 'hasData']),
        loading() {
            return !this.hasData;
        },
    },
};
</script>

<style lang="scss" scoped>
@import '~@/styles/setup/variables';
@import '~@/styles/setup/mixin';

.header {
    position: relative;
    border-radius: 0 0 8px 8px;
    box-shadow: $shadow-profileHeader;
    background: #fff;

    &__wrapper {
        @include wrapper;
        padding: $spacing-y $spacing-x 0;
    }
}

.profileHeader {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    &__logo {
        position: relative;
        width: 60px;
        height: 60px;
        overflow: hidden;
        margin-bottom: 14px;
        border-radius: 50%;
        background: linear-gradient(
        135deg,
        rgba($theme-color, .15),
        $theme-color
        );

        &:before {
            position: absolute;
            top: 50%;
            left: 50%;
            z-index: 1;
            width: 56px;
            height: 56px;
            border-radius: 50%;
            background: #fff;
            content: '';
            transform: translate(-50%, -50%);
        }

        &__img {
            display: block;
            position: absolute;
            top: 50%;
            left: 50%;
            z-index: 2;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            box-shadow: 0 0 5px rgba(#270c50, .25);
            background: rgba($theme-color, .75);
            transform: translate(-50%, -50%);
        }
    }

    &__name {
        margin-bottom: $spacing-x / 2;
        font-weight: bold;
        font-size: 1.8rem;
    }

    &__label {
        padding: 3px 6px;
        border-radius: 8px;
        background: rgba($theme-color, .05);
        font-size: 1rem;
    }

    &__tabs {
        display: flex;
        width: 100%;
        align-items: center;
        margin-top: 14px;

        &__item {
            flex: 1 1 0;
            padding: 14px 0;
            border-radius: 8px;
            color: $text-light;
            font-weight: bold;
            font-size: 1.6rem;
            text-align: center;
            cursor: pointer;
            transition: .25s all ease-in-out;

            &:hover {
                color: $theme-color;
                background: rgba($theme-color, .05);
            }

            &.is-active {
                color: $theme-color;
            }
        }
    }
}

.details {
    position: relative;
    padding: 40px $spacing-x;

    &__wrapper {
        @include wrapper;
    }
}

.slide {
    &-leave-active,
    &-enter-active {
        transition: all .35s cubic-bezier(.25, .46, .45, .94);
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
