import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDkv8Vuk6NsCN05FM87-NcHFkwLvZ_OMj8",
  authDomain: "fir-auth-ba3d5.firebaseapp.com",
  projectId: "fir-auth-ba3d5",
  storageBucket: "fir-auth-ba3d5.firebasestorage.app",
  messagingSenderId: "75687267275",
  appId: "1:75687267275:web:f904b26563f83e3aba044e",
  measurementId: "G-4H1V0X7FMC",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
