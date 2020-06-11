<template>
    <div class="progressTable">
        <div class="progressHeader">
            <p class="progressHeader__item">Plays ({{ numOfPlays }})</p>
            <p class="progressHeader__item">Rank</p>
            <p class="progressHeader__item">Tier</p>
            <p class="progressHeader__item">Diff</p>
            <p class="progressHeader__item details" v-if="!isSkipped">
                Details
            </p>
        </div>
        <ul class="progressList">
            <li
                class="progressList__item"
                v-for="(item, key) in sorted()"
                :key="key"
            >
                <div
                    :class="[
                        'cell',
                        'cell--plays',
                        addResultClass(item.winStatus)
                    ]"
                >
                    {{ item.id }}
                </div>
                <div class="cell cell--rank">{{ item.rank }}</div>
                <div class="cell cell--tier">
                    <img
                        class="rankImg"
                        :src="item.tier.url"
                        alt="item.tier.name"
                    />
                </div>
                <div
                    :class="[
                        'cell',
                        'cell--diff',
                        addResultClass(item.winStatus)
                    ]"
                >
                    <IconCarpet v-if="item.order !== 0" />
                    {{ item.diff }}
                </div>
                <div class="cell details" v-if="!isSkipped">
                    <button
                        class="progBtn"
                        @click="startEdit(selectedRole, item.key)"
                        :disabled="editMode"
                    >
                        <IconEdit />
                    </button>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import mixin from '@/mixins';
import IconEdit from '@/components/icons/Edit.vue';
import IconCarpet from '@/components/icons/Carpet.vue';
const fb = require('@/firebaseConfig.js');

export default {
    name: 'ProgressTable',
    mixins: [mixin],
    components: {
        IconEdit,
        IconCarpet,
    },
    data() {
        return {
            sortByNewest: true,

            editMode: false,
            editKey: null,
            editStatus: null,
            editRank: null,
        };
    },
    computed: {
        selectedRole() {
            return this.$store.state['editModule'].selectedRole;
        },
        numOfPlays() {
            return this.$store.getters['progress/getNum'];
        },
        isSkipped() {
            return this.$store.getters['auth/isSkipped'];
        },
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

                this.$store.dispatch('editModule/getEditData', {
                    key,
                    snap,
                });
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
        sorted() {
            // const arr = this.masterList[this.selectedSeason];
            const arr = this.$store.getters['progress/getMasterList'][
                this.$store.getters['progress/getSelectedSeason']
            ];

            const condition = arr && arr.length ? true : false;

            if (this.sortByNewest && condition) {
                return arr.map(e => e).reverse();
            }
            return arr;
        },
    },
};
</script>

<style lang="scss">
@import "../../styles/setup/variables";

@mixin cell {
    flex: 1 1 0;
    padding: $sps 0;
    text-align: center;
}

.progressHeader {
    display: flex;
    margin-bottom: 5px;

    &__item {
        @include cell;
        color: $gray;
        font-weight: bold;
        font-size: 1.4rem;
        text-align: center;
    }
}

.progressList {
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

.progressTable {
    padding: $l-px $l-px 0;
    background: #fff;
}

.cell {
    @include cell;

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
}

.details {
    display: flex;
    justify-content: space-around;
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
