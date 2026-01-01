
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { TRANSLATIONS } from '../constants';
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
      // Demo Credentials Check (Still works internally, but UI hints removed)
      if ((input === 'demo' || input === 'priya123456' || input === 'user@example.com' || input === '9876543210') && formData.password === '1234') {
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
        alert("Invalid Credentials!");
      }
    }
  };

  const handleFinalizeRegistration = () => {
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
    <div className="text-center mb-6">
      <h1 className="text-4xl font-black tracking-tight flex items-center justify-center gap-2">
        <span className="text-[#00008B]">PRIYAADARSH</span> 
        <span className="text-[#ADD8E6]">STORE</span>
      </h1>
      <p className="text-[9px] text-gray-400 font-bold tracking-[0.3em] uppercase mt-2 italic">Secure Access Portal</p>
    </div>
  );

  if (mode === 'register') {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center py-10 px-4 relative">
        <div className="absolute top-6 right-6">
          <LanguageSelector language={language} setLanguage={setLanguage} />
        </div>
        <Branding />
        <div className="bg-white w-full max-w-[480px] rounded-[2.5rem] shadow-[0_20px_60px_rgba(0,0,0,0.05)] border border-white overflow-hidden">
          <div className="p-8 md:p-10 space-y-7">
            <div className="flex items-center gap-4 border-b border-gray-50 pb-5">
              <div className="bg-priya-dark p-3 rounded-2xl shadow-lg">
                <UserPlus className="text-white" size={24} />
              </div>
              <div>
                <h2 className="text-lg font-extrabold text-gray-800 uppercase tracking-tight">Create Account</h2>
                <p className="text-[9px] font-bold text-blue-600 uppercase tracking-widest">Join our official network</p>
              </div>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-400 ml-2 uppercase tracking-wider">Sponsor ID</label>
                  <div className="relative">
                    <input type="text" placeholder="Enter ID" className="w-full bg-gray-50 border border-gray-100 rounded-xl p-4 pl-12 font-bold text-gray-700 outline-none focus:ring-2 focus:ring-blue-100 uppercase transition-all" value={formData.referralId} onChange={e => setFormData({...formData, referralId: e.target.value.toUpperCase()})} />
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
              <div className="space-y-4 pt-2">
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
                <div className="relative">
                  <input required type="email" placeholder="Email Address" className="w-full bg-gray-50 border border-gray-100 rounded-xl p-4 pl-12 text-sm font-medium outline-none focus:ring-2 focus:ring-blue-100" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                </div>
              </div>
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-2">
                  <Lock className="text-priya-dark" size={14} />
                  <span className="text-[10px] font-bold text-priya-dark uppercase tracking-widest">Security Access</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <input required type="password" placeholder="Password" className="w-full bg-gray-50 border border-gray-100 rounded-xl p-4 text-xs font-medium text-center outline-none focus:ring-2 focus:ring-blue-100" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} />
                  <input required type="password" placeholder="Confirm" className="w-full bg-gray-50 border border-gray-100 rounded-xl p-4 text-xs font-medium text-center outline-none focus:ring-2 focus:ring-blue-100" value={formData.confirmPassword} onChange={e => setFormData({...formData, confirmPassword: e.target.value})} />
                </div>
              </div>
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="text-emerald-500" size={14} />
                  <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Withdrawal PIN</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <input required type="password" maxLength={4} inputMode="numeric" placeholder="New PIN" className="w-full bg-gray-50 border border-gray-100 rounded-xl p-4 text-xs font-medium text-center outline-none focus:ring-2 focus:ring-blue-100" value={formData.pin} onChange={e => setFormData({...formData, pin: e.target.value.replace(/\D/g, '')})} />
                  <input required type="password" maxLength={4} inputMode="numeric" placeholder="Confirm" className="w-full bg-gray-50 border border-gray-100 rounded-xl p-4 text-xs font-medium text-center outline-none focus:ring-2 focus:ring-blue-100" value={formData.confirmPin} onChange={e => setFormData({...formData, confirmPin: e.target.value.replace(/\D/g, '')})} />
                </div>
              </div>
              <button type="submit" className="w-full bg-gradient-to-r from-blue-800 to-blue-600 text-white font-bold p-5 rounded-2xl shadow-xl uppercase tracking-[0.2em] active:scale-95 transition-all text-sm">Register Now</button>
            </form>
            <div className="text-center pt-2">
              <button onClick={() => navigate('/login')} className="text-[11px] font-bold text-gray-400 uppercase tracking-widest hover:text-blue-600 transition-colors">Already a member? <span className="text-blue-600 ml-1">Login</span></button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center py-20 px-6 relative">
      <div className="absolute top-6 right-6">
        <LanguageSelector language={language} setLanguage={setLanguage} />
      </div>
      <Branding />
      <div className="bg-white w-full max-w-[420px] rounded-[3rem] shadow-[0_20px_60px_rgba(0,0,0,0.05)] border border-white overflow-hidden mt-6">
        <div className="p-10 space-y-10">
          <div className="flex items-center gap-5">
            <div className="bg-white border-4 border-blue-50 p-4 rounded-2xl shadow-sm">
              <Lock className="text-blue-600" size={32} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800 uppercase tracking-tight">Login Portal</h2>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Access your official store account</p>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <input required type="text" placeholder="User ID / Mobile Number" className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-5 pl-14 text-sm font-medium outline-none focus:ring-2 focus:ring-blue-100" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
              <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-blue-600" size={22} />
            </div>
            <div className="relative">
              <input required type="password" placeholder="Password" className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-5 pl-14 text-sm font-medium outline-none focus:ring-2 focus:ring-blue-100" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} />
              <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300" size={22} />
            </div>
            <button type="submit" className="w-full bg-gradient-to-r from-blue-800 to-blue-600 text-white font-bold p-5 rounded-2xl shadow-xl flex items-center justify-center gap-4 uppercase tracking-[0.2em] active:scale-95 transition-all text-sm">Sign In <ChevronRight size={20} /></button>
          </form>
          <div className="text-center pt-2">
            <button onClick={() => navigate('/register')} className="text-[12px] font-bold text-blue-600 uppercase tracking-widest border-b-2 border-blue-50 pb-1 hover:border-blue-600 transition-all">Don't have an account? Register</button>
          </div>
        </div>
      </div>
      {showSuccess && (
        <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-md flex items-center justify-center p-6 z-[2000] animate-fadeIn">
          <div className="bg-white rounded-[3rem] w-full max-w-[400px] p-10 text-center space-y-8 shadow-2xl">
            <div className="flex justify-center">
                <div className="bg-emerald-50 p-8 rounded-full shadow-inner">
                    <CheckCircle size={64} className="text-emerald-500" />
                </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-blue-900 uppercase">Success!</h3>
              <p className="text-gray-400 font-bold text-[9px] uppercase tracking-widest">Your Account ID</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
              <p className="text-3xl font-black text-blue-900 font-mono tracking-widest">{tempUserId}</p>
            </div>
            <button onClick={handleFinalizeRegistration} className="w-full bg-blue-900 p-5 rounded-2xl text-white font-bold text-lg uppercase tracking-widest shadow-xl transition-all">Launch Dashboard</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Auth;
