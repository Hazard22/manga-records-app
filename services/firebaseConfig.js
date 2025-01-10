import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";
const apiKey = process.env.EXPO_PUBLIC_FIREBASE_API_KEY
const projectId = process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID
const senderId = process.env.EXPO_PUBLIC_FIREBASE_SENDER_ID
const appId = process.env.EXPO_PUBLIC_FIREBASE_APP_ID

const firebaseConfig = {
  apiKey,
  authDomain: `${projectId}.firebaseapp.com`,
  databaseURL: `https://${projectId}.firebaseio.com`,
  projectId,
  storageBucket: `${projectId}.appspot.com`,
  messagingSenderId: senderId,
  appId,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };