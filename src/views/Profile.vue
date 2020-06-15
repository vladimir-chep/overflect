<template>
    <div>
        <div class="profileHeader">
            <transition name="slide" mode="out-in">
                <div class="profileHeader__wrapper" v-if="loading" key="0">
                    <div class="profileLogo">
                        <div class="profileLogo__img isLoading"></div>
                    </div>
                    <div
                        class="profileName dummyBlock isLoading"
                        style="width:30%; height:20px;"
                    ></div>
                    <div
                        class="profileLabel dummyBlock isLoading"
                        style="width:9%; height:17px;"
                    ></div>
                    <div
                        class="dummyBlock isLoading"
                        style="width:70%; height:18px; margin: 21px 0;"
                    ></div>
                </div>
                <div class="profileHeader__wrapper" v-else key="1">
                    <div class="profileLogo">
                        <img
                            :src="info.icon"
                            alt=""
                            class="profileLogo__img"
                        />
                    </div>
                    <p class="profileName">{{ info.name }}</p>
                    <div class="profileLabel">{{ info.rating }}</div>
                    <ul class="profileTabs">
                        <li
                            :class="[
                                'profileTabs__item',
                                { isActive: activeTab === 0 }
                            ]"
                        >
                            Overview
                        </li>
                        <li
                            :class="[
                                'profileTabs__item',
                                { isActive: activeTab === 1 }
                            ]"
                        >
                            Stats
                        </li>
                    </ul>
                </div>
            </transition>
        </div>
        <div class="pageCore">
            <div class="pageCore__wrap">
                <transition name="slide" mode="out-in">
                    <div v-if="loading" key="0">
                        <div class="tabContent">
                            <div
                                class="dummyBlock isLoading"
                                style="width:70%; height:16px; margin:0 auto 20px;"
                            ></div>
                            <div
                                class="dummyBlock isLoading"
                                style="width:100%; height:20px; margin:0 auto 20px;"
                            ></div>
                            <div
                                class="dummyBlock isLoading"
                                style="width:100%; height:20px; margin:0 auto 50px;"
                            ></div>
                            <div
                                class="dummyBlock isLoading"
                                style="width:50%; height:16px; margin:0 auto 20px;"
                            ></div>
                            <div
                                class="dummyBlock isLoading"
                                style="width:100%; height:20px; margin:0 auto 20px;"
                            ></div>
                            <div
                                class="dummyBlock isLoading"
                                style="width:100%; height:20px; margin:0 auto 20px;"
                            ></div>
                        </div>
                    </div>
                    <div v-else key="1">
                        <div class="tabContent" v-if="activeTab === 0">
                            <ul class="shortInfo">
                                <li class="shortInfo__item">
                                    <div class="shortInfo__item__score">
                                        {{ info.level }}
                                    </div>
                                    <div class="shortInfo__item__name">
                                        Level
                                    </div>
                                </li>
                                <li class="shortInfo__item">
                                    <div class="shortInfo__item__score">
                                        {{ info.prestige }}
                                    </div>
                                    <div class="shortInfo__item__name">
                                        Prestige
                                    </div>
                                </li>
                                <li class="shortInfo__item">
                                    <div class="shortInfo__item__score">
                                        {{ info.endorsement }}
                                    </div>
                                    <div class="shortInfo__item__name">
                                        Endorsement
                                    </div>
                                </li>
                            </ul>
                            <div
                                class="compInfo"
                                v-if="info.ratings.length != 0"
                            >
                                <h3 class="compInfo__ttl">Competative</h3>
                                <ul class="compInfo__row">
                                    <li
                                        class="compCard"
                                        v-for="(role,
                                        index,
                                        key) in info.ratings"
                                        :key="key"
                                    >
                                        <div class="compCard__roleIcon">
                                            <CompIcon
                                                :icon-name="role.role"
                                            />
                                        </div>
                                        <p class="compCard__role">
                                            {{ role.role }}
                                        </p>
                                        <p class="compCard__level">
                                            {{ role.level }}
                                        </p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="tabContent" v-if="activeTab === 1">
                            <ul class="shortInfo">
                                <li class="shortInfo__item">
                                    <div class="shortInfo__item__score">
                                        {{ info.level }}
                                    </div>
                                    <div class="shortInfo__item__name">
                                        Level
                                    </div>
                                </li>
                                <li class="shortInfo__item">
                                    <div class="shortInfo__item__score">
                                        {{ info.prestige }}
                                    </div>
                                    <div class="shortInfo__item__name">
                                        Prestige
                                    </div>
                                </li>
                                <li class="shortInfo__item">
                                    <div class="shortInfo__item__score">
                                        {{ info.endorsement }}
                                    </div>
                                    <div class="shortInfo__item__name">
                                        Endorsement
                                    </div>
                                </li>
                            </ul>
                            <ul class="shortInfo">
                                <li class="shortInfo__item">
                                    <div class="shortInfo__item__score">
                                        {{ info.gamesWon }}
                                    </div>
                                    <div class="shortInfo__item__name">
                                        Total Wins
                                    </div>
                                </li>
                                <li class="shortInfo__item">
                                    <div class="shortInfo__item__score">
                                        {{ info.quickPlayStats.games.won }}
                                    </div>
                                    <div class="shortInfo__item__name">
                                        QuickPlay Wins
                                    </div>
                                </li>
                                <li class="shortInfo__item">
                                    <div class="shortInfo__item__score">
                                        {{
                                            info.competitiveStats.games.won
                                        }}
                                    </div>
                                    <div class="shortInfo__item__name">
                                        Competitive Win
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: 'Profile',
    components: {
        // CompIcon,
    },
    mounted() {
        // if (!this.isFilled) {
        //     this.$store.dispatch('profile/fetchData');
        // }
    },
    computed: {
        ...mapGetters('profile', ['info', 'hasData']),
        loading() {
            // if (this.hasData) {
            //     return false;
            // }
            // return true;
            return !this.hasData;
        },
        // isFilled() {
        //     return this.$store.state['profile'].isFilled;
        // },
        // info() {
        //     return this.$store.state['profile'].data;
        // },
    },
};
</script>

