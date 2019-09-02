import firebase from 'firebase';

// Your web app's Firebase configuration
var config = {
    apiKey: "AIzaSyBSxiqgZEV1aiZdyMluxx6lnVWlgwd3fKg",
    authDomain: "overflect-db.firebaseapp.com",
    databaseURL: "https://overflect-db.firebaseio.com",
    projectId: "overflect-db",
    storageBucket: "overflect-db.appspot.com",
    messagingSenderId: "508792396440",
    appId: "1:508792396440:web:1a3698cb65b5034d",
};

firebase.initializeApp(config);

// firebase utils
const db = firebase.database();
const auth = firebase.auth();

// firebase collections
const resultsRef = db.ref('results');
const tankRef = db.ref('tankComp');
const damageRef = db.ref('damageComp');
const supportRef = db.ref('supportComp');

export {
    firebase,
    db,
    auth,
    resultsRef,
    tankRef,
    damageRef,
    supportRef,
}