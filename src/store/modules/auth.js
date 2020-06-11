import router from '@/router';
const fb = require('@/firebaseConfig');

const state = {
    email: 'web00chepvl@gmail.com',
    user: null,
    error: null,
    without: false,
    loading: false,
};

const getters = {
    isAuthenticated(state) {
        return state.user !== null && state.user !== undefined;
    },
    isSkipped(state) {
        return state.without;
    },
};

const actions = {
    userSignUp({ commit }, payload) {
        fb.auth
            .createUserWithEmailAndPassword(payload.email, payload.password)
            .then((firebaseUser) => {
                commit('setUser', {
                    email: firebaseUser.user.email,
                });
                router.push('/profile');
            })
            .catch((error) => {
                commit('setError', error.message);
            });
    },
    userSignIn({ commit }, payload) {
        commit('setLoading', true);
        commit('setWithout', false);
        fb.auth
            .signInWithEmailAndPassword(state.email, payload.password)
            .then((firebaseUser) => {
                commit('setUser', {
                    email: firebaseUser.user.email,
                });
                commit('setLoading', false);
                commit('setError', null);
                router.push('/profile');
            })
            .catch((error) => {
                commit('setLoading', false);
                commit('setError', error.message);
            });
    },
    autoSignIn({ commit }, payload) {
        commit('setUser', {
            email: payload.email,
        });
    },
    userSignOut({ commit }) {
        fb.auth.signOut();
        commit('setUser', null);
        router.push('/signin');
    },
    continueWithout({ commit }) {
        commit('setWithout', true);
        router.push('/profile');
    },
};

const mutations = {
    setUser(state, payload) {
        state.user = payload;
    },
    setError(state, payload) {
        state.error = payload;
    },
    setLoading(state, payload) {
        state.loading = payload;
    },
    setWithout(state, payload) {
        state.without = payload;
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};
