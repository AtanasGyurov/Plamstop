import fs from "fs";
import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore, FieldValue } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";

// Зареждаме service account файла
const serviceAccount = JSON.parse(
  fs.readFileSync("./serviceAccountKey.json", "utf8")
);

// Инициализираме Firebase Admin
const firebaseApp = initializeApp({
  credential: cert(serviceAccount),
});

// Връзка към Firestore с database ID = "plamstop"
const db = getFirestore(firebaseApp, "plamstop");

// Firebase Admin Auth (за verifyIdToken)
const auth = getAuth(firebaseApp);

export { db, FieldValue, auth };
