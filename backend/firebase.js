import fs from "fs";
import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore, FieldValue } from "firebase-admin/firestore";

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

// Експортираме db и FieldValue за останалите модули
export { db, FieldValue };
