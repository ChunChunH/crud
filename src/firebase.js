import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY || "",
    authDomain: "product-list-auth.firebaseapp.com",
    projectId: "product-list-auth",
    storageBucket: "product-list-auth.appspot.com",
    messagingSenderId: "599520234120",
    appId: "1:599520234120:web:97a97e04331834c8c76d3d",
    measurementId: "G-H9WKECCH9B"
  };


firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export {
  db,
  firebase
}