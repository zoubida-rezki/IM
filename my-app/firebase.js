// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBFFIYP2fXGoBJLG2oO5tPiBT2DZhTde1s",
  authDomain: "inventory-managment-4c04c.firebaseapp.com",
  projectId: "inventory-managment-4c04c",
  storageBucket: "inventory-managment-4c04c.appspot.com",
  messagingSenderId: "942337154894",
  appId: "1:942337154894:web:9cad7f714ebd7a8ef7c81f",
  measurementId: "G-Z2WFVH9N5W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const firestore = getFirestore(app);
export{firestore}