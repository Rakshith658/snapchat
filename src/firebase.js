import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyBq9bO8d6S9PzXea0e7amSDZ-wTLtIOjI4",
  authDomain: "snapchat-6dd31.firebaseapp.com",
  projectId: "snapchat-6dd31",
  storageBucket: "snapchat-6dd31.appspot.com",
  messagingSenderId: "818078501961",
  appId: "1:818078501961:web:101f6ee22075bfa4280398"
};

const firebaseapp = firebase.initializeApp(firebaseConfig);
const db = firebaseapp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
const provider = new firebase.auth.GithubAuthProvider();

export {db,auth,storage,provider}

// export default {db,auth}