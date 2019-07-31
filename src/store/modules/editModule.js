const state = {
    visible: false,
    editMode: false,
};

const getters = {};

const actions = {
    toggle ({commit}) {
        if (state.visible){
            commit('setVisible', false);
        } else {
            commit('setVisible', true);
        }
    },
};

const mutations = {
    setVisible(state, payload){
        state.visible = payload;
    },
    setEditMode(state, payload){
        state.editMode = payload;
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}