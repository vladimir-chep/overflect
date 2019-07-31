import Vue from 'vue';
import Vuex from 'vuex';

import common from './modules/common';
import auth from './modules/auth';
import profile from './modules/profile';
import progress from './modules/progress';
import editModule from './modules/editModule';

Vue.use(Vuex);

const debug = true;

const store = new Vuex.Store({
    modules: {
        common,
        auth,
        profile,
        progress,
        editModule
    },
    strict: debug,
});

export default store;