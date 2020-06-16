import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

var config = {
    apiKey: 'AIzaSyBSxiqgZEV1aiZdyMluxx6lnVWlgwd3fKg',
    authDomain: 'overflect-db.firebaseapp.com',
    databaseURL: 'https://overflect-db.firebaseio.com',
    projectId: 'overflect-db',
    storageBucket: 'overflect-db.appspot.com',
    messagingSenderId: '508792396440',
    appId: '1:508792396440:web:1a3698cb65b5034d',
};

firebase.initializeApp(config);

// firebase utils
const db = firebase.database();
const auth = firebase.auth();

// firebase collections
// const resultsRef = db.ref('results');
// const _tankRef = db.ref('tankComp');
// const _damageRef = db.ref('damageComp');
// const _supportRef = db.ref('supportComp');
const competitiveRef = db.ref('competitive');
const tankRef = db.ref('competitive/tank');
const damageRef = db.ref('competitive/damage');
const supportRef = db.ref('competitive/support');

const getRef = (refName) => db.ref(`competitive/${refName}`);
const checkAuth = new Promise((resolve) => {
    auth.onAuthStateChanged((user) => {
        resolve(user);
    });
});

export { firebase, db, auth, competitiveRef, tankRef, damageRef, supportRef, checkAuth, getRef };
