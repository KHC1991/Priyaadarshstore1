import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// આ વિગતો Firebase Console -> Project Settings માંથી મેળવો
const firebaseConfig = {
  apiKey: "AIzaSy...", 
  authDomain: "priyaadarsh-store.firebaseapp.com",
  projectId: "priyaadarsh-store",
  storageBucket: "priyaadarsh-store.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
