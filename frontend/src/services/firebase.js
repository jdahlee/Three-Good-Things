// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBka49Jz3E1h8X5niu2aRrCzzHKFCUTPeM",
  authDomain: "good-things-c4e52.firebaseapp.com",
  projectId: "good-things-c4e52",
  storageBucket: "good-things-c4e52.firebasestorage.app",
  messagingSenderId: "633400385664",
  appId: "1:633400385664:web:9bb7c2ff9842ea0eec8665",
  measurementId: "G-YCLWKLVP6R",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
auth.useDeviceLanguage();
export const provider = new GoogleAuthProvider();
