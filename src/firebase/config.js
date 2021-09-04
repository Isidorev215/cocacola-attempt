import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/analytics'; 

const firebaseConfig = {
    apiKey: "AIzaSyDN4MkFGhhKJ44T88hUbVJa36_Wk4_iXDY",
    authDomain: "cocacola-attempt.firebaseapp.com",
    projectId: "cocacola-attempt",
    storageBucket: "cocacola-attempt.appspot.com",
    messagingSenderId: "1074982731883",
    appId: "1:1074982731883:web:9969914e39a91ee823712e",
    measurementId: "G-FCS2EH3TGE"
};

firebase.initializeApp(firebaseConfig);

const theFirestore = firebase.firestore();
const theStorage = firebase.storage();
const theAuth = firebase.auth();
const analytics = firebase.analytics();

const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { theAuth, theFirestore, theStorage, timestamp }
