import firebase from "firebase";
const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCY9jMjYIvBvI2hwCkfnBNm7YOswjYF-7Q",
  authDomain: "noteapp-ea773.firebaseapp.com",
  projectId: "noteapp-ea773",
  storageBucket: "noteapp-ea773.appspot.com",
  messagingSenderId: "269185151064",
  appId: "1:269185151064:web:940e29888ee630558d9a2d",
  measurementId: "G-X5W9Y68JDP",
});
const db = firebaseApp.firestore();
export default db;
