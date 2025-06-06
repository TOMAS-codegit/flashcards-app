import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCADsnrLjtJANaUQP5WfbPmb7Zwgj21pog",
  authDomain: "flashcards-app-b46f0.firebaseapp.com",
  projectId: "flashcards-app-b46f0",
  storageBucket: "flashcards-app-b46f0.firebasestorage.app",
  messagingSenderId: "397426369063",
  appId: "1:397426369063:web:143e4f07e6ccf969496402",
  measurementId: "G-KJRXVDLCXE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };