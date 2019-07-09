<template>
    <div :class="['addPanel', {'is-on':showed}]">
        <p class="addPanel__ttl">Add result</p>
        <div class="addPanel__resultInput">
            <div class="addPanel__resultInput__item">
                <input type="radio"
                       id="win"
                       :value="1"
                       v-model="winStatus">
                <label class="resultInput-win"
                       for="win">Win</label>
            </div>
            <div class="addPanel__resultInput__item">
                <input type="radio"
                       id="draw"
                       :value="2"
                       v-model="winStatus">
                <label class="resultInput-draw"
                       for="draw">Draw</label>
            </div>
            <div class="addPanel__resultInput__item">
                <input type="radio"
                       id="lose"
                       :value="0"
                       v-model="winStatus">
                <label class="resultInput-lose"
                       for="lose">Lose</label>
            </div>
        </div>
        <input type="number"
               placeholder="Insert score"
               class="addPanel__rankInput"
               v-model.number="newRank">
        <button type="submit"
                class="addPanel__add"
                :disabled="notActive"
                @click="addResult()">Add</button>
    </div>
</template>

<script>
import mixin from "@/mixins";
const fb = require("@/firebaseConfig.js");

export default {
    mixins: [mixin],
    props: ["showed"],
    data() {
        return {
            // isShowed: false,

            errors: {
                rank: false,
                winStatus: false
            },

            resultRef: null,

            newRank: "",
            winStatus: 1
        };
    },
    watch: {
        showed(value) {
            if (!value) {
                this.reset();
            }
        }
    },
    computed: {
        isSkipped() {
            return this.$store.getters["auth/isSkipped"];
        },
        notActive() {
            return this.newRank !== "" ? false : true;
        }
    },
    methods: {
        reset() {
            this.newRank = "";
            this.winStatus = 1;
        },
        addResult() {
            if (!checkWinStatus(this.winStatus)) return;
            if (!checkNewRank(this.newRank)) return;

            const newData = {
                rank: this.newRank,
                winStatus: this.winStatus,
                created: this.getCurrentData()
            };

            fb.resultsRef.push(newData);
            this.reset();

            function checkNewRank(value) {
                if (isNaN(value)) {
                    console.log("Rank: Not a number!");
                    return false;
                }
                if (value <= 0 || value > 5000) {
                    console.log("Rank: Weird value!");
                    return false;
                }
                return true;
            }

            function checkWinStatus(value) {
                if (isNaN(value)) {
                    console.log("Win status: Not a number!");
                    return false;
                }
                if (value === null) {
                    console.log("Win status: Empty!");
                    return false;
                }
                return true;
            }
        }
    }
};
</script>

<style lang="scss">
@import "../styles/setup/_variables";
.addPanel {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 36px;
    padding-bottom: 100px;
    border-radius: 8px;
    background: #fff;
    transform: translateY(100%);
    transition: 0.25s all ease-in-out;
    box-shadow: $shadow2;

    &.is-on {
        transform: translateY(0%);
    }
    &__ttl {
        font-size: 2.4rem;
        margin-bottom: 24px;
    }
    &__resultInput {
        margin-bottom: 20px;
        display: flex;
        align-content: center;
        margin: 0 -10px 10px;
        &__item {
            flex: 1 1 0;
            margin: 10px;
            input {
                position: absolute;
                opacity: 0;
                pointer-events: none;
                + label {
                }
            }
            input:checked {
                + label {
                    &.resultInput {
                        &-win {
                            background-color: $success-color;
                        }
                        &-draw {
                            background-color: $neutral-color;
                        }
                        &-lose {
                            background-color: $error-color;
                        }
                    }
                }
            }
            label {
                background-color: $unactive-color;
                display: block;
                width: 100%;
                padding: 14px;
                border-radius: 8px;
                color: #fff;
                font-weight: bold;
                font-size: 1.8rem;
                outline-style: none;
                appearance: none;
                text-transform: uppercase;
                border-width: 0;
            }
        }
    }
    &__rankInput {
        display: block;
        width: 100%;
        height: 46px;
        line-height: 1;
        margin-bottom: 2rem;
        padding: 0 20px;
        border-width: 0;
        border-radius: 8px;
        box-shadow: inset 0 0 0 1px #f1f1f1;
        /* color: #c4c4c4; */
        background-color: #f1f1f1;
        font-size: 1.8rem;
        text-align: center;
        transition-property: all;
        transition-duration: 80ms;
        transition-timing-function: ease-in-out;
        outline-style: none;
        appearance: none;
        text-transform: uppercase;
    }
    &__add {
        background: $success-color;
        display: block;
        width: 100%;
        padding: 15px;
        border-radius: 8px;
        color: #fff;
        font-weight: bold;
        font-size: 1.8rem;
        outline-style: none;
        appearance: none;
        text-transform: uppercase;
        border-width: 0;
        margin-bottom: 20px;
        &:disabled {
            /* background: $light2; */
            background-color: $unactive-color;

            /* filter: grayscale(1); */
        }
    }
}
</style>