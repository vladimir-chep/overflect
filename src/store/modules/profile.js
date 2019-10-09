import axios from 'axios';

/**
 * Ow-API (Overwatch API)
 * @description https://ow-api.com/docs/
 * @access https://ow-api.com/v1/stats/pc/asia/Noyt-11939/profile
 */

const state = {
    url:"https://ow-api.com/v1/stats/pc/asia/Noyt-11939/profile",
    data: {},
    isFilled: false,
};

const getters = {};

const actions = {
    fetchData ({
        commit
    }) {
        axios.get(state.url).then(result => {
            commit('setData', result.data);
        });
        commit('switchFlag', true);
    }
};

const mutations = {
    switchFlag(state, payload){
        state.isFilled = payload;
    },
    setData (state, payload) {
        state.data = payload;
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}