import Vue from 'vue';
import App from '@/App.vue';
import router from '@/router';
import store from '@/store';
import { checkAuth } from '@/firebase/config';

import '@/styles/main.scss';

Vue.config.productionTip = false;

checkAuth.then((firebaseUser) => {
    if (firebaseUser) {
        store.dispatch('auth/autoSignIn', firebaseUser);
    }
    new Vue({
        el: '#app',
        router,
        store,
        render: (h) => h(App),
    });
});
