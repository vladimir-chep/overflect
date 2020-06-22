const state = {
    visible: false,
    newItem: {
        role: 'tank',
        winStatus: 1,
        score: '',
    },
    editMode: false,
    editItem: null,
};

const getters = {
    visible: (state) => state.visible,
    editMode: (state) => state.editMode,
    role: (state) => state.newItem.role,
    winStatus: (state) => state.newItem.winStatus,
    score: (state) => state.newItem.score,
    editItem: (state) => state.editItem,
};

const actions = {
    toggle({ state, commit }) {
        if (state.visible) {
            commit('updateVisible', false);
            commit('switchEditMode', false);
            commit('reset');
        } else {
            commit('updateVisible', true);
        }
    },
    openEditCard({ commit }, payload) {
        commit('updateEditItem', payload);
        commit('switchEditMode', true);
        commit('updateVisible', true);
    },
};

const mutations = {
    updateVisible(state, payload) {
        state.visible = payload;
    },
    updateRole(state, payload) {
        state.newItem.role = payload;
    },
    updateWinStatus(state, payload) {
        state.newItem.winStatus = payload;
    },
    updateScore(state, payload) {
        state.newItem.score = payload;
    },
    switchEditMode(state, payload) {
        state.editMode = payload;
    },
    updateEditItem(state, payload) {
        const { key, snap } = payload;

        state.editItem = {
            ...snap,
            key,
        };
    },
    updateEditWinStatus(state, payload) {
        state.editItem.winStatus = payload;
    },
    reset(state) {
        state.newItem = {
            role: state.newItem.role,
            winStatus: 1,
            score: '',
        };
        state.editItem = null;
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};
