import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from 'axios';
import firebase from 'firebase';
import './styles/main.scss';

/**
 * Ow-API (Overwatch API)
 * @description https://ow-api.com/docs/
 * @access https://ow-api.com/v1/stats/pc/asia/Noyt-11939/profile
 */

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBSxiqgZEV1aiZdyMluxx6lnVWlgwd3fKg",
    authDomain: "overflect-db.firebaseapp.com",
    databaseURL: "https://overflect-db.firebaseio.com",
    projectId: "overflect-db",
    storageBucket: "overflect-db.appspot.com",
    messagingSenderId: "508792396440",
    appId: "1:508792396440:web:1a3698cb65b5034d",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

Vue.prototype.$http = axios;
Vue.config.productionTip = false;
/* eslint-disable no-new */
const unsubscribe = firebase.auth().onAuthStateChanged((firebaseUser) => {
    new Vue({
        router,
        store,
        render: h => h(App),
        created () {
            if (firebaseUser) {
                store.dispatch('autoSignIn', firebaseUser)
            }
        }
    }).$mount('#app');
    unsubscribe();
})