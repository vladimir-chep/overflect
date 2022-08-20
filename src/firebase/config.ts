// import firebase from 'firebase/app';
import { initializeApp } from 'firebase/app';
// import 'firebase/database';
import { getDatabase, ref } from 'firebase/database';
// import 'firebase/auth';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBSxiqgZEV1aiZdyMluxx6lnVWlgwd3fKg',
  authDomain: 'overflect-db.firebaseapp.com',
  databaseURL: 'https://overflect-db.firebaseio.com',
  projectId: 'overflect-db',
  storageBucket: 'overflect-db.appspot.com',
  messagingSenderId: '508792396440',
  appId: '1:508792396440:web:1a3698cb65b5034d',
};

// firebase.initializeApp(config);
const app = initializeApp(firebaseConfig);
// const db = firebase.database();
const db = getDatabase(app);
// const auth = firebase.auth();
const auth = getAuth(app);

// collections
// const competitiveRef = db.ref('competitive');
const competitiveRef = ref(db, 'competitive');
// const tankRef = db.ref('competitive/tank');
// const damageRef = db.ref('competitive/damage');
// const supportRef = db.ref('competitive/support');
const tankRef = ref(db, 'competitive/tank');
const damageRef = ref(db, 'competitive/damage');
const supportRef = ref(db, 'competitive/support');
// const getRef = (refName) => db.ref(`competitive/${refName}`);
const getRef = (name: string) => ref(db, `competitive/${name}`);

const onCheck = new Promise((resolve) => {
  // auth.onAuthStateChanged((user) => {
  //   resolve(user);
  // });
  onAuthStateChanged(auth, (user) => {
    resolve(user);
  });
});

export {
  // firebase,
  db,
  auth,
  competitiveRef,
  tankRef,
  damageRef,
  supportRef,
  onCheck,
  getRef,
};
