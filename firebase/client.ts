
import { initializeApp,getApp ,getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA4Bxg8Zze4QZiZCagaUGXaugHI7yECYJU",
  authDomain: "prepwise-c94cf.firebaseapp.com",
  projectId: "prepwise-c94cf",
  storageBucket: "prepwise-c94cf.firebasestorage.app",
  messagingSenderId: "76855327359",
  appId: "1:76855327359:web:7e909692776f8d352b5d4a",
  measurementId: "G-501XQBH37Z"
};

const app = !getApps().length ? initializeApp(firebaseConfig):getApp();
export const auth = getAuth(app);
export const db = getFirestore(app);