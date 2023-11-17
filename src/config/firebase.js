import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA-COrXjZKLWvX3V1jhE-TqIUaDlUIia6c",
  authDomain: "secondhand-80986.firebaseapp.com",
  projectId: "secondhand-80986",
  storageBucket: "secondhand-80986.appspot.com",
  messagingSenderId: "947892214090",
  appId: "1:947892214090:web:eb365d04f21516650109b3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
export const storage = getStorage(app);
