// const fb = require('@/firebaseConfig');

const state = {
    numOfPlays: 0,

    seasons: [],
    selectedSeason: 0,

    tankList: [],
    damageList: [],
    supportList: [],
    masterList: {},

    tierScheme: [
        {
            name: 'Bronze',
            image: require('@/assets/images/ranks/Bronze.png'),
            min: 0,
            max: 1499
        },
        {
            name: 'Silver',
            image: require('@/assets/images/ranks/Silver.png'),
            min: 1500,
            max: 1999
        },
        {
            name: 'Gold',
            image: require('@/assets/images/ranks/Gold.png'),
            min: 2000,
            max: 2499
        },
        {
            name: 'Platinum',
            image: require('@/assets/images/ranks/Platinum.png'),
            min: 2500,
            max: 2999
        },
        {
            name: 'Diamond',
            image: require('@/assets/images/ranks/Diamond.png'),
            min: 3000,
            max: 3499
        },
        {
            name: 'Master',
            image: require('@/assets/images/ranks/Master.png'),
            min: 3500,
            max: 3999
        },
        {
            name: 'Grandmaster',
            image: require('@/assets/images/ranks/Grandmaster.png'),
            min: 4000,
            max: 4499
        },
        {
            name: 'Top500',
            image: require('@/assets/images/ranks/Top500.png'),
            min: 4500,
            max: 5000
        }
    ],
};

const getters = {
    getSeasons: state => {
        const seasons = [];
        Object.keys(state.masterList).forEach(key => seasons.push(Number(key)));
        return seasons;
    },
    getMasterList: state => state.masterList,
    getNum: state => state.numOfPlays,
    getSelectedSeason: state => state.selectedSeason,
    getDisplayStatus: state => {
        const masterList = state.masterList[state.selectedSeason];
        return masterList && masterList.length ? true : false;
    }
};

const actions = {
    fetchResults ({
        commit
    }, fbRef) {
        fbRef.on('value', snapshot => {
            const master = {};

            snapshot.forEach(child => {
                let val = child.exportVal();
                let obj = {
                    created: val.created,
                    id: val.id,
                    rank: val.rank,
                    role: val.role,
                    winStatus: val.winStatus,
                    key: child.key,
                    season: val.season,
                };

                if (val.edited) {
                    obj.edited = val.edited;
                }

                if (!master[val.season]) {
                    master[val.season] = [];
                }
                master[val.season].push(obj);
            });

            Object.keys(master).forEach(key => {
                master[key].forEach((val, index, arr) => {
                    val.diff = calcDiff();
                    val.tier = calcTier();

                    function calcDiff () {
                        let result = 0;
                        if (index !== 0) {
                            let cur = val.rank;
                            let prev = arr[index - 1].rank;
                            result = cur - prev;
                        }

                        return result;
                    }

                    function calcTier () {
                        let foundOne = state.tierScheme.find(e => {
                            if (val.rank >= e.min && val.rank <= e.max) return e;
                        });
                        return {
                            name: foundOne.name,
                            url: foundOne.image || "none"
                        };
                    }
                });
            });

            // Array with all results
            let allResults = [];
            Object.keys(master).forEach(key => allResults.push(master[key]));
            master['0'] = allResults.flat();

            commit('updateNum', snapshot.numChildren());
            commit('updateMasterList', master);
        });
    },
};

const mutations = {
    updateNum (state, num) {
        state.numOfPlays = num;
    },
    updateMasterList (state, results) {
        state.masterList = results;
    },
    setSelectedSeason (state, payload) {
        state.selectedSeason = payload;
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}