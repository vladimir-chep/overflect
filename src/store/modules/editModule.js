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

const getters = {
    isEditMode: state => state.editMode,
    getKey: state => state.key,
    getInfo: state => state.info,
    getSeason: state => state.info.season,
    getRole: state => state.role,
    getWinStatus: state => state.winStatus,
    getRank: state => state.rank,
};

const actions = {
    toggle ({
        commit
    }) {
        if (state.visible) {
            commit('setVisible', false);
            commit('setEditMode', false);
            commit('reset');
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
    updateRole ({
        commit
    }, value) {
        commit('setRole', value);
    },
    updateSeason ({
        commit
    }, value) {
        commit('setSeason', value);
    },
    updateWinStatus ({
        commit
    }, value) {
        commit('setWinStatus', value);
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
    setSelectedRole (state, payload) {
        state.selectedRole = payload;
    },
    setRole (state, payload) {
        state.role = payload;
    },
    setWinStatus (state, payload) {
        state.winStatus = payload;
    },
    setRank (state, payload) {
        state.rank = payload;
    },
    // setRank (state, rank) {
    //     state.rank = Object.assign({}, state.rank, rank);
    // },
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
    reset (state, payload) {
        state.role = 'tank';
        state.winStatus = 1;
        state.rank = null;
        state.key = null,
        state.info.season = 17;
        state.info.created = '';
        state.info.id = null;
    },
    setSeason (state, payload) {
        state.info.season = payload;
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}