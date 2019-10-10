<template>
<div class="profile pageContent">
    <div class="profileHeader">
        <transition name="slide" mode="out-in">
            <div class="profileHeader__wrapper" v-if="loading" key="0">
                <div class="profileLogo">
                    <div class="profileLogo__img isLoading"></div>
                </div>
                <div class="profileName dummyBlock isLoading" style="width:30%; height:20px;"></div>
                <div class="profileLabel dummyBlock isLoading" style="width:9%; height:17px;"></div>
                <div class="dummyBlock isLoading" style="width:70%; height:18px; margin: 21px 0;"></div>
            </div>
            <div class="profileHeader__wrapper" v-else key="1">
                <div class="profileLogo">
                    <img :src="info.icon" alt="" class="profileLogo__img">
                </div>
                <p class="profileName">{{ info.name }}</p>
                <div class="profileLabel">{{ info.rating }}</div>
                <ul class="profileTabs">
                    <li :class="['profileTabs__item', {'isActive': activeTab === 0}]">Overview</li>
                    <li :class="['profileTabs__item', {'isActive': activeTab === 1}]">Stats</li>
                </ul>
            </div>
        </transition>
    </div>
    <div class="pageCore">
        <div class="pageCore__wrap">
            <transition name="slide" mode="out-in">
                <div v-if="loading" key="0">
                    <div class="tabContent">
                        <div class="dummyBlock isLoading" style="width:70%; height:16px; margin:0 auto 20px;"></div>
                        <div class="dummyBlock isLoading" style="width:100%; height:20px; margin:0 auto 20px;"></div>
                        <div class="dummyBlock isLoading" style="width:100%; height:20px; margin:0 auto 50px;"></div>
                        <div class="dummyBlock isLoading" style="width:50%; height:16px; margin:0 auto 20px;"></div>
                        <div class="dummyBlock isLoading" style="width:100%; height:20px; margin:0 auto 20px;"></div>
                        <div class="dummyBlock isLoading" style="width:100%; height:20px; margin:0 auto 20px;"></div>
                    </div>
                </div>
                <div v-else key="1">
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
                        <div class="compInfo" v-if="info.ratings.length != 0">
                            <h3 class="compInfo__ttl">Competative</h3>
                            <ul class="compInfo__row">
                                <li class="compCard" v-for="(role, index, key) in info.ratings" :key="key">
                                    <div class="compCard__roleIcon">
                                        <CompIcon :icon-name="role.role" />
                                    </div>
                                    <p class="compCard__role">{{ role.role }}</p>
                                    <p class="compCard__level">{{ role.level }}</p>
                                </li>
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
            </transition>
        </div>
    </div>
</div>
</template>

<script>
import CompIcon from '@/components/icons/competitive/Icon.vue';

export default {
    name: "profile",
    data() {
        return {
            activeTab: 0,
            panel: 1
        }
    },
    mounted() {
        if (!this.isFilled) {
            this.$store.dispatch('profile/fetchData');
        }
    },
    components: {
        CompIcon,
    },
    computed: {
        loading() {
            if (this.isFilled === true) {
                return false;
            }
            return true;
        },
        isFilled() {
            return this.$store.state['profile'].isFilled;
        },
        info() {
            return this.$store.state['profile'].data;
        },
    },
};
</script>

<style lang="scss">
@import '../styles/views/profile.scss';
</style>
