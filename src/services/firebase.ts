// src/services/firebase.ts
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getPerformance } from "firebase/performance";
import { getFirestore, collection, getDocs, query, orderBy } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: import.meta.env.PUBLIC_FIREBASE_API_KEY,
  authDomain: "aluben-2794e.firebaseapp.com",
  projectId: "aluben-2794e",
  storageBucket: "aluben-2794e.firebasestorage.app",
  messagingSenderId: "851804241341",
  appId: "1:851804241341:web:9c74e26bc5c338ab0b26d4",
  measurementId: "G-VQHMN7DCGN",
};

const app = initializeApp(firebaseConfig);

// Analytics is optional and should be used only in the browser environment
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;
export const perf = typeof window !== 'undefined' ? getPerformance(app) : null;
export const auth = getAuth(app); // Initialize Firebase Auth
export const db = getFirestore(app);

export default app;
