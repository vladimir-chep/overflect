import axios from 'axios';

/**
 * Ow-API (Overwatch API)
 * @description https://ow-api.com/docs/
 * @access https://ow-api.com/v1/stats/pc/asia/Noyt-11939/profile
 */

const state = {
    url: 'https://ow-api.com/v1/stats/pc/asia/Noyt-11939/profile',
    data: null,
    isFilled: false,
};

const getters = {
    info: (state) => state.data,
    hasData: (state) => state.data !== null,
};

const actions = {
    getData({ state, commit }) {
        return axios
            .get(state.url)
            .then((result) => {
                commit('updateData', result.data);
            })
            .catch((error) => {
                console.error(`${error}. Is this url '${state.url}' ok? `);
            });
    },
};

const mutations = {
    updateData(state, payload) {
        state.data = payload;
        state.isFilled = true;
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};
