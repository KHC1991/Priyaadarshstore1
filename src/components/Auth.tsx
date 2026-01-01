import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Language, User } from '../types';
import { 
  Lock, 
  ShieldCheck, 
  User as UserIcon, 
  Smartphone, 
  ChevronRight, 
  UserPlus,
  Sparkles,
  CheckCircle,
  Mail,
  BadgeCheck
} from 'lucide-react';
import LanguageSelector from './LanguageSelector';

interface Props {
  mode: 'login' | 'register';
  language: Language;
  setLanguage: (lang: Language) => void;
  onAuth: (user: User) => void;
}

const Auth: React.FC<Props> = ({ mode, language, setLanguage, onAuth }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    referralId: '', 
    password: '',
    confirmPassword: '',
    pin: '',
    confirmPin: '',
  });
  
  const [sponsorName, setSponsorName] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [tempUserId, setTempUserId] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const ref = params.get('ref');
    if (ref && mode === 'register') {
      setFormData(prev => ({ ...prev, referralId: ref.toUpperCase() }));
    }
  }, [location, mode]);

  useEffect(() => {
    const rid = formData.referralId.toLowerCase();
    if (rid === 'admin' || rid === 'demo') {
      setSponsorName('Priya Adarsh Admin');
    } else if (rid.length > 3) {
      setSponsorName('Verified Member');
    } else {
      setSponsorName('');
    }
  }, [formData.referralId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'register') {
      if (formData.password !== formData.confirmPassword) {
        alert("Passwords do not match!");
        return;
      }
      if (formData.pin !== formData.confirmPin) {
        alert("Transaction PINs do not match!");
        return;
      }
      const generatedId = 'PRIYA' + Math.floor(100000 + Math.random() * 900000);
      setTempUserId(generatedId);
      setShowSuccess(true);
    } else {
      const input = formData.email.toLowerCase();
      if ((input === 'demo' || input === 'priya123456' || input === '9876543210') && formData.password === '1234') {
        onAuth({
          id: 'PRIYA123456',
          name: 'Priyaadarsh User',
          email: 'user@example.com',
          mobile: '9876543210',
          referralId: 'ADMIN',
          balance: 0,
          coins: 0,
          isLoggedIn: true,
          activeInvestments: []
        });
        navigate('/dashboard');
      } else {
        alert("Invalid ID or Password!");
      }
    }
  };

  const handleFinalizeRegistration = () => {
    setShowSuccess(false);
    onAuth({
      id: tempUserId,
      name: formData.name,
      email: formData.email,
      mobile: formData.mobile,
      referralId: formData.referralId,
      balance: 0,
      coins: 0,
      isLoggedIn: true,
      activeInvestments: []
    });
    navigate('/dashboard');
  };

  const Branding = () => (
    <div className="text-center mb-8">
      <h1 className="text-4xl font-black tracking-tight flex items-center justify-center gap-2">
        <span className="text-[#00008B]">PRIYAADARSH</span> 
        <span className="text-[#ADD8E6]">STORE</span>
      </h1>
      <p className="text-[10px] text-gray-400 font-bold tracking-[0.4em] uppercase mt-2 italic">Secure Access Portal</p>
    </div>
  );

  const SuccessModal = () => (
    <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-md flex items-center justify-center p-6 z-[2000] animate-fadeIn">
      <div className="bg-white rounded-[3rem] w-full max-w-
