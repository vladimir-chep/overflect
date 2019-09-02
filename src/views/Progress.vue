<template>
    <div :class="['pageContent', {'is-paused': pagePaused}]">
        <Header>
            <slot>Progress</slot>
            <div slot="details">
                <Seasons />
            </div>
        </Header>
        <div class="pageCore">
            <div class="pageCore__wrap">
                <div class="card">
                    <Roles />
                    <div class="progressTable" v-if="displayed">
                        <div class="progressTable__header">
                            <p class="progressTable__header__item cell cell--plays">Plays ({{ numOfPlays }})</p>
                            <p class="progressTable__header__item cell cell--rank">Rank</p>
                            <p class="progressTable__header__item cell cell--tier">Tier</p>
                            <p class="progressTable__header__item cell cell--diff">Diff</p>
                            <p class="progressTable__header__item cell cell--details"
                            v-if="!isSkipped">Details</p>
                        </div>
                        <ul class="progressTable__list">
                            <li class="progressTable__list__item"
                                v-for="(item, key) in sorted(displayList)"
                                :key="key">
                                <div :class="['cell', 'cell--plays', addResultClass(item.winStatus)]">{{ item.id }}</div>
                                <div class="cell cell--rank">{{ item.rank }}</div>
                                <div class="cell cell--tier">
                                    <img class="rankImg"
                                        :src="item.tier.url"
                                        alt="item.tier.name">
                                </div>
                                <div :class="['cell', 'cell--diff', addResultClass(item.winStatus)]">
                                    <IconCarpet v-if="item.order !== 0"/>
                                    {{ item.diff }}
                                </div>
                                <div class="cell cell--details"
                                    v-if="!isSkipped">
                                    <button class="progBtn"
                                            @click="startEdit(selectedRole, item.key)"
                                            :disabled="editMode">
                                            <IconEdit/>
                                    </button>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <NothingDisplay v-else/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
const fb = require('@/firebaseConfig.js');
import mixin from '@/mixins';

import Header from '@/components/layout/Header.vue';

import Seasons from '@/components/Progress/Seasons.vue';
import Roles from '@/components/Progress/Roles/Roles.vue';
import NothingDisplay from '@/components/Progress/NothingDisplay.vue';

import IconEdit from '@/components/icons/Edit.vue';
import IconCarpet from '@/components/icons/Carpet.vue';

export default {
    name: 'ProgressList',
    mixins: [mixin],
    components: {
        Header,
        Seasons,
        Roles,
        NothingDisplay,
        IconEdit,
        IconCarpet,
    },
    data() {
        return {
            sortByNewest: true,

            // Edit mode
            editMode: false,
            editKey: null,
            editStatus: null,
            editRank: null
        };
    },
    computed: {
        selectedRole(){
            return this.$store.state['editModule'].selectedRole;
        },
        pagePaused() {
            return this.$store.state['editModule'].visible;
        },
        masterList() {
            return this.$store.getters['progress/getMasterList'];
        },
        seasons() {
            return this.$store.getters['progress/getSeasons'];
        },
        selectedSeason() {
            return this.$store.getters['progress/getSelectedSeason'];
        },
        displayList(){
            return this.masterList[this.selectedSeason];
        },
        displayed(){
            return this.displayList && this.displayList.length ? true : false;
        },
        numOfPlays() {
            return this.$store.getters['progress/getNum'];
        },
        isSkipped() {
            return this.$store.getters['auth/isSkipped'];
        }
    },
    methods: {
        addResultClass(value) {
            if (value === 0) return 'isLose';
            if (value === 1) return 'isWin';
            if (value === 2) return 'isDraw';
        },
        startEdit(role, key) {
            let ref;
            switch (role) {
                case 'tank':
                    ref = fb.tankRef;
                    break;
                case 'damage':
                    ref = fb.damageRef;
                    break;
                case 'support':
                    ref = fb.supportRef;
                    break;
                default:
                    break;
            }

            this.$store.dispatch('editModule/showEdit');

            ref.once('value', snapshot => {
                const snap = snapshot.child(key).val();
                console.log(snap);


                this.$store.dispatch('editModule/getEditData', {key, snap});
            });
        },
        submitEdit() {
            let newData = {
                rank: this.editRank,
                winStatus: this.editStatus,
            };

            fb.resultsRef
                .child(this.editKey)
                .child('rank')
                .set(newData.rank);
            fb.resultsRef
                .child(this.editKey)
                .child('winStatus')
                .set(newData.winStatus);
            fb.resultsRef
                .child(this.editKey)
                .child('edited')
                .set(this.getCurrentData());
            this.resetEdit();
        },
        resetEdit() {
            this.editRank = null;
            this.editStatus = null;
            this.editMode = false;
        },
        sorted(arr) {
            if (this.sortByNewest) {
                return arr.map(e => e).reverse();
            }
            return arr;
        }
    }
};
</script>

<style lang="scss">
@import '../styles/setup/variables';

.card {
    &__header {
        background: #fff;
    }
}

.roles {
    display: flex;
    align-items: center;
    text-align: center;
    &__item {
        flex: 1 1 0;
    }
}

.progressTable {
    background: #fff;
    padding: $l-px $l-px 0;

    &__header {
        display: flex;
        margin-bottom: 5px;

        &__item {
            padding: 1rem;
            color: $gray;
            font-weight: bold;
            font-size: 1.2rem;
            text-align: center;
        }
    }

    &__list {
        &__item {
            display: flex;
            align-items: center;
            border-bottom: 1px solid $hr;
            list-style: none;

            .cell {
                &--rank {
                    font-weight: bold;
                }

                &--diff {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-weight: bold;

                    svg {
                        width: 8px;
                        margin-right: 4px;

                        path {
                            fill: black;
                        }
                    }
                }
            }
        }
    }
}

.cell {
    flex: 1 1 0;
    padding: $sps 0;
    text-align: center;

    &--plays {
        @mixin cell--plays($bgColor) {
            display: inline-block;
            width: 10px;
            height: 10px;
            margin-right: 10px;
            border-radius: 50%;
            background-color: $bgColor;
            content: "";
        }

        &.isWin:before {
            @include cell--plays($success-color);
        }

        &.isLose:before {
            @include cell--plays($error-color);
        }

        &.isDraw:before {
            @include cell--plays($neutral-color);
        }
    }

    &--rank {
    }

    &--tier {
    }

    &--diff {
        &.isWin {
            color: $success-color;

            svg > path {
                fill: $success-color;
            }
        }

        &.isLose {
            color: $error-color;

            svg {
                transform: rotate(180deg);

                path {
                    fill: $error-color;
                }
            }
        }

        &.isDraw {
            color: $neutral-color;

            svg > path {
                fill: $neutral-color;
            }
        }
    }

    &--details {
        display: flex;
        justify-content: space-around;
    }
}

.progBtn {
    display: inline-flex;
    padding: 6px;
    border: none;
    border-radius: 8px;
    background: #f7f7f7;
    svg {
        height: 16px;

        path {
            fill: #242d44;
        }
    }
}

.rankImg {
    width: 100%;
    max-width: 22px;
    height: auto;
}
</style>
