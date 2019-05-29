import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import firebase from 'firebase';
import './styles/main.scss';

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBSxiqgZEV1aiZdyMluxx6lnVWlgwd3fKg",
    authDomain: "overflect-db.firebaseapp.com",
    databaseURL: "https://overflect-db.firebaseio.com",
    projectId: "overflect-db",
    storageBucket: "overflect-db.appspot.com",
    messagingSenderId: "508792396440",
    appId: "1:508792396440:web:1a3698cb65b5034d"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');