
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

  const validateForm = () => {
    if (mode === 'register') {
      if (!formData.name || !formData.mobile || !formData.password || !formData.pin) {
        setError("બધી વિગતો ભરવી ફરજિયાત છે!");
        return false;
      }
      if (formData.password !== formData.confirmPassword) {
        setError("પાસવર્ડ મેચ થતા નથી!");
        return false;
      }
      if (formData.pin !== formData.confirmPin) {
        setError("ટ્રાન્ઝેક્શન પિન મેચ થતા નથી!");
        return false;
      }
    } else {
      if (!formData.email || !formData.password) {
        setError("ID અને પાસવર્ડ નાખો!");
        return false;
      }
    }
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (!validateForm()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const input = formData.email.toUpperCase();
      
      if (mode === 'register') {
        const generatedId = 'PRIYA' + Math.floor(100000 + Math.random() * 900000);
        setTempUserId(generatedId);
        setIsSubmitting(false);
        setShowSuccess(true);
      } else {
        // --- STRICT ADMIN LOGIN ---
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
            transactionPin: '1234' // Default for session
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

  const Branding = () => (
    <div className="text-center mb-6 animate-fadeIn">
      <h1 className="text-4xl font-black tracking-tight flex items-center justify-center gap-2">
        <span className="text-[#00008B]">PRIYAADARSH</span> 
        <span className="text-[#ADD8E6]">STORE</span>
      </h1>
      <p className="text-[10px] text-gray-400 font-bold tracking-[0.4em] uppercase mt-2 italic">Official Access Portal</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center py-10 px-4 relative">
      <div className="absolute top-6 right-6 z-50">
        <LanguageSelector language={language} setLanguage={setLanguage} />
      </div>
      <Branding />

      <div className="bg-white w-full max-w-[480px] rounded-[3rem] shadow-2xl border border-gray-100 overflow-hidden animate-fadeIn">
        <div className="p-8 md:p-10 space-y-7">
          <div className="flex items-center gap-4 border-b border-gray-50 pb-5">
            <div className={`${mode === 'register' ? 'bg-[#00008B]' : 'bg-blue-600'} p-3 rounded-2xl shadow-lg`}>
              {mode === 'register' ? <UserPlus className="text-white" size={24} /> : <Lock className="text-white" size={24} />}
            </div>
            <h2 className="text-lg font-extrabold text-gray-800 uppercase tracking-tight">
              {mode === 'register' ? 'Account Registration' : 'Member Login'}
            </h2>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-2xl flex items-center gap-3 animate-shake">
              <AlertCircle size={18} />
              <p className="text-xs font-bold uppercase">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {mode === 'register' ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="relative">
                    <input type="text" placeholder="Sponsor ID" className="w-full bg-gray-50 border border-gray-100 rounded-xl p-4 font-bold outline-none focus:ring-2 focus:ring-blue-100 uppercase" value={formData.referralId} onChange={e => setFormData({...formData, referralId: e.target.value})} />
                    <BadgeCheck className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-500" size={16} />
                  </div>
                  <div className="w-full bg-gray-50 border border-gray-100 rounded-xl p-4 text-[10px] font-bold text-gray-400 flex items-center truncate">
                    {sponsorName || 'Sponsor Name'}
                  </div>
                </div>
                <input required type="text" placeholder="Full Name" className="w-full bg-gray-50 border border-gray-100 rounded-xl p-4 text-sm font-medium outline-none focus:ring-2 focus:ring-blue-100" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                <input required type="tel" placeholder="Mobile Number" className="w-full bg-gray-50 border border-gray-100 rounded-xl p-4 text-sm font-medium outline-none focus:ring-2 focus:ring-blue-100" value={formData.mobile} onChange={e => setFormData({...formData, mobile: e.target.value})} />
                <div className="grid grid-cols-2 gap-4">
                  <input required type="password" placeholder="Password" className="w-full bg-gray-50 border border-gray-100 rounded-xl p-4 text-xs font-medium outline-none focus:ring-2 focus:ring-blue-100" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} />
                  <input required type="password" placeholder="Confirm Pass" className="w-full bg-gray-50 border border-gray-100 rounded-xl p-4 text-xs font-medium outline-none focus:ring-2 focus:ring-blue-100" value={formData.confirmPassword} onChange={e => setFormData({...formData, confirmPassword: e.target.value})} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <input required type="password" maxLength={4} placeholder="4-Digit PIN" className="w-full bg-gray-50 border border-gray-100 rounded-xl p-4 text-xs font-medium outline-none focus:ring-2 focus:ring-blue-100" value={formData.pin} onChange={e => setFormData({...formData, pin: e.target.value})} />
                  <input required type="password" maxLength={4} placeholder="Confirm PIN" className="w-full bg-gray-50 border border-gray-100 rounded-xl p-4 text-xs font-medium outline-none focus:ring-2 focus:ring-blue-100" value={formData.confirmPin} onChange={e => setFormData({...formData, confirmPin: e.target.value})} />
                </div>
              </>
            ) : (
              <div className="space-y-6">
                <div className="relative">
                  <input required type="text" placeholder="User ID (ADMIN / PRIYA...)" className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-5 pl-14 text-sm font-bold outline-none uppercase focus:ring-2 focus:ring-blue-100" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                  <UserIcon className="absolute left-5 top-1/2 -translate-y-1/2 text-blue-600" size={20} />
                </div>
                <div className="relative">
                  <input required type="password" placeholder="Password" className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-5 pl-14 text-sm font-bold outline-none focus:ring-2 focus:ring-blue-100" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} />
                  <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300" size={20} />
                </div>
              </div>
            )}

            <button type="submit" disabled={isSubmitting} className="w-full bg-blue-900 text-white font-black p-5 rounded-2xl shadow-xl uppercase tracking-widest active:scale-95 transition-all text-sm flex items-center justify-center gap-3">
              {isSubmitting ? <Loader2 className="animate-spin" /> : (mode === 'register' ? 'Create Account' : 'Sign In')}
              <ChevronRight size={18} />
            </button>
          </form>

          <button onClick={() => navigate(mode === 'register' ? '/login' : '/register')} className="w-full text-center text-[11px] font-bold text-gray-400 uppercase tracking-widest hover:text-blue-600 transition-colors">
            {mode === 'register' ? 'Already have an account? Login' : "Don't have an account? Register Now"}
          </button>
        </div>
      </div>

      {showSuccess && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-6 z-[2000] animate-fadeIn">
          <div className="bg-white rounded-[3rem] w-full max-w-[400px] p-10 text-center space-y-8 shadow-2xl border-4 border-emerald-500/20">
            <CheckCircle size={64} className="text-emerald-500 mx-auto animate-bounce" />
            <div className="space-y-2">
              <h3 className="text-2xl font-black text-blue-900 uppercase">Success!</h3>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Account ID Generated</p>
            </div>
            <div className="bg-blue-50 p-6 rounded-2xl border-2 border-dashed border-blue-200">
              <p className="text-3xl font-black text-blue-900 font-mono tracking-widest">{tempUserId}</p>
            </div>
            <p className="text-[10px] text-red-500 font-black uppercase italic leading-tight">Please take a screenshot of this ID!<br/>Use this to login.</p>
            <button onClick={handleFinalizeRegistration} className="w-full bg-blue-900 p-5 rounded-2xl text-white font-black text-sm uppercase shadow-xl active:scale-95">Open Dashboard</button>
          </div>
        </div>
      )}
      
      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fadeIn { animation: fadeIn 0.4s ease-out forwards; }
        @keyframes shake { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-5px); } 75% { transform: translateX(5px); } }
        .animate-shake { animation: shake 0.2s ease-in-out 0s 2; }
      `}</style>
    </div>
  );
};

export default Auth;

