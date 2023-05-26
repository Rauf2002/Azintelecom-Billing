import firebase  from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyA-Orj_YyouEkLpjS5toNz8cIpnsbcVxfg",
    authDomain: "billing-app-d9012.firebaseapp.com",
    projectId: "billing-app-d9012",
    storageBucket: "billing-app-d9012.appspot.com",
    messagingSenderId: "713175167189",
    appId: "1:713175167189:web:061d68edd509a4b535325c"
};

// init firebase
firebase.initializeApp(firebaseConfig);

// init services
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();

export {projectFirestore, projectAuth};