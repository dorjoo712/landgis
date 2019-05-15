import { firebase } from "@firebase/app";
import "@firebase/firestore";
import "@firebase/auth";
import "@firebase/storage";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyAYI8nZ9oQiL4HaxebwRqCvsHRECZf9i6Y",
  authDomain: "iibc-d09e7.firebaseapp.com",
  databaseURL: "https://iibc-d09e7.firebaseio.com",
  projectId: "iibc-d09e7",
  storageBucket: "iibc-d09e7.appspot.com",
  messagingSenderId: "434075828799"
});
// firebaseApp.firestore();
// var storageRef = firebase.storage().ref('gaduurajil/' + this.itemId + '/' + item.name)
export default firebaseApp;