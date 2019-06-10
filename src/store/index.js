import Vue from 'vue';
import Vuex from 'vuex';

import auth from './modules/auth';
import profile from './modules/profile';
import progress from './modules/progress';

Vue.use(Vuex);

const debug = true;

const store = new Vuex.Store({
    modules: {
        auth,
        profile,
        progress
    },
    strict: debug,
});

export default store;