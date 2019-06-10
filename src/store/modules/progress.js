const fb = require('../../firebaseConfig');

const state = {
    // database: firebase.database(),
    ref: null,

    list: [],
    numOfPlays: 0,
    tierScheme: [
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
    ],
};

const getters = {
    getResults: state => state.list,
    getNum: state => state.numOfPlays,
    // getStatusValue: () => 0,
};

const actions = {
    fetchResults ({
        commit
    }) {
        fb.resultsRef.on("value", snapshot => {
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
                    let foundOne = state.tierScheme.find(e => {
                        if (val.rank >= e.min && val.rank <= e.max) return e;
                    });
                    return {
                        name: foundOne.name,
                        url: foundOne.url || "none"
                    };
                }
            });

            commit('updateNum', snapshot.numChildren());
            commit('updateResults', resultList);
        });
    },
    add({commit}, payload){
        fb.resultsRef.push(payload);
    },
    remove({commit}, payload){
        fb.resultsRef.child(payload).remove();
    },
};

const mutations = {
    updateNum(state, num){
        state.numOfPlays = num;
    },
    updateResults(state, results){
        state.list = results;
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}