<template>
    <div :class="['pageContent', {'is-paused': pagePaused}]">
        <Header>
            <slot>Progress</slot>
            <div slot="details">
                <svg width="17"
                     height="17"
                     viewBox="0 0 17 17"
                     fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M8.5 0C3.80591 0 0 3.80728 0 8.5C0 13.1955 3.80591 17 8.5 17C13.1941 17 17 13.1955 17 8.5C17 3.80728 13.1941 0 8.5 0ZM8.5 15.3548C4.71161 15.3548 1.64516 12.2897 1.64516 8.5C1.64516 4.71287 4.71174 1.64516 8.5 1.64516C12.287 1.64516 15.3548 4.71171 15.3548 8.5C15.3548 12.2883 12.2897 15.3548 8.5 15.3548ZM12.1757 6.60806C12.1757 8.90622 9.69353 8.94159 9.69353 9.79087V10.0081C9.69353 10.2352 9.50938 10.4194 9.28224 10.4194H7.71773C7.49059 10.4194 7.30644 10.2352 7.30644 10.0081V9.71128C7.30644 8.48615 8.23527 7.99641 8.93717 7.60287C9.53906 7.26544 9.90795 7.03594 9.90795 6.58908C9.90795 5.99798 9.15395 5.60565 8.54439 5.60565C7.7496 5.60565 7.3827 5.98188 6.86694 6.63281C6.72789 6.80829 6.47416 6.84089 6.29572 6.70561L5.34208 5.98249C5.16704 5.84978 5.12783 5.60321 5.25146 5.42166C6.06125 4.23255 7.0927 3.56452 8.69859 3.56452C10.3805 3.56452 12.1757 4.87736 12.1757 6.60806ZM9.93952 12.3387C9.93952 13.1325 9.29376 13.7782 8.5 13.7782C7.70624 13.7782 7.06048 13.1325 7.06048 12.3387C7.06048 11.545 7.70624 10.8992 8.5 10.8992C9.29376 10.8992 9.93952 11.545 9.93952 12.3387Z"
                        fill="#242D44" />
                </svg>
            </div>
        </Header>
        <br>
        <button @click="switchList('tank')">Tank</button>|
        <button @click="switchList('damage')">Damage</button>|
        <button @click="switchList('support')">Support</button>
        <br>
        <div v-if="filteredList.length"
             class="pageCore">
            <div class="pageCore__wrap">
                <div class="viewSettings">
                    <div class="viewSettings__item">
                        Season:
                        <select name="" id="">
                            <option value="17">17</option>
                            <option value="18">18</option>
                        </select>
                    </div>
                </div>
                <div class="progressTable">
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
                            v-for="(item, key) in sorted(filteredList)"
                            :key="key">
                            <div :class="['cell', 'cell--plays', addResultClass(item.winStatus)]">{{ item.id }}</div>
                            <div class="cell cell--rank">{{ item.rank }}</div>
                            <div class="cell cell--tier">
                                <img class="rankImg"
                                     :src="item.tier.url"
                                     alt="item.tier.name">
                            </div>
                            <div :class="['cell', 'cell--diff', addResultClass(item.winStatus)]">
                                <svg v-if="item.order !== 0"
                                     viewBox="0 0 8 4"
                                     fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path d="M7.46093 4H0.53906C0.0597662 4 -0.180257 3.48908 0.158649 3.19028L3.61958 0.138917C3.82967 -0.0463058 4.17032 -0.0463058 4.38041 0.138917L7.84134 3.19028C8.18027 3.48908 7.94022 4 7.46093 4Z"
                                          fill="none" />
                                </svg>
                                {{ item.diff }}
                            </div>
                            <div class="cell cell--details"
                                 v-if="!isSkipped">
                                <button class="progBtn"
                                        @click="remove(item.key)"
                                        :disabled="editMode">
                                    <svg class="progBtn__icon progBtn__icon--delete"
                                         viewBox="0 0 16 18"
                                         fill="none"
                                         preserveAspectRatio="xMidYMin slice"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path d="M0 2.95312V1.96875C0 1.50117 0.376172 1.125 0.84375 1.125H4.78125L5.11172 0.467578C5.25234 0.179297 5.54414 0 5.86406 0H9.88242C10.2023 0 10.4941 0.179297 10.6383 0.467578L10.9687 1.125H14.9062C15.3738 1.125 15.75 1.50117 15.75 1.96875V2.95312C15.75 3.18516 15.5602 3.375 15.3281 3.375H0.421875C0.189844 3.375 0 3.18516 0 2.95312ZM14.625 4.92188V16.3125C14.625 17.2441 13.8691 18 12.9375 18H2.8125C1.88086 18 1.125 17.2441 1.125 16.3125V4.92188C1.125 4.68984 1.31484 4.5 1.54687 4.5H14.2031C14.4352 4.5 14.625 4.68984 14.625 4.92188ZM5.0625 7.3125C5.0625 7.00313 4.80937 6.75 4.5 6.75C4.19062 6.75 3.9375 7.00313 3.9375 7.3125V15.1875C3.9375 15.4969 4.19062 15.75 4.5 15.75C4.80937 15.75 5.0625 15.4969 5.0625 15.1875V7.3125ZM8.4375 7.3125C8.4375 7.00313 8.18437 6.75 7.875 6.75C7.56562 6.75 7.3125 7.00313 7.3125 7.3125V15.1875C7.3125 15.4969 7.56562 15.75 7.875 15.75C8.18437 15.75 8.4375 15.4969 8.4375 15.1875V7.3125ZM11.8125 7.3125C11.8125 7.00313 11.5594 6.75 11.25 6.75C10.9406 6.75 10.6875 7.00313 10.6875 7.3125V15.1875C10.6875 15.4969 10.9406 15.75 11.25 15.75C11.5594 15.75 11.8125 15.4969 11.8125 15.1875V7.3125Z" />
                                    </svg>
                                </button>
                                <button class="progBtn"
                                        @click="startEdit(selectedRole, item.key)"
                                        :disabled="editMode">
                                    <svg class="progBtn__icon progBtn__icon--edit"
                                         viewBox="0 0 18 18"
                                         fill="none"
                                         preserveAspectRatio="xMidYMin slice"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1.5 0C0.671573 0 0 0.671573 0 1.5V16.5C0 17.3284 0.671573 18 1.5 18H16.5C17.3284 18 18 17.3284 18 16.5V7.65533C18 7.32124 17.5961 7.15393 17.3598 7.39017L15.9697 8.78033C15.829 8.92098 15.75 9.11175 15.75 9.31066V14.25C15.75 15.0784 15.0784 15.75 14.25 15.75H3.75C2.92157 15.75 2.25 15.0784 2.25 14.25V3.75C2.25 2.92157 2.92157 2.25 3.75 2.25H8.68934C8.88825 2.25 9.07902 2.17098 9.21967 2.03033L10.6098 0.640165C10.8461 0.403929 10.6788 0 10.3447 0H1.5Z" />
                                        <path d="M12.6858 2.50699L15.4502 5.22816C15.5666 5.3428 15.5666 5.52985 15.4502 5.64449L8.75682 12.2332L5.91276 12.544C5.53274 12.5862 5.21094 12.2694 5.25385 11.8954L5.56952 9.09574L12.2629 2.50699C12.3793 2.39235 12.5693 2.39235 12.6858 2.50699ZM17.6506 1.81613L16.155 0.343919C15.6892 -0.11464 14.9322 -0.11464 14.4633 0.343919L13.3784 1.41188C13.262 1.52652 13.262 1.71356 13.3784 1.8282L16.1428 4.54938C16.2592 4.66402 16.4493 4.66402 16.5657 4.54938L17.6506 3.48142C18.1165 3.01985 18.1165 2.27469 17.6506 1.81613Z" />
                                    </svg>
                                </button>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div v-else
             class="pageContent">
            <div class="pageContent__wrap">
                <div class="notFound">
                    <svg class="notFound__icon"
                         viewBox="0 0 34 34"
                         fill="none"
                         preserveAspectRatio="xMidYMin slice"
                         xmlns="http://www.w3.org/2000/svg">
                        <path d="M17 0C7.60887 0 0 7.60887 0 17C0 26.3911 7.60887 34 17 34C26.3911 34 34 26.3911 34 17C34 7.60887 26.3911 0 17 0ZM11.5161 11.5161C12.7294 11.5161 13.7097 12.4964 13.7097 13.7097C13.7097 14.923 12.7294 15.9032 11.5161 15.9032C10.3028 15.9032 9.32258 14.923 9.32258 13.7097C9.32258 12.4964 10.3028 11.5161 11.5161 11.5161ZM23.5806 24.6774H10.4194C8.96613 24.6774 8.96613 22.4839 10.4194 22.4839H23.5806C25.0339 22.4839 25.0339 24.6774 23.5806 24.6774ZM22.4839 15.9032C21.2706 15.9032 20.2903 14.923 20.2903 13.7097C20.2903 12.4964 21.2706 11.5161 22.4839 11.5161C23.6972 11.5161 24.6774 12.4964 24.6774 13.7097C24.6774 14.923 23.6972 15.9032 22.4839 15.9032Z" />
                    </svg>
                    <p class="notFound__txt">Nothing to display</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
