const state = {
    visible: false,
    editMode: false,

    selectedRole: 'tank',

    // Edit mode
    key: null,
    created: '',
    season: 17,
    role: 'tank',
    winStatus: 1,
    rank: null,
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
    showEdit ({commit}) {
        commit('setVisible', true);
        commit('setEditMode', true);
    },
    hideEdit ({commit}) {
        commit('setVisible', false);
        commit('setEditMode', false);
    },
    getEditData({commit}, snap) {
        commit('updateEditMode', snap);
    },
};

const mutations = {
    setVisible(state, payload){
        state.visible = payload;
    },
    setEditMode(state, payload){
        state.editMode = payload;
    },
    updateEditMode(state, payload){
        // state.
        const {key, snap} = payload;
        console.log(key);
        console.log(snap);
        // created: "2019/7/30 - 15:59:20"
        // id: 1
        // rank: 1
        // role: "tank"
        // seasonNo: 17
        // winStatus: 1
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}