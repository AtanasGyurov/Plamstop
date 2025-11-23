import fs from "fs";
import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore, FieldValue } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";

const serviceAccount = JSON.parse(
  fs.readFileSync("./serviceAccountKey.json", "utf8")
);

const firebaseApp = initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore(firebaseApp, "plamstop");
const auth = getAuth(firebaseApp);

export { db, FieldValue, auth };
