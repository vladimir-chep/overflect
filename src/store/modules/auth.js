import router from '@/router';
import { auth } from '@/firebase/config';

const state = {
    user: null,
    error: null,
    skip: false,
    loading: false,
};

const getters = {
    isAuthenticated: (state) => state.user !== null && state.user !== undefined,
    skip: (state) => state.skip,
};

const actions = {
    manualSignIn({ commit }, payload) {
        commit('setLoading', true);
        commit('setSkip', false);
        auth.signInWithEmailAndPassword(payload.email, payload.password)
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
    manualSignOut({ commit }) {
        auth.signOut();
        commit('setUser', null);
        router.push('/sign-in');
    },
    autoSignIn({ commit }, payload) {
        commit('setUser', {
            email: payload.email,
        });
    },
    skipSignIn({ commit }) {
        commit('setSkip', true);
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
    setSkip(state, payload) {
        state.skip = payload;
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};
