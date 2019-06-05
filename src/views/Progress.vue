<template>
<div class="progress">
    <h1>This is a progress page</h1>
    <h2>Progress</h2>
    <div class="contaider-full">
        <table class="progressTable">
            <thead>
                <tr>
                    <th scope="col">Plays({{ numOfPlays }})</th>
                    <th scope="col">Rank</th>
                    <th scope="col">Tier</th>
                    <th scope="col">Diff</th>
                    <th scope="col">Details</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, key) in resultList" :key="key">
                    <!-- {{ item.winStatus }} -->
                    <th :class="addResultClass(item.winStatus)" scope="row">{{ key+1 }}</th>
                    <td>{{ item.rank }}</td>
                    <td>{{ item.tier.name }}</td>
                    <td>{{ item.diff }}</td>
                    <td class="dev-todo">
                        <button @click="remove(item.key)">X</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>

</div>
</template>

<script>
import firebase from 'firebase';

export default {
    name: 'progressList',
    data() {
        return {
            database: null,
            resultsRef: null,

            resultList: [],

            numOfPlays: 0,
        }
    },
    created() {
        this.database = firebase.database();
        this.resultsRef = this.database.ref('results');
        this.resultsRef.on('value', snapshot => {
            const resultList = [];
            let order = 0;

            snapshot.forEach(child => {
                let val = child.exportVal();
                let obj = {
                    order: order,
                    key: child.key,
                    rank: val.rank,
                    winStatus: val.winStatus,
                    date: val.date,
                };
                resultList.push(obj);
                order++;
            });

            resultList.forEach((val, index, arr) => {
                val.diff = calcDiff();
                val.tier = calcTier();
                // calcTier();

                function calcDiff() {
                    let result = '-';
                    if (index !== 0) {
                        let cur = val.rank;
                        let prev = arr[index - 1].rank;

                        result = cur - prev;
                    }
                    return result;
                }

                function calcTier() {
                    const tierScheme = [{
                            name: 'Bronze',
                            image: '',
                            min: 0,
                            max: 1499,
                        },
                        {
                            name: 'Silver',
                            image: '',
                            min: 1500,
                            max: 1999,
                        },
                        {
                            name: 'Gold',
                            image: '',
                            min: 2000,
                            max: 2499,
                        },
                        {
                            name: 'Platinum',
                            image: '',
                            min: 2500,
                            max: 2999,
                        },
                        {
                            name: 'Diamond',
                            image: '',
                            min: 3000,
                            max: 3499,
                        },
                        {
                            name: 'Master',
                            image: '',
                            min: 3500,
                            max: 3999,
                        },
                        {
                            name: 'Grandmaster',
                            image: '',
                            min: 4000,
                            max: 4499,
                        },
                        {
                            name: 'Top500',
                            image: '',
                            min: 4500,
                            max: 5000,
                        },
                    ];
                    let foundOne = tierScheme.find(e => {
                        if (val.rank >= e.min && val.rank <= e.max) return e;
                    });
                    return {
                        name: foundOne.name,
                        url: foundOne.url || 'none',
                    };
                }
            });

            this.numOfPlays = snapshot.numChildren();
            this.resultList = resultList;
        });
    },
    computed: {},
    methods: {
        addResultClass(value) {
            let baseClass = 'winStatus';
            if (value === 'draw') return `${baseClass} isDraw`;
            if (value) return `${baseClass} isWin`;
            if (!value) return `${baseClass} isLose`;
        },
        remove(key) {
            this.resultsRef.child(key).remove();
        },
    },
}
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
        padding: .75rem;
        border-top: 1px solid #F0F0F2;
        text-align: center;
    }

    thead {
        th {
            color: #AFB2BC;
            vertical-align: bottom;
            border-bottom: 2px solid #F0F0F2;
        }
    }

    .dev-todo {
        color: #c7c5c5;
    }
}

.winStatus {
    &:before {
        content: '';
        width: 10px;
        height: 10px;
        display: inline-block;
        background: #AFB2BC;
        border-radius: 50%;
        margin-right: 10px;
    }

    &.isWin:before {
        background: #19CF36;
    }

    &.isLose:before {
        background: #E51B1B;
    }

    &.isDraw:before {}
}
</style>
