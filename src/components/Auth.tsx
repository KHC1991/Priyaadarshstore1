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
  CheckCircle,
  AlertCircle,
  Loader2,
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
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const ref = params.get('ref');
    if (ref && mode === 'register') {
      setFormData(prev => ({ ...prev, referralId: ref.toUpperCase() }));
    }
    setError(null);
  }, [location, mode]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    setTimeout(() => {
      const input = formData.email.toUpperCase();
      // જૂનો લોજિક: ADMIN માટે 1234 પિન
      if (input === 'ADMIN' && formData.password === '1234') {
        onAuth({
          id: 'ADMIN',
          name: 'System Administrator',
          email: 'admin@priyaadarsh.store',
          mobile: '8140003126',
          referralId: 'SYSTEM',
          balance: 50000,
          coins: 100000,
          isLoggedIn: true,
          activeInvestments: [],
          loginPassword: '1234',
          transactionPin: '1234'
        });
        setIsSubmitting(false);
        navigate('/dashboard');
      } else {
        setIsSubmitting(false);
        setError("Invalid ID or Password! Default: ADMIN / 1234");
      }
    }, 1200);
  };

  // ... બાકીનો ડિઝાઇન કોડ (Branding વગેરે)
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center py-10 px-4 relative">
        {/* ફોર્મ અને ડિઝાઇન અહીં આવશે */}
        <form onSubmit={handleSubmit} className="space-y-6">
             <input required type="text" placeholder="User ID" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
             <input required type="password" placeholder="Password" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} />
             <button type="submit">Sign In</button>
        </form>
    </div>
  );
};

export default Auth;
