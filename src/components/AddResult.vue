<template>
    <div class="addResult">
        <div class="button"
             :class="{'is-on':show}"
             @click="show = !show">+</div>
        <div class="block"
             :class="{'is-on':show}">
            <p>Add result</p>
            <div>
                <input type="radio"
                       id="win"
                       :value="1"
                       v-model="winStatus">
                <label for="win">Win</label>
                <input type="radio"
                       id="draw"
                       :value="2"
                       v-model="winStatus">
                <label for="draw">Draw</label>
                <input type="radio"
                       id="lose"
                       :value="0"
                       v-model="winStatus">
                <label for="lose">Lose</label>
                <input type="radio"
                       id="dummy"
                       :value="3"
                       v-model="winStatus">
                <label for="dummy">Calibration</label>
                <br>
                <span>Selected: {{ winStatus }}</span>
            </div>
            <br>
            <div>
                <input type="number"
                       placeholder="Insert score"
                       v-model.number="newRank">
                <button type="submit"
                        @click="addResult()">Add</button>
            </div>
        </div>
    </div>
</template>

<script>
import mixin from '@/mixins';

export default {
    mixins:[mixin],
    data() {
        return {
            show: false,

            errors: {
                rank: false,
                winStatus: false
            },

            resultRef: null,

            newRank: null,
            winStatus: null
        };
    },
    methods: {
        addResult() {
            if (!checkWinStatus(this.winStatus)) return;
            if (!checkNewRank(this.newRank)) return;

            const newData = {
                rank: this.newRank,
                winStatus: this.winStatus,
                created: this.getCurrentData()
            };

            this.$store.dispatch('progress/add', newData);
            this.newRank = null;
            this.winStatus = null;

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

<style lang="scss" scoped>
.button {
    position: absolute;
    top: -50%;
    left: 50%;
    z-index: 1;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    color: #fff;
    background: #7b4bff;
    font-size: 40px;
    transition: 0.25s all ease-in-out;
    cursor: pointer;

    &.is-on {
        transform: rotate(45deg);
    }

    &:hover {
        background: lighten($color: #7b4bff, $amount: 10%);
    }
}

.block {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 15px;
    padding-bottom: 100px;
    border: 4px solid #7b4bff;
    border-radius: 8px;
    background: #fff;
    transform: translateY(100%);
    transition: 0.25s all ease-in-out;

    &.is-on {
        transform: translateY(0%);
    }
}
</style>
