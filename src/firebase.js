import firebase from "firebase";
const firebaseApp = firebase.initializeApp({
// your firebase config
});
const db = firebaseApp.firestore();
export default db;
