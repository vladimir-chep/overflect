<template>
<div class="profile pageContent">
    <div class="profileHeader">
        <div class="profileHeader__wrapper">
            <div class="profileLogo">
                <img :src="info.icon" alt="">
            </div>
            <p class="profileName">{{ info.name }}</p>
            <div class="profileLabel">{{ info.rating }}</div>
            <ul class="profileTabs">
                <li
                    :class="['profileTabs__item', {'isActive': activeTab === 0}]"
                    @click="activeTab = 0"
                    >Overview</li>
                <li
                    :class="['profileTabs__item', {'isActive': activeTab === 1}]"
                    @click="activeTab = 1"
                    >Stats</li>
            </ul>
        </div>
    </div>
    <div class="pageCore">
        <div class="pageCore__wrap">
            <div class="tabContent" v-if="activeTab === 0">
                <ul class="shortInfo">
                    <li class="shortInfo__item">
                        <div class="shortInfo__item__score">{{ info.level }}</div>
                        <div class="shortInfo__item__name">Level</div>
                    </li>
                    <li class="shortInfo__item">
                        <div class="shortInfo__item__score">{{ info.prestige }}</div>
                        <div class="shortInfo__item__name">Prestige</div>
                    </li>
                    <li class="shortInfo__item">
                        <div class="shortInfo__item__score">{{ info.endorsement }}</div>
                        <div class="shortInfo__item__name">Endorsement</div>
                    </li>
                </ul>
                <div class="compInfo">
                    <h3 class="compInfo__ttl">Competative</h3>
                    <ul class="compInfo__row">
                        <div class="compCard" v-for="(role, index, key) in info.ratings" :key="key">
                            <div class="compCard__roleIcon">
                                <CompIcon :icon-name="role.role" />
                            </div>
                            <p class="compCard__role">{{ role.role }}</p>
                            <p class="compCard__level">{{ role.level }}</p>
                        </div>
                    </ul>
                </div>
            </div>
            <div class="tabContent" v-if="activeTab === 1">
                <ul class="shortInfo">
                    <li class="shortInfo__item">
                        <div class="shortInfo__item__score">{{ info.level }}</div>
                        <div class="shortInfo__item__name">Level</div>
                    </li>
                    <li class="shortInfo__item">
                        <div class="shortInfo__item__score">{{ info.prestige }}</div>
                        <div class="shortInfo__item__name">Prestige</div>
                    </li>
                    <li class="shortInfo__item">
                        <div class="shortInfo__item__score">{{ info.endorsement }}</div>
                        <div class="shortInfo__item__name">Endorsement</div>
                    </li>
                </ul>
                <ul class="shortInfo">
                    <li class="shortInfo__item">
                        <div class="shortInfo__item__score">{{ info.gamesWon }}</div>
                        <div class="shortInfo__item__name">Total Wins</div>
                    </li>
                     <li class="shortInfo__item">
                        <div class="shortInfo__item__score">{{ info.quickPlayStats.games.won }}</div>
                        <div class="shortInfo__item__name">QuickPlay Wins</div>
                    </li>
                     <li class="shortInfo__item">
                        <div class="shortInfo__item__score">{{ info.competitiveStats.games.won }}</div>
                        <div class="shortInfo__item__name">Competitive Win</div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import CompIcon from '@/components/icons/competitive/Icon.vue';
// ! loading
// ! if ('no connection')
// ! if (info.privet)

export default {
    name: "profile",
    data() {
        return {
            activeTab: 0,
        }
    },
    created() {
        if (!this.$store.state['profile'].isFilled) {
            this.$store.dispatch('profile/fetchData');
        }
    },
    components:{
        CompIcon,
    },
    computed: {
        info() {
            return this.$store.state['profile'].data;
        },
    },
};
</script>

<style lang="scss">
@import '../styles/pages/settings.scss';

.profileHeader {
    position: relative;
    margin-bottom: 40px;
    border-radius: 0 0 8px 8px;
    box-shadow: $shadow-profileHeader;
    background: #fff;

    &__wrapper {
        @include wrapper;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding-top: 24px;
    }
}

.profileLogo {
    position: relative;
    width: 60px;
    height: 60px;
    overflow: hidden;
    margin-bottom: 14px;
    border-radius: 50%;
    background: linear-gradient(135deg, rgba($theme, .15), $theme);

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
        transform: translate(-50%,-50%);
    }

    img {
        display: block;
        position: absolute;
        top: 50%;
        left: 50%;
        z-index: 2;
        width: 50px;
        min-width: 50px;
        height: 50px;
        min-height: 50px;
        border-radius: 50%;
        box-shadow: 0 0 5px rgba(#270c50, .25);
        background: rgba($theme, .75);
        transform: translate(-50%,-50%);
    }
}

.profileName {
    margin-bottom: $sps / 2;
    font-weight: bold;
    font-size: 1.8rem;
}

.profileLabel {
    padding: 3px 6px;
    border-radius: 8px;
    background: rgba($theme, .05);
    font-size: 1rem;
}

.profileTabs {
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
        font-size: 1.4rem;
        text-align: center;
        cursor: pointer;

        &:hover {
            color: $theme;
            background: rgba($theme, .05);
        }

        &.isActive {
            color: $theme;
        }
    }
}

.tabContent {
    margin: 14px;
}

.shortInfo {
    display: flex;
    margin-bottom: $sps * 2;

    &__item {
        flex: 1 1 0;
        text-align: center;

        &__score {
            margin-bottom: 4px;
            color: $theme;
            font-weight: bold;
            font-size: 1.6rem;
        }

        &__name {
            font-size: 1.2rem;
        }
    }
}

.compInfo {
    &__ttl {
        margin-bottom: $sps;
        font-weight: bold;
        font-size: 1.6rem;
        text-align: center;
    }

    &__row {
        display: flex;
        margin: 0 -10px;
    }
}

.compCard {
    display: flex;
    flex-direction: column;
    flex: 1 1 0;
    align-items: center;
    margin: 0 10px;
    padding: 16px;
    border-radius: 8px;
    box-shadow: $shadow3-1;
    background: #fff;
    font-weight: bold;

    &__roleIcon {
        margin-bottom: 8px;

        svg {
            width: 30px;
        }
    }

    &__role {
        display: block;
        width: 100%;
        margin-bottom: 8px;
        padding-bottom: 4px;
        border-bottom: 2px solid $bg-color;
        font-size: 1.2rem;
        text-align: center;
        text-transform: capitalize;
    }

    &__level {
        color: $theme;
        font-size: 1.4rem;
    }
}

.json {
    font-size: .1rem;
}

.ratingClass {
    width: 100%;
    max-width: 30px;
}
</style>
