import Vue from 'vue';
import App from '@/App.vue';
import router from '@/router';
import store from '@/store';
const fb = require('@/firebaseConfig');

import Default from '@/layouts/Default.vue';
import Login from '@/layouts/Login.vue';

import '@/styles/main.scss';

Vue.component('layout-default', Default);
Vue.component('layout-login', Login);

Vue.config.productionTip = false;

let app;
fb.auth.onAuthStateChanged(firebaseUser => {
    if (!app) {
        app = new Vue({
            el: '#app',
            router,
            store,
            render: h => h(App),
            created () {
                if (firebaseUser) {
                    store.dispatch('auth/autoSignIn', firebaseUser);
                }
                this.$store.dispatch('progress/fetchResults');
            },
        });
    }
});