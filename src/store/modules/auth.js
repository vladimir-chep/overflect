import firebase from 'firebase';
import router from '@/router';

const state = {
    user: null,
    error: null,
    loading: false,
};

const getters = {
    isAuthenticated (state) {
        return state.user !== null && state.user !== undefined;
    }
};

const actions = {
    userSignUp ({
        commit
    }, payload) {
        commit('setLoading', true);
        firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
            .then(firebaseUser => {
                commit('setUser', {
                    email: firebaseUser.user.email,
                })
                commit('setLoading', false);
                router.push('/profile');
            })
            .catch(error => {
                commit('setError', error.message);
                commit('setLoading', false);
            })
    },
    userSignIn ({
        commit
    }, payload) {
        commit('setLoading', true);
        firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
            .then(firebaseUser => {
                commit('setUser', {
                    email: firebaseUser.user.email,
                })
                commit('setLoading', false);
                commit('setError', null);
                router.push('/profile');
            })
            .catch(error => {
                commit('setError', error.message);
                commit('setLoading', false);
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
        firebase.auth().signOut();
        commit('setUser', null);
        router.push('/');
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
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}