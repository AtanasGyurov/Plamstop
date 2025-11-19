import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// КОПИРАЙ firebaseConfig ОТ FIREBASE КОНЗОЛАТА
const firebaseConfig = {
  apiKey: "AIzaSyCspxZwmSoQI6Gsx0qFEAYUgNoE60xxHXQ",
  authDomain: "plamstop-fire-safety.firebaseapp.com",
  projectId: "plamstop-fire-safety",
  storageBucket: "plamstop-fire-safety.firebasestorage.app",
  messagingSenderId: "700835325432",
  appId: "1:700835325432:web:23f0216944e3ca5860e20d",
  measurementId: "G-JYCZPFNVM7"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