const fb = require("@/firebaseConfig.js");
import mixin from "@/mixins";
import Header from "@/components/layout/Header.vue";

export default {
    name: "ProgressList",
    mixins: [mixin],
    components: {
        Header
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
        filteredList() {
            return this.$store.state['progress'].activeList;
        },
        numOfPlays() {
            return this.$store.getters['progress/getNum'];
        },
        isSkipped() {
            return this.$store.getters['auth/isSkipped'];
        }
    },
    methods: {
        switchList(value){
            switch (value) {
                case 'tank':
                    this.$store.dispatch('progress/fetchResults', fb.tankRef);
                    this.$store.commit('editModule/setCurRole', 'tank');
                    break;
                case 'damage':
                    this.$store.dispatch('progress/fetchResults', fb.damageRef);
                    this.$store.commit('editModule/setCurRole', 'damage');
                    break;
                case 'support':
                    this.$store.dispatch('progress/fetchResults', fb.supportRef);
                    this.$store.commit('editModule/setCurRole', 'support');
                    break;
                default:
                    break;
            }
        },
        addResultClass(value) {
            if (value === 0) return "isLose";
            if (value === 1) return "isWin";
            if (value === 2) return "isDraw";
        },
        startEdit(role, key) {
            // this.editMode = true;
            // this.editKey = key;

            // ref.once("value", snapshot => {
            //     const thisItem = snapshot.child(key).val();

            //     this.editStatus = thisItem.winStatus;
            //     this.editRank = thisItem.rank;
            // });

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
                .child("rank")
                .set(newData.rank);
            fb.resultsRef
                .child(this.editKey)
                .child("winStatus")
                .set(newData.winStatus);
            fb.resultsRef
                .child(this.editKey)
                .child("edited")
                .set(this.getCurrentData());
            this.resetEdit();
        },
        resetEdit() {
            this.editRank = null;
            this.editStatus = null;
            this.editMode = false;
        },
        remove(key) {
            // this.$store.dispatch('progress/remove', key);
            fb.resultsRef.child(key).remove();
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
@import "../styles/setup/_variables";

.progressTable {
    padding: 0 $l-px;

    &__header {
        display: flex;
        margin-bottom: 5px;
        border-bottom: 2px solid $hr;

        &__item {
            padding: 1rem;
            color: $gray;
            font-weight: bold;
            font-size: 1.2rem;
            /* flex: 1 1 0; */
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
        /* flex: 1 1 0; */
        /* width: calc(100% / 12 * 2); */
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
        /* flex: 1 1 0; */

        /* width: calc(100%/12 * 3); */
    }

    &--tier {
        /* flex: 1 1 0; */

        /* width: calc(100%/12 * 1); */
    }

    &--diff {
        /* flex: 1 1 0; */
        /* width: calc(100%/12 * 3); */

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
        /* width: calc(100% / 12 * 3); */
        /* flex: 1 1 auto; */
    }
}

.progBtn {
    display: inline-flex;
    padding: 6px;
    border: none;
    border-radius: 8px;
    background: #f7f7f7;

    &__icon {
        /* width: 16px; */
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

.notFound {
    margin-top: 50%;
    text-align: center;

    &__icon {
        width: 34px;
        margin: 16px;

        path {
            fill: $text-light;
        }
    }

    &__txt {
        color: $text-light;
        font-weight: bold;
        font-size: 2.4rem;
    }
}
</style>
