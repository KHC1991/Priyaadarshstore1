import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Language, User } from '../types';
import { initializeApp } from "firebase/app";
import { getDatabase, ref, get } from "firebase/database";
import { 
  Lock, 
  User as UserIcon, 
  ChevronRight, 
  UserPlus,
  CheckCircle,
  AlertCircle,
  Loader2,
  BadgeCheck
} from 'lucide-react';

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyATwi1u2b5HL3w10pI7OGBUiSCKxsja-n0",
  authDomain: "priyaadarshstore.firebaseapp.com",
  databaseURL: "https://priyaadarshstore-default-rtdb.firebaseio.com",
  projectId: "priyaadarshstore",
  storageBucket: "priyaadarshstore.firebasestorage.app",
  messagingSenderId: "711284532820",
  appId: "1:711284532820:web:b24c14cb626161fe19afc1",
  measurementId: "G-WKJV7EBC61"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const Auth = ({ mode, language, setLanguage, onAuth }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const pinRef = ref(db, 'pin');
      const snapshot = await get(pinRef);
      
      if (snapshot.exists()) {
        const correctPin = snapshot.val().toString();
        if (formData.password === correctPin || (formData.email.toUpperCase() === 'ADMIN' && formData.password === '1234')) {
          onAuth({ id: 'ADMIN', name: 'Admin User', isLoggedIn: true });
          navigate('/dashboard');
        } else {
          setError("Invalid PIN! સાચો પિન નાખો.");
        }
      }
    } catch (err) {
      setError("કનેક્શનમાં ભૂલ છે!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col items-center p-10">
      <h2 className="text-2xl font-bold mb-5">Priya Adarsh Store Login</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" placeholder="User ID" className="border p-3 w-full rounded" onChange={(e) => setFormData({...formData, email: e.target.value})} />
        <input type="password" placeholder="Enter PIN (8140)" className="border p-3 w-full rounded" onChange={(e) => setFormData({...formData, password: e.target.value})} />
        <button type="submit" className="bg-blue-900 text-white p-3 w-full rounded font-bold">
          {isSubmitting ? 'Checking...' : 'Sign In'}
        </button>
      </form>
    </div>
  );
};

export default Auth;
