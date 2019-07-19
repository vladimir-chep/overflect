const state = {
    pagePaused: false,
};

const getters = {
};

const actions = {
    switchPageScroll ({commit}) {
        if (state.pagePaused){
            commit('setPageScroll', false);
        } else {
            commit('setPageScroll', true);
        }
    },
};

const mutations = {
    setPageScroll(state, payload){
        // console.log(payload);
        state.pagePaused = payload;
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}