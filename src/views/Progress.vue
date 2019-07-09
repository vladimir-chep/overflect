<template>
    <div class="pageContent">
        <Header>
            <slot>Progress</slot>
            <div slot="details">
                <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.5 0C3.80591 0 0 3.80728 0 8.5C0 13.1955 3.80591 17 8.5 17C13.1941 17 17 13.1955 17 8.5C17 3.80728 13.1941 0 8.5 0ZM8.5 15.3548C4.71161 15.3548 1.64516 12.2897 1.64516 8.5C1.64516 4.71287 4.71174 1.64516 8.5 1.64516C12.287 1.64516 15.3548 4.71171 15.3548 8.5C15.3548 12.2883 12.2897 15.3548 8.5 15.3548ZM12.1757 6.60806C12.1757 8.90622 9.69353 8.94159 9.69353 9.79087V10.0081C9.69353 10.2352 9.50938 10.4194 9.28224 10.4194H7.71773C7.49059 10.4194 7.30644 10.2352 7.30644 10.0081V9.71128C7.30644 8.48615 8.23527 7.99641 8.93717 7.60287C9.53906 7.26544 9.90795 7.03594 9.90795 6.58908C9.90795 5.99798 9.15395 5.60565 8.54439 5.60565C7.7496 5.60565 7.3827 5.98188 6.86694 6.63281C6.72789 6.80829 6.47416 6.84089 6.29572 6.70561L5.34208 5.98249C5.16704 5.84978 5.12783 5.60321 5.25146 5.42166C6.06125 4.23255 7.0927 3.56452 8.69859 3.56452C10.3805 3.56452 12.1757 4.87736 12.1757 6.60806ZM9.93952 12.3387C9.93952 13.1325 9.29376 13.7782 8.5 13.7782C7.70624 13.7782 7.06048 13.1325 7.06048 12.3387C7.06048 11.545 7.70624 10.8992 8.5 10.8992C9.29376 10.8992 9.93952 11.545 9.93952 12.3387Z" fill="#242D44"/>
                </svg>
            </div>
        </Header>
        <div v-if="filteredList.length"
             class="pageCore pageCore--hasBG">
            <div class="pageCore__wrap">
                <div v-if="editMode">
                    <h4>Edit Item</h4>
                    <div>
                        <input type="radio"
                            id="win"
                            :value="1"
                            v-model="editStatus">
                        <label for="win">Win</label>
                        <input type="radio"
                            id="draw"
                            :value="2"
                            v-model="editStatus">
                        <label for="draw">Draw</label>
                        <input type="radio"
                            id="lose"
                            :value="0"
                            v-model="editStatus">
                        <label for="lose">Lose</label>
                        <br>
                    </div>
                        <input type="number"
                        placeholder="Insert new score"
                        v-model.number="editRank">
                        <button type="submit"
                            @click="submitEdit">Submit</button>
                        <button type="submit"
                            @click="resetEdit">Cancel</button>
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
                            <div :class="['cell', 'cell--plays', addResultClass(item.winStatus)]">{{ item.order+1 }}</div>
                            <div class="cell cell--rank">{{ item.rank }}</div>
                            <div class="cell cell--tier">{{ item.tier.name }}</div>
                            <div :class="['cell', 'cell--diff', addResultClass(item.winStatus)]">
                                <svg v-if="item.order !== 0" viewBox="0 0 8 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M7.46093 4H0.53906C0.0597662 4 -0.180257 3.48908 0.158649 3.19028L3.61958 0.138917C3.82967 -0.0463058 4.17032 -0.0463058 4.38041 0.138917L7.84134 3.19028C8.18027 3.48908 7.94022 4 7.46093 4Z" fill="none"/>
                                </svg>
                                {{ item.diff }}
                            </div>
                            <div class="cell cell--details"
                                 v-if="!isSkipped">
                                <button @click="remove(item.key)"
                                        :disabled="editMode">X</button>
                                <button @click="startEdit(item.key)"
                                        :disabled="editMode">Edit</button>
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
        filteredList() {
            return this.$store.state["progress"].list;
        },
        numOfPlays() {
            return this.$store.getters["progress/getNum"];
        },
        isSkipped() {
            return this.$store.getters["auth/isSkipped"];
        }
    },
    methods: {
        addResultClass(value) {
            if (value === 0) return "isLose";
            if (value === 1) return "isWin";
            if (value === 2) return "isDraw";
        },
        startEdit(key) {
            this.editMode = true;
            this.editKey = key;

            fb.resultsRef.once("value", snapshot => {
                const thisItem = snapshot.child(key).val();

                this.editStatus = thisItem.winStatus;
                this.editRank = thisItem.rank;
            });
        },
        submitEdit() {
            let newData = {
                rank: this.editRank,
                winStatus: this.editStatus
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
        border-bottom: 2px solid $hr;
        margin-bottom: 5px;
        &__item {
            font-size: 1.2rem;
            font-weight: bold;
            color: $gray;
            /* flex: 1 1 0; */
            text-align: center;
            padding: 1rem;
        }
    }
    &__list {
        &__item {
            list-style: none;
            display: flex;
            align-items: center;
            border-bottom: 1px solid $hr;
            .cell {
                &--rank {
                    font-weight: bold;
                }
                &--diff {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    svg{
                        margin-right: 4px;
                        width:8px;
                        path{
                            fill: black
                        }
                    }
                    font-weight: bold;
                }
            }
        }
    }
}
.cell {
    text-align: center;
    padding: $sps 0;
    /* flex: 1 1 0; */
    &--plays {
        /* flex: 1 1 0; */
        width: calc(100% / 12 * 2);
        @mixin cell--plays($bgColor) {
            background-color: $bgColor;
            display: inline-block;
            width: 10px;
            height: 10px;
            margin-right: 10px;
            border-radius: 50%;
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

        width: calc(100%/12 * 3);
    }
    &--tier {
        /* flex: 1 1 0; */

        width: calc(100%/12 * 1);
    }
    &--diff {
        /* flex: 1 1 0; */
        width: calc(100%/12 * 3);

        &.isWin {
            color: $success-color;
            svg>path{
                fill: $success-color;
            }
        }

        &.isLose {
            color: $error-color;
            svg {
                transform: rotate(180deg);
                path{
                    fill: $error-color;
                }
            }
        }

        &.isDraw {
            color: $neutral-color;
            svg>path{
                fill: $neutral-color;
            }
        }
    }
    &--details {
        width: calc(100% / 12 * 3);
        /* flex: 1 1 auto; */
    }
}

.notFound {
    text-align: center;
    margin-top: 50%;
    &__icon {
        width: 34px;
        margin: 16px;
        path {
            fill: $text-light;
        }
    }
    &__txt {
        font-weight: bold;
        font-size: 2.4rem;
        color: $text-light;
    }
}
</style>
