// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDkKj9xjt18HttEGA8uZWbFnNMPPz4UKEU",
  authDomain: "cactusia-adf86.firebaseapp.com",
  projectId: "cactusia-adf86",
  storageBucket: "cactusia-adf86.appspot.com",
  messagingSenderId: "656193591821",
  appId: "1:656193591821:web:d7e34fdd28370dbad31344",
  measurementId: "G-TBS956159S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app); 