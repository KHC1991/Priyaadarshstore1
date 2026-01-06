
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Language, User } from '../types';
import { 
  Lock, 
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
  }, [location.search, mode]);

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
    setError(null);
    setIsSubmitting(true);

    setTimeout(() => {
      const input = formData.email.toUpperCase();
      
      if (mode === 'register') {
        const generatedId = 'PRIYA' + Math.floor(100000 + Math.random() * 900000);
        setTempUserId(generatedId);
        setIsSubmitting(false);
        setShowSuccess(true);
      } else {
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
        } 
        else if (input.startsWith('PRIYA') && formData.password.length >= 4) {
          onAuth({
            id: input,
            name: 'Priyaadarsh User',
            email: 'user@example.com',
            mobile: '9876543210',
            referralId: 'ADMIN',
            balance: 10,
            coins: 1000,
            isLoggedIn: true,
            activeInvestments: [],
            loginPassword: formData.password,
            transactionPin: '1234'
          });
          setIsSubmitting(false);
          navigate('/dashboard');
        } else {
          setIsSubmitting(false);
          setError("Invalid User ID or Password! Use ADMIN / 1234");
        }
      }
    }, 1200);
  };

  const handleFinalizeRegistration = () => {
    setShowSuccess(false);
    onAuth({
      id: tempUserId,
      name: formData.name,
      email: formData.email,
      mobile: formData.mobile,
      referralId: formData.referralId,
      balance: 10,
      coins: 1000,
      isLoggedIn: true,
      activeInvestments: [],
      loginPassword: formData.password,
      transactionPin: formData.pin
    });
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center py-10 px-4 relative">
      <div className="absolute top-6 right-6 z-50">
        <LanguageSelector language={language} setLanguage={setLanguage} />
      </div>
      <div className="text-center mb-6">
        <h1 className="text-4xl font-black tracking-tight">
            <span className="text-[#00008B]">PRIYAADARSH</span> <span className="text-[#ADD8E6]">STORE</span>
        </h1>
      </div>

      <div className="bg-white w-full max-w-[480px] rounded-[3rem] shadow-2xl border border-gray-100 p-8 space-y-7 animate-fadeIn">
        <div className="flex items-center gap-4 border-b pb-5">
          <div className={`${mode === 'register' ? 'bg-[#00008B]' : 'bg-blue-600'} p-3 rounded-2xl shadow-lg`}>
            {mode === 'register' ? <UserPlus className="text-white" size={24} /> : <Lock className="text-white" size={24} />}
          </div>
          <h2 className="text-lg font-extrabold text-gray-800 uppercase">
            {mode === 'register' ? 'Registration' : 'Login'}
          </h2>
        </div>

        {error && <div className="bg-red-50 text-red-600 p-4 rounded-2xl flex items-center gap-3"><AlertCircle size={18} /> <p className="text-xs font-bold uppercase">{error}</p></div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          {mode === 'register' ? (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div className="relative">
                  <input type="text" placeholder="Referral ID" className="w-full bg-gray-50 p-4 rounded-xl font-bold outline-none uppercase text-xs" value={formData.referralId} onChange={e => setFormData({...formData, referralId: e.target.value})} />
                  <BadgeCheck className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-500" size={16} />
                </div>
                <div className="bg-gray-50 p-4 rounded-xl text-[10px] font-bold text-gray-400 truncate flex items-center">{sponsorName || 'Sponsor Name'}</div>
              </div>
              <input required type="text" placeholder="Full Name" className="w-full bg-gray-50 p-4 rounded-xl outline-none text-xs font-bold" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
              <input required type="tel" placeholder="Mobile" className="w-full bg-gray-50 p-4 rounded-xl outline-none text-xs font-bold" value={formData.mobile} onChange={e => setFormData({...formData, mobile: e.target.value})} />
              <div className="grid grid-cols-2 gap-4">
                <input required type="password" placeholder="Password" className="w-full bg-gray-50 p-4 rounded-xl outline-none text-xs font-bold" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} />
                <input required type="password" placeholder="PIN" maxLength={4} className="w-full bg-gray-50 p-4 rounded-xl outline-none text-xs font-bold" value={formData.pin} onChange={e => setFormData({...formData, pin: e.target.value})} />
              </div>
            </>
          ) : (
            <div className="space-y-6">
              <input required type="text" placeholder="User ID" className="w-full bg-gray-50 p-5 rounded-2xl font-bold outline-none uppercase text-sm" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
              <input required type="password" placeholder="Password" className="w-full bg-gray-50 p-5 rounded-2xl font-bold outline-none text-sm" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} />
            </div>
          )}

          <button type="submit" disabled={isSubmitting} className="w-full bg-blue-900 text-white font-black p-5 rounded-2xl shadow-xl flex items-center justify-center gap-3 active:scale-95 transition-all text-sm uppercase tracking-widest">
            {isSubmitting ? <Loader2 className="animate-spin" /> : (mode === 'register' ? 'Register' : 'Login')} <ChevronRight size={18} />
          </button>
        </form>
      </div>

      {showSuccess && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-6 z-[2000]">
          <div className="bg-white rounded-[3rem] w-full max-w-[400px] p-10 text-center space-y-8 animate-fadeIn">
            <CheckCircle size={64} className="text-emerald-500 mx-auto" />
            <div className="bg-blue-50 p-6 rounded-2xl border-2 border-dashed border-blue-200">
              <p className="text-3xl font-black text-blue-900 tracking-widest">{tempUserId}</p>
            </div>
            <button onClick={handleFinalizeRegistration} className="w-full bg-blue-900 p-5 rounded-2xl text-white font-black uppercase shadow-xl active:scale-95 text-xs tracking-widest">Open Dashboard</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Auth;
