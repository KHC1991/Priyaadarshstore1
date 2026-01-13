import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// આ વિગતો તમારા Firebase Console માંથી કોપી કરો
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "priyaadarsh-store.firebaseapp.com",
  projectId: "priyaadarsh-store",
  storageBucket: "priyaadarsh-store.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Services
export const db = getFirestore(app); // ડેટા સ્ટોર કરવા માટે
export const auth = getAuth(app);    // એડમિન લોગિન માટે
