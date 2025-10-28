// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCKFhXZiAKcI7ejyAqy8p7S4e4tc3C_j-o",
  authDomain: "puratonbazar.firebaseapp.com",
  projectId: "puratonbazar",
  storageBucket: "puratonbazar.firebasestorage.app",
  messagingSenderId: "672959478075",
  appId: "1:672959478075:web:fdd50ebcb74fd34ef65f1e",
  measurementId: "G-61P85PNLRD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);