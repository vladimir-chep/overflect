import router from '@/router';
const fb = require('@/firebaseConfig');

const state = {
    user: null,
    error: null,
    loading: false,
    without: false,
};

const getters = {
    isAuthenticated (state) {
        return state.user !== null && state.user !== undefined;
    },
    isSkipped (state) {
        return state.without;
    }
};

const actions = {
    userSignUp ({
        commit
    }, payload) {
        // commit('setLoading', true);
        fb.auth.createUserWithEmailAndPassword(payload.email, payload.password)
            .then(firebaseUser => {
                commit('setUser', {
                    email: firebaseUser.user.email,
                })
                // commit('setLoading', false);
                router.push('/profile');
            })
            .catch(error => {
                commit('setError', error.message);
                // commit('setLoading', false);
            })
    },
    userSignIn ({
        commit
    }, payload) {
        // commit('setLoading', true);
        commit('setWithout', false);
        fb.auth.signInWithEmailAndPassword(payload.email, payload.password)
            .then(firebaseUser => {
                commit('setUser', {
                    email: firebaseUser.user.email,
                })
                // commit('setLoading', false);
                commit('setError', null);
                router.push('/profile');
            })
            .catch(error => {
                commit('setError', error.message);
                // commit('setLoading', false);
            });
    },
    autoSignIn ({
        commit
    }, payload) {
        commit('setUser', {
            email: payload.email,
        })
    },
    userSignOut ({
        commit
    }) {
        fb.auth.signOut();
        commit('setUser', null);
        router.push('/signin');
    },
    continueWithout ({
        commit
    }){
        commit('setWithout', true);
        router.push('/profile');
    }
};

const mutations = {
    setUser (state, payload) {
        state.user = payload;
    },
    setError (state, payload) {
        state.error = payload;
    },
    setLoading (state, payload) {
        state.loading = payload;
    },
    setWithout (state, payload) {
        state.without = payload;
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}