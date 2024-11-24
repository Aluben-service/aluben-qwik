// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.PUBLIC_FIREBASE_API_KEY ,
  authDomain: "aluben-2794e.firebaseapp.com",
  projectId: "aluben-2794e",
  storageBucket: "aluben-2794e.firebasestorage.app",
  messagingSenderId: "851804241341",
  appId: "1:851804241341:web:9c74e26bc5c338ab0b26d4",
  measurementId: "G-VQHMN7DCGN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);