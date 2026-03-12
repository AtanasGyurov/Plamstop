// backend/firebase.js
import admin from "firebase-admin";
import { readFileSync, existsSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function getServiceAccountFromEnv() {
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (!projectId || !clientEmail || !privateKey) return null;

  return {
    project_id: projectId,
    client_email: clientEmail,
    private_key: privateKey,
  };
}

function getServiceAccountFromFile() {
  const p = path.join(__dirname, "serviceAccountKey.json");
  if (!existsSync(p)) return null;
  return JSON.parse(readFileSync(p, "utf8"));
}

const serviceAccount =
  getServiceAccountFromEnv() || getServiceAccountFromFile();

if (!serviceAccount) {
  throw new Error(
    "Firebase Admin credentials missing. Set FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY on Vercel, or keep backend/serviceAccountKey.json locally."
  );
}

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export const db = admin.firestore();
export const auth = admin.auth();

console.log("🔥 Firebase Admin initialized:", serviceAccount.project_id);