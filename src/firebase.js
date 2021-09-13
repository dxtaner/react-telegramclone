import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyBtz4QSmJXrGjMgtBFFX2yCCPjRKUT8hTg",
    authDomain: "telegram-clone-57e60.firebaseapp.com",
    projectId: "telegram-clone-57e60",
    storageBucket: "telegram-clone-57e60.appspot.com",
    messagingSenderId: "1094079805742",
    appId: "1:1094079805742:web:8805ec090247143126a2bf",
    measurementId: "G-XN517L90MM"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();
  const database = firebaseApp.firestore();

  export {auth,provider};
  export default database;