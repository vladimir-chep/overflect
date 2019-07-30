import Vue from 'vue';
import Vuex from 'vuex';

import common from './modules/common';
import auth from './modules/auth';
import profile from './modules/profile';
import progress from './modules/progress';

Vue.use(Vuex);

const debug = true;

const store = new Vuex.Store({
    modules: {
        common,
        auth,
        profile,
        progress
    },
    strict: debug,
});

export default store;