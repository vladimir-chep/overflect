<template>
    <div class="progress">
        <h1>This is a progress page</h1>
        <div class="contaider-full"
             v-if="resultList.length">
            <div v-if="editMode"
                 class="">
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
                        <th scope="col">Details</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, key) in filteredList"
                        :key="key">
                        <th :class="addResultClass(item.winStatus)"
                            scope="row">{{ item.order+1 }}</th>
                        <td>{{ item.rank }}</td>
                        <td>{{ item.tier.name }}</td>
                        <td>{{ item.diff }}</td>
                        <td class="dev-todo">
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
</template>

<script>
import firebase from "firebase";

export default {
    name: "progressList",
    data() {
        return {
            database: null,
            resultsRef: null,

            resultList: [],

            numOfPlays: 0,

            // Edit mode
            editMode: false,
            editKey: null,
            editStatus: null,
            editRank: null
        };
    },
    created() {
        this.database = firebase.database();
        this.resultsRef = this.database.ref("results");
        this.resultsRef.on("value", snapshot => {
            const resultList = [];
            let order = 0;

            snapshot.forEach(child => {
                let val = child.exportVal();
                let obj = {
                    order: order,
                    key: child.key,
                    rank: val.rank,
                    winStatus: val.winStatus,
                    date: val.date
                };
                resultList.push(obj);
                order++;
            });

            resultList.forEach((val, index, arr) => {
                val.diff = calcDiff();
                val.tier = calcTier();

                function calcDiff() {
                    let result = "-";
                    if (index !== 0) {
                        let cur = val.rank;
                        let prev = arr[index - 1].rank;

                        result = cur - prev;
                    }
                    return result;
                }

                function calcTier() {
                    const tierScheme = [
                        {
                            name: "Bronze",
                            image: "",
                            min: 0,
                            max: 1499
                        },
                        {
                            name: "Silver",
                            image: "",
                            min: 1500,
                            max: 1999
                        },
                        {
                            name: "Gold",
                            image: "",
                            min: 2000,
                            max: 2499
                        },
                        {
                            name: "Platinum",
                            image: "",
                            min: 2500,
                            max: 2999
                        },
                        {
                            name: "Diamond",
                            image: "",
                            min: 3000,
                            max: 3499
                        },
                        {
                            name: "Master",
                            image: "",
                            min: 3500,
                            max: 3999
                        },
                        {
                            name: "Grandmaster",
                            image: "",
                            min: 4000,
                            max: 4499
                        },
                        {
                            name: "Top500",
                            image: "",
                            min: 4500,
                            max: 5000
                        }
                    ];
                    let foundOne = tierScheme.find(e => {
                        if (val.rank >= e.min && val.rank <= e.max) return e;
                    });
                    return {
                        name: foundOne.name,
                        url: foundOne.url || "none"
                    };
                }
            });

            this.numOfPlays = snapshot.numChildren();
            this.resultList = resultList;
        });
    },
    computed: {
        filteredList() {
            let filteredList = this.resultList;
            if (!this.sortToNew) filteredList.reverse();
            return filteredList;
        }
    },
    watch: {},
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
            this.resultsRef.once("value", snapshot => {
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
            this.resultsRef.child(this.editKey).set(newData);

            this.resetEdit();
        },
        resetEdit() {
            this.editRank = null;
            this.editStatus = null;
            this.editMode = false;
        },
        remove(key) {
            this.resultsRef.child(key).remove();
        }
    }
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
