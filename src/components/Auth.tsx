
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
  BadgeCheck,
  AlertCircle,
  Loader2
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
    // Clear error when switching modes
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

    // Simulate Network Delay
    setTimeout(() => {
      if (mode === 'register') {
        const generatedId = 'PRIYA' + Math.floor(100000 + Math.random() * 900000);
        setTempUserId(generatedId);
        setIsSubmitting(false);
        setShowSuccess(true);
      } else {
        const input = formData.email.toUpperCase();
        
        // --- ADMIN LOGIN LOGIC ---
        // User ID: ADMIN, Password: 1234
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
            activeInvestments: []
          });
          setIsSubmitting(false);
          navigate('/dashboard');
        } 
        // Logic for PRIYA IDs (starts with PRIYA and password length >= 4)
        else if (input.startsWith('PRIYA') && formData.password.length >= 4) {
          onAuth({
            id: input,
            name: 'Priyaadarsh User',
            email: 'user@example.com',
            mobile: '9876543210',
            referralId: 'ADMIN',
            balance: 0,
            coins: 0,
            isLoggedIn: true,
            activeInvestments: []
          });
          setIsSubmitting(false);
          navigate('/dashboard');
        } else {
          setIsSubmitting(false);
          setError("ખોટો ID અથવા પાસવર્ડ! (Admin માટે 'ADMIN' / '1234' વાપરો)");
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
      activeInvestments: []
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
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center py-10 px-4 relative overflow-x-hidden">
      <div className="absolute top-6 right-6 z-50">
        <LanguageSelector language={language} setLanguage={setLanguage} />
      </div>
      <Branding />

      <div className="bg-white w-full max-w-[480px] rounded-[3rem] shadow-[0_20px_60px_rgba(0,0,0,0.05)] border border-white overflow-hidden animate-fadeIn">
        <div className="p-8 md:p-10 space-y-7">
          <div className="flex items-center gap-4 border-b border-gray-50 pb-5">
            <div className={`${mode === 'register' ? 'bg-[#00008B]' : 'bg-blue-600'} p-3 rounded-2xl shadow-lg`}>
              {mode === 'register' ? <UserPlus className="text-white" size={24} /> : <Lock className="text-white" size={24} />}
            </div>
            <div>
              <h2 className="text-lg font-extrabold text-gray-800 uppercase tracking-tight">
                {mode === 'register' ? 'Create Account' : 'Member Login'}
              </h2>
              <p className="text-[9px] font-bold text-blue-600 uppercase tracking-widest">
                {mode === 'register' ? 'Join our global network' : 'Enter your credentials'}
              </p>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-2xl flex items-center gap-3 animate-shake">
              <AlertCircle size={18} />
              <p className="text-xs font-bold uppercase tracking-tight">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {mode === 'register' ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-400 ml-2 uppercase tracking-wider">Sponsor ID</label>
                    <div className="relative">
                      <input type="text" placeholder="Enter ID" className="w-full bg-gray-50 border border-gray-100 rounded-xl p-4 pl-12 font-bold text-gray-700 outline-none focus:ring-2 focus:ring-blue-100 uppercase" value={formData.referralId} onChange={e => setFormData({...formData, referralId: e.target.value.toUpperCase()})} />
                      <BadgeCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-600" size={18} />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-400 ml-2 uppercase tracking-wider">Sponsor Name</label>
                    <div className="w-full bg-gray-50 border border-gray-100 rounded-xl p-4 pl-12 h-[58px] flex items-center relative">
                      <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                      <p className="text-xs font-bold text-gray-500 truncate">{sponsorName || '---'}</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Sparkles className="text-blue-500" size={14} />
                    <span className="text-[10px] font-bold text-blue-500 uppercase tracking-widest">Identity Info</span>
                  </div>
                  <div className="relative">
                    <input required type="text" placeholder="Your Full Name" className="w-full bg-gray-50 border border-gray-100 rounded-xl p-4 pl-12 text-sm font-medium outline-none focus:ring-2 focus:ring-blue-100" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                    <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                  </div>
                  <div className="relative">
                    <input required type="tel" placeholder="Mobile Number" className="w-full bg-gray-50 border border-gray-100 rounded-xl p-4 pl-12 text-sm font-medium outline-none focus:ring-2 focus:ring-blue-100" value={formData.mobile} onChange={e => setFormData({...formData, mobile: e.target.value})} />
                    <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Lock className="text-[#00008B]" size={14} />
                    <span className="text-[10px] font-bold text-[#00008B] uppercase tracking-widest">Security</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <input required type="password" placeholder="Pass" className="w-full bg-gray-50 border border-gray-100 rounded-xl p-4 text-xs font-medium text-center outline-none focus:ring-2 focus:ring-blue-100" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} />
                    <input required type="password" placeholder="Confirm" className="w-full bg-gray-50 border border-gray-100 rounded-xl p-4 text-xs font-medium text-center outline-none focus:ring-2 focus:ring-blue-100" value={formData.confirmPassword} onChange={e => setFormData({...formData, confirmPassword: e.target.value})} />
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="text-emerald-500" size={14} />
                    <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Withdraw PIN</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <input required type="password" maxLength={4} placeholder="PIN" className="w-full bg-gray-50 border border-gray-100 rounded-xl p-4 text-xs font-medium text-center outline-none focus:ring-2 focus:ring-blue-100" value={formData.pin} onChange={e => setFormData({...formData, pin: e.target.value.replace(/\D/g, '')})} />
                    <input required type="password" maxLength={4} placeholder="Confirm" className="w-full bg-gray-50 border border-gray-100 rounded-xl p-4 text-xs font-medium text-center outline-none focus:ring-2 focus:ring-blue-100" value={formData.confirmPin} onChange={e => setFormData({...formData, confirmPin: e.target.value.replace(/\D/g, '')})} />
                  </div>
                </div>
              </>
            ) : (
              <div className="space-y-6">
                <div className="relative">
                  <input required type="text" placeholder="User ID (ADMIN / PRIYA...)" className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-5 pl-14 text-sm font-bold outline-none focus:ring-2 focus:ring-blue-100 uppercase" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                  <UserIcon className="absolute left-5 top-1/2 -translate-y-1/2 text-blue-600" size={22} />
                </div>
                <div className="relative">
                  <input required type="password" placeholder="Password" className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-5 pl-14 text-sm font-bold outline-none focus:ring-2 focus:ring-blue-100" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} />
                  <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300" size={22} />
                </div>
              </div>
            )}

            <button 
              type="submit" 
              disabled={isSubmitting}
              className={`w-full ${mode === 'register' ? 'bg-gradient-to-r from-blue-900 to-blue-700' : 'bg-gradient-to-r from-blue-700 to-blue-500'} text-white font-black p-5 rounded-2xl shadow-xl uppercase tracking-[0.2em] active:scale-95 transition-all text-sm flex items-center justify-center gap-3`}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  {mode === 'register' ? 'Register Now' : 'Sign In Now'}
                  <ChevronRight size={20} />
                </>
              )}
            </button>
          </form>

          <div className="text-center pt-2">
            <button 
              onClick={() => { setError(null); navigate(mode === 'register' ? '/login' : '/register'); }} 
              className="text-[11px] font-bold text-gray-400 uppercase tracking-widest hover:text-blue-600 transition-colors"
            >
              {mode === 'register' ? "Already a member? " : "Don't have an account? "}
              <span className="text-blue-600 ml-1 font-black underline">{mode === 'register' ? "Login" : "Register"}</span>
            </button>
          </div>
        </div>
      </div>

      {showSuccess && (
        <div className="fixed inset-0 bg-gray-900/80 backdrop-blur-md flex items-center justify-center p-6 z-[2000] animate-fadeIn">
          <div className="bg-white rounded-[3rem] w-full max-w-[400px] p-10 text-center space-y-8 shadow-2xl border-4 border-emerald-500/20">
            <div className="flex justify-center">
                <div className="bg-emerald-50 p-8 rounded-full shadow-inner animate-bounce">
                    <CheckCircle size={64} className="text-emerald-500" />
                </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-black text-blue-900 uppercase tracking-tight">Success!</h3>
              <p className="text-gray-400 font-bold text-[9px] uppercase tracking-widest">Your Permanent Account ID</p>
            </div>
            <div className="bg-blue-50 p-6 rounded-2xl border-2 border-dashed border-blue-200">
              <p className="text-3xl font-black text-blue-900 font-mono tracking-widest">{tempUserId}</p>
            </div>
            <p className="text-[10px] text-red-500 font-black uppercase italic leading-tight">
              Please take a screenshot of this ID!<br/>You will need it to login.
            </p>
            <button onClick={handleFinalizeRegistration} className="w-full bg-blue-900 p-5 rounded-2xl text-white font-black text-sm uppercase tracking-widest shadow-xl transition-all active:scale-95">Launch Dashboard</button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fadeIn { animation: fadeIn 0.4s ease-out forwards; }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .animate-shake { animation: shake 0.2s ease-in-out 0s 2; }
      `}</style>
    </div>
  );
};

export default Auth;

