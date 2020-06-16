import Vue from 'vue';
import Vuex from 'vuex';

import auth from './modules/auth';
import profile from './modules/profile';
import progress from './modules/progress';
import edit from './modules/edit';

Vue.use(Vuex);

const debug = true;

const store = new Vuex.Store({
    modules: {
        auth,
        profile,
        edit,
        progress,
    },
    strict: debug,
});

export default store;
