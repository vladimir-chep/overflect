const state = {
    visible: false,
    editMode: false,

    selectedRole: 'tank',

    // Edit mode
    key: null,
    info: {
        season: 17,
        created: '',
        id: null,
    },
    role: 'tank',
    winStatus: 1,
    rank: null,
};

const getters = {};

const actions = {
    toggle ({
        commit
    }) {
        if (state.visible) {
            commit('setVisible', false);
            commit('setEditMode', false);
        } else {
            commit('setVisible', true);
        }
    },
    showEdit ({
        commit
    }) {
        commit('setVisible', true);
        commit('setEditMode', true);
    },
    hideEdit ({
        commit
    }) {
        commit('setVisible', false);
        commit('setEditMode', false);
    },
    getEditData ({
        commit
    }, snap) {
        commit('updateEditMode', snap);
    },
    switchRole({commit}, value){
        commit('setCurRole', value);
    },
    // updateRank({commit}, value) {
    //     commit('setRank', value);
    // },
};

const mutations = {
    setVisible (state, payload) {
        state.visible = payload;
    },
    setEditMode (state, payload) {
        state.editMode = payload;
    },
    setCurRole (state, payload) {
        state.selectedRole = payload;
    },
    setRank(state, rank){
        // state.rank = rank;
        state.rank = Object.assign({}, state.rank, rank);
    },
    updateEditMode (state, payload) {
        const {
            key,
            snap
        } = payload;
        const {
            created,
            id,
            rank,
            role,
            season,
            winStatus
        } = snap;

        state.key = key;
        state.info.season = season;
        state.info.created = created;
        state.info.id = id;
        state.rank = rank;
        state.role = role;
        state.winStatus = winStatus;
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}