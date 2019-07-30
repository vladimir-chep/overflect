const fb = require('@/firebaseConfig');

const state = {
    numOfPlays: 0,
    list: [],
    tierScheme: [
        {
            name: "Bronze",
            image: require('@/assets/images/ranks/Bronze.png'),
            min: 0,
            max: 1499
        },
        {
            name: "Silver",
            image: require('@/assets/images/ranks/Silver.png'),
            min: 1500,
            max: 1999
        },
        {
            name: "Gold",
            image: require('@/assets/images/ranks/Gold.png'),
            min: 2000,
            max: 2499
        },
        {
            name: "Platinum",
            image: require('@/assets/images/ranks/Platinum.png'),
            min: 2500,
            max: 2999
        },
        {
            name: "Diamond",
            image: require('@/assets/images/ranks/Diamond.png'),
            min: 3000,
            max: 3499
        },
        {
            name: "Master",
            image: require('@/assets/images/ranks/Master.png'),
            min: 3500,
            max: 3999
        },
        {
            name: "Grandmaster",
            image: require('@/assets/images/ranks/Grandmaster.png'),
            min: 4000,
            max: 4499
        },
        {
            name: "Top500",
            image: require('@/assets/images/ranks/Top500.png'),
            min: 4500,
            max: 5000
        }
    ],
};

const getters = {
    getResults: state => state.list,
    getNum: state => state.numOfPlays,
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
                    created: val.created
                };
                resultList.push(obj);
                order++;
            });

            resultList.forEach((val, index, arr) => {
                val.diff = calcDiff();
                val.tier = calcTier();
                function calcDiff() {
                    let result = 0;
                    if (index !== 0) {
                        let cur = val.rank;
                        let prev = arr[index - 1].rank;
                        result = cur - prev;
                    }
                    // console.log(result);

                    return result;
                }
                function calcTier() {
                    let foundOne = state.tierScheme.find(e => {
                        if (val.rank >= e.min && val.rank <= e.max) return e;
                    });
                    return {
                        name: foundOne.name,
                        url: foundOne.image || "none"
                    };
                }
            });

            commit('updateNum', snapshot.numChildren());
            commit('updateResults', resultList);
        });
    },
    // add({commit}, payload){
    //     fb.resultsRef.push(payload);
    // },
    // remove({commit}, payload){
    //     fb.resultsRef.child(payload).remove();
    // },
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