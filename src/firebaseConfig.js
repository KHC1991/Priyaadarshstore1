import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// આ વિગતો તમારા Firebase Console માંથી મેળવો
const firebaseConfig = {
  apiKey: "તમારી_API_KEY",
  authDomain: "priyaadarsh-store.firebaseapp.com",
  projectId: "priyaadarsh-store",
  storageBucket: "priyaadarsh-store.appspot.com",
  messagingSenderId: "તમારો_ID",
  appId: "તમારો_APP_ID"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
