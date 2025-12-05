// client/src/firebaseClient.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBKgCkv9mKAiKNlGyY1ECHzsnf-q7MZAGU",
  authDomain: "plamstop-firesafety.firebaseapp.com",
  projectId: "plamstop-firesafety",
  storageBucket: "plamstop-firesafety.firebasestorage.app",
  messagingSenderId: "290805663290",
  appId: "1:290805663290:web:8a71e7e25f95c3c43c9703"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export default app;
