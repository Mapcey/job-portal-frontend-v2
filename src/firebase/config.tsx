import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA0Fp9iaoIroGVa4-TDxJgtutRpU5XDGss",
  authDomain: "suicul-job-portal-e6de7.firebaseapp.com",
  projectId: "suicul-job-portal-e6de7",
  storageBucket: "suicul-job-portal-e6de7.firebasestorage.app",
  messagingSenderId: "611744858178",
  appId: "1:611744858178:web:c93d7a374b3c89aed1addb",
  measurementId: "G-Z6WK6V2SQT",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
