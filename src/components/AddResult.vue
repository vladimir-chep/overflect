<template>
<div class="addResult">
    <div class="button" :class="{'is-on':show}" @click="show = !show">+</div>
    <div class="block" :class="{'is-on':show}">
        <p>Add result</p>
        <div>
            <input type="radio" id="win" value="win" v-model="winStatus">
            <label for="win">Win</label>
            <input type="radio" id="draw" value="draw" v-model="winStatus">
            <label for="draw">Draw</label>
            <input type="radio" id="lose" value="lose" v-model="winStatus">
            <label for="lose">Lose</label>
            <br>
            <span>Selected: {{ winStatus }}</span>
        </div>
        <br>
        <div>
            <input type="number" placeholder="Insert score" v-model="newScore">
            <button type="submit" @click="addResult()">Add</button>
        </div>
    </div>
</div>
</template>

<script>
import firebase from 'firebase';

export default {
    data() {
        return {
            show: true,

            resultRef: null,
            newTodoName: '',

            newScore: '',
            winStatus: '',
        }
    },
    created() {
        this.database = firebase.database();
        this.resultsRef = firebase.database().ref('results');
        this.resultsRef.on('value', snapshot => this.resultList = snapshot.val());
    },
    methods: {
        addResult() {
            if (this.newScore == "" && this.winStatus === '') return;

            const newData = {
                score: this.newScore,
                winStatus: this.winStatus,
            };
            this.resultsRef.push(newData);
            this.newScore = "";
            this.winStatus = null;
        },
    },
}
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
    transition: .25s all ease-in-out;
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
    transition: .25s all ease-in-out;

    &.is-on {
        transform: translateY(0%);
    }
}
</style>
