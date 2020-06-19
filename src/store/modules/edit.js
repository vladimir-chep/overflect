const state = {
    visible: false,
    newItem: {
        role: 'tank',
        winStatus: 1,
        score: '',
    },
    editMode: false,
    editRole: 'tank',
    editItem: null,
    // selectedRole: 'tank',

    // Edit mode
    key: null,
    info: {
        season: 0,
        created: '',
        id: null,
    },
    role: 'tank',
    winStatus: 1,
    rank: null,
};

const getters = {
    visible: (state) => state.visible,
    editMode: (state) => state.editMode,
    role: (state) => state.newItem.role,
    winStatus: (state) => state.newItem.winStatus,
    score: (state) => state.newItem.score,
    editRole: (state) => state.editRole,
    editItem: (state) => state.editItem,

    selectedRole: (state) => state.selectedRole,
    isEditMode: (state) => state.editMode,
    getKey: (state) => state.key,
    getInfo: (state) => state.info,
    getSeason: (state) => state.info.season,
    getRole: (state) => state.role,
    getWinStatus: (state) => state.winStatus,
    getRank: (state) => state.rank,
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
    // toggleAddCard ({
    //     commit,
    // }, payload) {
    //     commit('updateEditItem', payload);
    //     commit('switchEditMode', true);
    //     commit('updateVisible', true);
    // },
    openEditCard({ commit }, payload) {
        commit('updateEditItem', payload);
        commit('switchEditMode', true);
        commit('updateVisible', true);
    },
    // closeEditCard ({
    //     commit,
    // }) {
    //     // commit('updateEditItem', null);
    //     commit('switchEditMode', false);
    //     commit('updateVisible', false);
    // },
    // hideEdit({ commit }) {
    //     commit('updateVisible', false);
    //     commit('setEditMode', false);
    // },
    // getEditData({ commit }, snap) {
    //     commit('switchEditMode', snap);
    // },
    // updateRole({ commit }, value) {
    //     commit('setRole', value);
    // },
    // updateWinStatus({ commit }, value) {
    //     commit('setWinStatus', value);
    // },
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
    switchEditRole(state, payload) {
        state.editRole = payload;
    },

    // setEditMode(state, payload) {
    //     state.editMode = payload;
    // },
    // setSelectedRole(state, payload) {
    //     state.selectedRole = payload;
    // },
    updateEditItem (state, payload) {
        const {
            key,
            snap,
        } = payload;
        // const {
        //     created,
        //     id,
        //     rank,
        //     role,
        //     winStatus,
        // } = snap;

        state.editItem = {
            ...snap,
            key,
        };
        // console.log(state.editItem);


        // state.key = key;
        // state.info.created = created;
        // state.info.id = id;
        // state.rank = rank;
        // state.role = role;
        // state.winStatus = winStatus;
    },
    // setRole(state, payload) {
    //     state.role = payload;
    // },
    // setWinStatus(state, payload) {
    //     state.winStatus = payload;
    // },
    setRank(state, payload) {
        state.rank = payload;
    },
    // updateEditMode(state, payload) {
    //     const { key, snap } = payload;
    //     const { created, id, rank, role, winStatus } = snap;

    //     state.key = key;
    //     state.info.created = created;
    //     state.info.id = id;
    //     state.rank = rank;
    //     state.role = role;
    //     state.winStatus = winStatus;
    // },
    reset(state) {
        // state.role = 'tank';
        // state.winStatus = 1;
        // state.rank = null;
        // state.key = null;

        state.info.created = '';
        state.info.id = null;

        state.newItem = {
            // role: state.editRole,
            role: 'tank',
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
