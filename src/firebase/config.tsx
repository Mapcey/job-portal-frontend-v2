import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCfnXjFHlWfyNUXSzjAjg1_uQ_XWNIdiyU",
  authDomain: "suicul-job-portal.firebaseapp.com",
  projectId: "suicul-job-portal",
  storageBucket: "suicul-job-portal.firebasestorage.app",
  messagingSenderId: "116976838431",
  appId: "1:116976838431:web:eda7d2a393bc302758f22a",
  measurementId: "G-WB7N753Q0P",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
