import axios from 'axios';

/**
 * Ow-API (Overwatch API)
 * @description https://ow-api.com/docs/
 * @access https://ow-api.com/v1/stats/pc/asia/Noyt-11939/profile
 */

const state = {
    data: null,
};

const getters = {
    info: (state) => state.data,
    hasData: (state) => state.data !== null,
};

const actions = {
    getData({ commit }) {
        return axios
            .get('https://ow-api.com/v1/stats/pc/asia/Noyt-11939/profile')
            .then((result) => {
                commit('updateData', result.data);
            })
            .catch((error) => {
                console.error(`${error}. Is this url ok? `);
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
