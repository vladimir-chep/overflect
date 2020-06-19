import { getRef } from '@/firebase/config';

const calcDiff = (val, index, arr) => {
    let result = 0;
    if (index !== 0) {
        let cur = val.score;
        let prev = arr[index - 1].score;
        result = cur - prev;
    }
    return result;
};
const getTier = (el, tierScheme) => {
    const founded = tierScheme.find((tier) => {
        if (el.score >= tier.min && el.score <= tier.max) {
            return tier;
        }
    });
    return {
        name: founded.name,
        url: founded.image || 'none',
    };
};

const state = {
    loading: true,
    role: 'tank',
    numOfPlays: {
        tank: 0,
        damage: 0,
        support: 0,
    },
    roleResults: {
        tank: [],
        damage: [],
        support: [],
    },
    tierScheme: [
        {
            name: 'Bronze',
            image: require('@/assets/images/ranks/Bronze.png'),
            min: 0,
            max: 1499,
        },
        {
            name: 'Silver',
            image: require('@/assets/images/ranks/Silver.png'),
            min: 1500,
            max: 1999,
        },
        {
            name: 'Gold',
            image: require('@/assets/images/ranks/Gold.png'),
            min: 2000,
            max: 2499,
        },
        {
            name: 'Platinum',
            image: require('@/assets/images/ranks/Platinum.png'),
            min: 2500,
            max: 2999,
        },
        {
            name: 'Diamond',
            image: require('@/assets/images/ranks/Diamond.png'),
            min: 3000,
            max: 3499,
        },
        {
            name: 'Master',
            image: require('@/assets/images/ranks/Master.png'),
            min: 3500,
            max: 3999,
        },
        {
            name: 'Grandmaster',
            image: require('@/assets/images/ranks/Grandmaster.png'),
            min: 4000,
            max: 4499,
        },
        {
            name: 'Top500',
            image: require('@/assets/images/ranks/Top500.png'),
            min: 4500,
            max: 5000,
        },
    ],
};

const getters = {
    loading: (state) => state.loading,
    currentRole: (state) => state.role,
    numOfPlays: (state) => state.numOfPlays[state.role],
    currentResults: (state) => state.roleResults[state.role],
    tierScheme: (state) => state.tierScheme,
};

const actions = {
    fetchRoleNumOfPlays({ state, commit }) {
        return new Promise((resolve) => {
            getRef(state.role)
                .once('value')
                .then((snapshot) => {
                    commit('updateNumOfPlays', snapshot.numChildren());
                    resolve();
                });
        });
    },
    fetchRoleResults({ commit }, roleName) {
        return new Promise((resolve) => {
            getRef(roleName).on('value', (snapshot) => {
                const results = [];
                if (snapshot.exists()) {
                    commit('updateNumOfPlays', snapshot.numChildren());
                    snapshot.forEach((play) => {
                        const value = play.exportVal();

                        results.push({
                            ...value,
                            key: play.key,
                            edited: value.edited ? value.edited : null,
                        });
                    });
                } else {
                    commit('updateNumOfPlays', 0);
                }

                results.forEach((result, index, arr) => {
                    results[index].diff = calcDiff(result, index, arr);
                    results[index].tier = getTier(result, state.tierScheme);
                });

                commit('updateResults', results);
                resolve();
            });
        });
    },
    switchRole({ state, commit, dispatch }, roleName) {
        return new Promise((resolve) => {
            dispatch('switchLoading', true);
            commit('updateRole', roleName);
            if (state.roleResults[roleName].length === 0) {
                dispatch('fetchRoleResults', roleName).then(() => {
                    dispatch('switchLoading');
                    resolve();
                });
            } else {
                dispatch('fetchRoleNumOfPlays').then(() => {
                    dispatch('switchLoading');
                    resolve();
                });
            }
        });
    },
    switchLoading({ commit }, value = false) {
        commit('updateLoadingStatus', value);
    },
};

const mutations = {
    updateRole(state, role) {
        state.role = role;
    },
    updateNumOfPlays(state, number) {
        state.numOfPlays[state.role] = number;
    },
    updateResults(state, results) {
        state.roleResults[state.role] = results;
    },
    updateLoadingStatus(state, status) {
        state.loading = status;
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};