<style lang="scss" scoped>
@import '~@/styles/setup/variables';
@import '~@/styles/setup/mixin';

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
    background: linear-gradient(135deg, rgba($theme-color, .15), $theme-color);

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

    &__img {
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
        background: rgba($theme-color, .75);
        transform: translate(-50%,-50%);
    }
}

.profileName {
    margin-bottom: $spacing / 2;
    font-weight: bold;
    font-size: 1.8rem;
}

.profileLabel {
    padding: 3px 6px;
    border-radius: 8px;
    background: rgba($theme-color, .05);
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
        font-size: 1.6rem;
        text-align: center;
        cursor: pointer;

        // &:hover {
        //     color: $theme-color;
        //     background: rgba($theme-color, .05);
        // }

        &.isActive {
            color: $theme-color;
        }
    }
}

.tabContent {
    margin: 14px;
}

.shortInfo {
    display: flex;
    margin-bottom: $spacing * 2;

    &__item {
        flex: 1 1 0;
        text-align: center;

        &__score {
            margin: 0 auto 4px;
            color: $theme-color;
            font-weight: bold;
            font-size: 1.8rem;
        }

        &__name {
            margin: auto;
            font-size: 1.4rem;
        }
    }
}

.compInfo {
    &__ttl {
        margin: 0 auto $spacing;
        font-weight: bold;
        font-size: 1.8rem;
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
        color: $theme-color;
        font-size: 1.6rem;
    }
}

.json {
    font-size: .1rem;
}

.ratingClass {
    width: 100%;
    max-width: 30px;
}

@keyframes placeHolderShimmer {
    0% {
        background-position: -468px 0;
    }

    100% {
        background-position: 468px 0;
    }
}

.isLoading {
    $bg: rgba($theme-color, .2);
    $bg2: rgba($theme-color, .4);
    position: relative;
    background: #f6f7f8;
    background: $bg;
    background: linear-gradient(to right, $bg 8%, $bg2 18%, $bg 33%);
    background-size: 800px 104px;
    animation-name: placeHolderShimmer;
    animation-duration: 1.25s;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
    animation-fill-mode: forwards;
}

.dummyBlock {
    border-radius: 8px;
    color: transparent;
}

.slide-leave-active,
.slide-enter-active {
    transition: all .35s cubic-bezier(.25, .46, .45, .94);
}

.slide-enter {
    opacity: 0;
    transform: translate(0, 10px);
}

.slide-leave-to {
    opacity: 0;
    transform: translate(0, -10px);
}
</style>
