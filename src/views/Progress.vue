<template>
<div class="progress pageWrapper">
    <Header>Progress</Header>
    <div class="pageContent">
        <h1>This is a progress page</h1>
        <div class="contaider-full" v-if="filteredList.length">
            <div v-if="editMode" class="">
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
                    <br>
                    <br>
            </div>
            <table class="progressTable">
                <thead>
                    <tr>
                        <th scope="col">Plays ({{ numOfPlays }})</th>
                        <th scope="col">Rank</th>
                        <th scope="col">Tier</th>
                        <th scope="col">Diff</th>
                        <th scope="col" v-if="!isSkipped">Details</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, key) in sorted(filteredList)" :key="key">
                        <th :class="addResultClass(item.winStatus)" scope="row">{{ item.order+1 }}</th>
                        <td>{{ item.rank }}</td>
                        <td>{{ item.tier.name }}</td>
                        <td>{{ item.diff }}</td>
                        <td class="dev-todo" v-if="!isSkipped">
                            <button @click="remove(item.key)"
                            :disabled="editMode">X</button>
                            <button @click="startEdit(item.key)"
                            :disabled="editMode">Edit</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div v-else>
            <h2 style="text-align:center">Nothing to display</h2>
        </div>
    </div>
</div>
</template>

<script>
import mixin from '@/mixins';
const fb = require('@/firebaseConfig.js');
import Header from '@/components/layout/Header.vue';

export default {
    name: "ProgressList",
    mixins: [mixin],
    components: {
        Header,
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
            return this.$store.state['progress'].list;
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
            let baseClass = "winStatus";
            if (value === 0) return `${baseClass} isLose`;
            if (value === 1) return `${baseClass} isWin`;
            if (value === 2) return `${baseClass} isDraw`;
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

            fb.resultsRef.child(this.editKey).child('rank').set(newData.rank);
            fb.resultsRef.child(this.editKey).child('winStatus').set(newData.winStatus);
            fb.resultsRef.child(this.editKey).child('edited').set(this.getCurrentData());
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
    },
};
</script>

<style lang="scss">
.contaider-full {
    padding: 16px;
    background: #fff;
}

.progressTable {
    width: 100%;
    border-collapse: collapse;

    th,
    td {
        padding: 0.75rem;
        border-top: 1px solid #f0f0f2;
        text-align: center;
    }

    thead {
        th {
            vertical-align: bottom;
            border-bottom: 2px solid #f0f0f2;
            color: #afb2bc;
        }
    }

    .dev-todo {
        color: #c7c5c5;
    }
}

.winStatus {
    &:before {
        display: inline-block;
        width: 10px;
        height: 10px;
        margin-right: 10px;
        border-radius: 50%;
        background: transparent;
        content: "";
    }

    &.isWin:before {
        background: #19cf36;
    }

    &.isLose:before {
        background: #e51b1b;
    }

    &.isDraw:before {
        background: #afb2bc;
    }
}
</style>
